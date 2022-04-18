import shelljs from 'shelljs';


/*  ------------------------------
 *  Initial setup for git projects
 */

function gitInit() {
    shelljs.exec('git init');
    shelljs.exec('git branch -m main');
    shelljs.exec('git add :');
    shelljs.exec('git commit -m "Initial commit"');
}


/*  -------------------------------------------------------
 *  Clone the repo based on branch and init the new project
 *      props: args -> Object
 */

export async function cloneRepository(args) {
    const name = args._;
    const branch = args.branch;
    const command = args.command;
    const url = `https://github.com/${args.repo}`;


    shelljs.exec(`git clone -b ${branch} ${url} ${name}`);
    shelljs.cd(name);

    shelljs.rm('-rf', './.git/')

    if (command)
        shelljs.exec(command);

    gitInit();
}


/*  -------------------------
 *  Check if git is installed
 *      return -> Bolean
 */

export function checkGit() {
    if (shelljs.which('git')) {
        return true;

    } else {
        return false;
    }
}
