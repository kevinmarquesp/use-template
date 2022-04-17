import fetch from 'node-fetch';
import chalk from 'chalk';


/*  Given an json, that return only the branch names in an array.
 */

export async function parseBranchesToArray(branchesJson) {
    console.log('[!] Parsing json info to an array...');

    const branches = [];

    branchesJson.forEach(e => {
        branches.push(e.name);
    });

    return branches;
}


/*  That function fetch an json from an repo. It stopo the whole programas
 *  if the repo doesn't exist.
 */

export async function fetchGithubBranches(repo) {
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
