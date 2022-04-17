#!/usr/bin/env node

import { checkArgs, fillArgs } from './arguments.js';
import { cloneRepository } from './system.js';

import argv from 'gar';


const args = argv(process.argv.slice(2));


await checkArgs(args);
await fillArgs(args);
await cloneRepository(args);

console.log('DONE! Happy hacking >:3');
