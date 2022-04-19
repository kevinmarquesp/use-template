import { fetchGithubBranches, parseBranchesToArray } from './helpers.js';

import inquirer from 'inquirer';
import chalk from 'chalk';


/*  -----------------------------------------------------------
 *  Ask user to enter the branch name given an Array of options
 *      return -> String
 */

async function getBranches(branchesOptions) {
    if (branchesOptions.length === 1) {
        return branchesOptions[0];

    } else {
        const answer = await inquirer.prompt({
            name: 'branch',
            type: 'list',
            message: `Select the ${chalk.yellow('branch')} that you wanna use`,
            choices: branchesOptions
        });

        return answer.branch;
    }
}


/*  --------------------------------
 *  Ask user to enter a project name
 *      return -> String || [RECALL]
 */

async function getProjectName() {
    const answer = await inquirer.prompt({
        name: 'project_name',
        type: 'input',
        message: `Please, especify the ${chalk.yellow('project name')}:`
    });

    return answer.project_name || getProjectName();
}


/*  -----------------------------------
 *  Ask user to enter a repository name
 *      return -> String || [RECALL]
 */

async function getRepoName() {
    const answer = await inquirer.prompt({
        name: 'repo_name',
        type: 'input',
        message: `Please, especify a ${chalk.yellow('github repository')} name:`
    });

    return answer.repo_name || getRepoName();
}


/*  --------------------------------------------------------------
 *  Pass shortnamed arguments values to fullnamed arguments (e. g.
 *  -r value to --repo value)
 *      props: args -> Object
 */

export async function checkArgs(args) {
    if (args.r && !args.repo)
        args.repo = args.r;

    if (args.b && !args.branch)
        args.branch = args.b;

    if (args.c && !args.command)
        args.command = args.c;

    if (typeof(args._) != 'string')
        args._ = args._[0]
}


/*  -----------------------------
 *  Fill up the missing arguments
 *      props: args -> Object
 */

export async function fillArgs(args) {
    if (!args.repo)
        args.repo = await getRepoName();

    if (!args._)
        args._ = await getProjectName();

    if (!args.branch) {
        let branchesJson = await fetchGithubBranches(args.repo);
        let branchesOptions = await parseBranchesToArray(branchesJson);
        args.branch = await getBranches(branchesOptions);
    }
}
