#!/usr/bin/env node

import argv from 'gar';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fetch from 'node-fetch';
import system from 'system-commands';


const args = argv(process.argv.slice(2));


/* ===== Functions ===== */

async function run(command) {
    try {
        await system(command);
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}


async function cloneRepository() {
    const repoUrl = args.branch === 'main' ?
        `https://github.com/${args.repo}`
        : `-b ${args.branch} https://github.com/${args.repo}`;

    await run(`git clone ${repoUrl} ${args._}`);
    await run(`rm -rf ${args._}/.git`);

    if (args.command) {
        await run(`cd ${args._}; ${args.command}`);
    }

    await run(`cd ${args._}; git init`);
    await run(`cd ${args._}; git add :`);
    await run(`cd ${args._}; git branch -m main`);
    await run(`cd ${args._}; git commit -m "Initial commit"`);
}


async function getBranches(branchesArray) {
    const answer = await inquirer.prompt({
        name: 'branch',
        type: 'list',
        message: `Select the ${chalk.yellow('branch')} that you wanna use`,
        choices: branchesArray
    });

    return answer.branch;
}


async function parseBranchesToArray(branchesJson) {
    const branches = [];

    branchesJson.forEach(e => {
        branches.push(e.name);
    });

    return branches;
}


async function fetchGithubBranches() {
    const url = `https://api.github.com/repos/${args.repo}/branches`
    let branchesJson;

    branchesJson = await fetch(url);
    branchesJson = await branchesJson.json();

    if (branchesJson.message === 'Not Found') {
        console.error(chalk.red('Repository not found :/'));
        process.exit(1);

    } else {
        return branchesJson
    }
}


async function checkArgs() {
    if (args.r && !args.repo) {
        args.repo = args.r;
    }

    if (args.b && !args.branch) {
        args.branch = args.b;
    }

    if (args.c && !args.command) {
        args.command = args.c;
    }

    if (typeof(args._) != 'string') {
        args._ = args._[0]
    }
}


async function getProjectName() {
    const answer = await inquirer.prompt({
        name: 'project_name',
        type: 'input',
        message: `Please, especify the ${chalk.yellow('project name')}:`
    });

    if (answer.project_name) {
        return answer.project_name

    } else {
        return getProjectName();
    }
}


async function getRepoName() {
    const answer = await inquirer.prompt({
        name: 'repo_name',
        type: 'input',
        message: `Please, especify a ${chalk.yellow('github repository')} name:`
    });

    if (answer.repo_name) {
        return answer.repo_name

    } else {
        return getRepoName();
    }
}


/* ===== Main section ===== */

await checkArgs();

if (!args.repo) {
    args.repo = await getRepoName();
}

if (!args._) {
    args._ = await getProjectName();
}

if (!args.branch) {
    let branchesJson = await fetchGithubBranches();
    let branchesArray = await parseBranchesToArray(branchesJson);
    args.branch = await getBranches(branchesArray);
}


await cloneRepository();
