#!/usr/bin/env node

// Reads JSON from stdin and writes equivalent
// nicely-formatted JSON to stdout.

// var stdin = process.stdin,
//     stdout = process.stdout,
//     inputChunks = [];

// stdin.resume();
// stdin.setEncoding('utf8');

// stdin.on('data', function (chunk) {
//     inputChunks.push(chunk);
//     const out = `reader: ${chunk}`;
//     process.stdout.write(out)
// });

// stdin.on('end', function () {
//     console.log('ending')
// });

import { initServer } from './ws.service';
import { initProcessor } from './processor';
import { initReader } from './reader';

const logsStream = initReader(process.stdin);
initProcessor(logsStream);
initServer();