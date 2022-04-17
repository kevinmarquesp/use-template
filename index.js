#!/usr/bin/env node

import { checkArgs, fillArgs } from './src/arguments.js';
import { cloneRepository } from './src/system.js';

import argv from 'gar';


const args = argv(process.argv.slice(2));


await checkArgs(args);
await fillArgs(args);
await cloneRepository(args);

console.log('DONE! Happy hacking >:3');
