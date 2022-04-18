import system from 'system-commands';


/*  Just to use system commands more easely...
 */

async function run(command) {
    try {
        await system(command);
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}


/*  Clone the repo based on branch and init the new project
 */

export async function cloneRepository(args) {
    const name = args._;
    const branch = args.branch;
    const repo = args.repo;
    const command = args.command;

    const url = `https://github.com/${repo}`;


    // Clone the template github repository and remove .git/

    console.log('[!] Cloning the repo...');

    await run(`git clone -b ${branch} ${url} ${name}`);
    await run(`rm -rf ${name}/.git`);

    // Run a custom command, if it exists

    if (command)
        console.log('[!] Runing the custom command...');

        await run(`cd ${name}; ${command}`);

    // Init a new git project from scratch

    console.log('[!] Inicializing the new project...');

    await run(`cd ${name}; git init`);
    await run(`cd ${name}; git add :`);
    await run(`cd ${name}; git branch -m main`);
    await run(`cd ${name}; git commit -m "Initial commit"`);
}
