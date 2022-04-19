#!/usr/bin/env node

import { checkArgs, fillArgs } from './functions/arguments.js';
import { checkGit, cloneRepository } from './functions/system.js';
import { helpMsg } from './functions/helpers.js';

import argv from 'gar';


const args = argv(process.argv.slice(2)); // Remove node & bin from arguments


if (!checkGit()) {
    console.error('Sorry, this script requires git to work... :/');
    process.exit(1);

} else if(args.help || args.h) {
    helpMsg();

} else {
    await checkArgs(args);
    await fillArgs(args);
    await cloneRepository(args);
}
