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
