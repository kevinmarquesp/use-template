import { fetchGithubBranches, parseBranchesToArray } from './helpers.js';

import inquirer from 'inquirer';
import chalk from 'chalk';


/*  Ask user witch branch he/she want to use based on an array of options
 */

async function getBranches(branchesArray) {
    const answer = await inquirer.prompt({
        name: 'branch',
        type: 'list',
        message: `Select the ${chalk.yellow('branch')} that you wanna use`,
        choices: branchesArray
    });

    return answer.branch;
}


/*  Ask user the project name, it will repeat until the input isn't empty
 */

async function getProjectName() {
    const answer = await inquirer.prompt({
        name: 'project_name',
        type: 'input',
        message: `Please, especify the ${chalk.yellow('project name')}:`
    });

    if (answer.project_name) {
        return answer.project_name;

    } else {
        return getProjectName();
    }
}


/*  Ask user the repository name, it will repeat until the input isn't empty
 */

async function getRepoName() {
    const answer = await inquirer.prompt({
        name: 'repo_name',
        type: 'input',
        message: `Please, especify a ${chalk.yellow('github repository')} name:`
    });

    if (answer.repo_name) {
        return answer.repo_name;

    } else {
        return getRepoName();
    }
}


/*  Function to pass the short arguments to the default arguments.
 *      Ex: '-r' value to '--repo' value.
 *  The project name will be the first item if it was an array.
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


/*  Function that fill up all the arguments if it is empty
 */

export async function fillArgs(args) {
    if (!args.repo)
        args.repo = await getRepoName();

    if (!args._)
        args._ = await getProjectName();

    if (!args.branch) {
        let branchesJson = await fetchGithubBranches(args.repo);
        let branchesArray = await parseBranchesToArray(branchesJson);
        args.branch = await getBranches(branchesArray);
    }
}
