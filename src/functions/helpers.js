import fetch from 'node-fetch';
import chalk from 'chalk';


/*  -------------------------------------------------------------
 *  Parse the json from GitHubAPI to an array with branches names
 *      props: branchesJson -> Object
 *      return -> Array
 */

export async function parseBranchesToArray(branchesJson) {
    console.log('[!] Parsing json info to an array...');
    console.log();

    const branches = [];

    branchesJson.forEach(e => {
        branches.push(e.name);
    });

    return branches;
}


/*  -------------------------------------------------------------
 *  Fetch the json file from GitHubAPI and return the intery json
 *      props: repo -> String
 *      return -> Object
 */

export async function fetchGithubBranches(repo) {
    console.log();
    console.log('[!] Getting repo info...');

    const url = `https://api.github.com/repos/${repo}/branches`

    let branchesJson = await fetch(url);
    branchesJson = await branchesJson.json();

    if (branchesJson.message === 'Not Found') {
        console.error(chalk.red('Repository not found :/'));
        process.exit(1);

    } else {
        return branchesJson
    }
}


/*  ---------------------
 *  Show the help message
 */

export function helpMsg() {
    const msg = `
Usage: create-new-template [PROJECT NAME] -r [USER/REPO] -b [BRANCH] -c [COMMAND]
or: create-new-template

A small and simple tool to clone GitHub repositories and use them as template.

    --repo -r       Github repository, you need to specify. Like that: exampleuser/examplerepo
    --branch -b     Branch of the repository that have all of your templates.
                    (e.g. main, master, dev...)
    --command -c    Command to run after cloning the repo and before initialize that.
    --help -h       Show this message
`;

    console.log(msg);
}
