const fs                = require('fs');
const path              = require('path');
const spawn             = require('child_process').spawn;
const gulp              = require('gulp');
const sizeRepo          = require('gulp-sizereport');
const del               = require('del');
const mdTree            = require('markdown-tree');

// Read File Content
const readFile = (src) => fs.readFileSync(src, { encoding: 'utf-8' });

// Run Async Commands
const runAsync = (command, args) => new Promise((resolve, reject) => {
    const proc = spawn(command, args).on('error', reject).on('exit', resolve);

    proc.stderr.pipe(process.stderr);
    proc.stdout.pipe(process.stdout);
});

// Run Package Scripts
const npmScript = (name, args = []) => {
    const func = () => runAsync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', name, ...args]);
    func.displayName = 'npm run ' + name;
    return func
};

// Clean Old Files
const clean = () => del([ 'assets/scripts/*', '*.html' ]);

// Generate Changelog
const makeChangelog = (callback) => {
    const changelogFile = readFile('CHANGELOG.md');
    const tree = mdTree(changelogFile);

    const content = tree.children.map(change => ({
        version:    change.text,
        changes:    change.tokens.map(t => t.text).filter(x => x)
    }));

    const type = String(`{ version: string; changes: string[]; }[]`);
    const object = JSON.stringify(content, null, 4);
    const code = String(`export const CHANGELOG: ${type} = ${object};\n`);

    fs.writeFile('./source/scripts/changelog.ts', code, 'utf8', callback);
}