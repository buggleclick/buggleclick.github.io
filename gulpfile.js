const fs                = require('fs');
const path              = require('path');
const spawn             = require('child_process').spawn;

// Read File Content
const readFile = (src) => fs.readFileSync(src, { encoding: 'utf-8' });

// Run Async Commands
const runAsync = (command, args) => new Promise((resolve, reject) => {
    const proc = spawn(command, args).on('error', reject).on('exit', resolve);

    proc.stderr.pipe(process.stderr);
    proc.stdout.pipe(process.stdout);
})