#!/usr/bin/env node

import argv from 'gar';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fetch from 'node-fetch';


const args = argv(process.argv.slice(2));


// async function hello() {
//     const user = await inquirer.prompt({
//         name: 'Hello world',
//         type: 'list',
//         message: ':3',
//         choices: [
//             'Option 1',
//             'Option 2',
//             'Option 3',
//             'Option 4',
//             'Option 5'
//         ]
//     });
// }


/* ===== Functions ===== */

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

console.log(args);

await checkArgs();

if (!args.repo && !args.r) {
    args.repo = await getRepoName();
}

if (args._ == 0) {
    args._ = await getProjectName();
}

if (!args.branch) {
    let branchesJson = await fetchGithubBranches();
    let branchesArray = await parseBranchesToArray(branchesJson);
    args.branch = await getBranches(branchesArray);
}

console.log(args);
