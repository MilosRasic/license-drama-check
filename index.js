const fs = require('fs');

const shell = require('shelljs');
const colors = require('colors/safe');

let hasErrors = false;

function hasNodeModules() {
	const dirs = shell.ls();

	return dirs.includes('node_modules');
}

function checkPackage(directory) {
	shell.cd(directory);

	const ls = shell.ls();

	if (ls.includes('LICENSE')) {
		const license = fs.readFileSync('LICENSE', 'utf8');

		if (license.includes('except for the following entities') || license.includes('shall not be granted')) {
			console.error(colors.red(`WARNING: altered license detected in ${directory}`));
			hasErrors = true;
		}
	}

	if (hasNodeModules()) {
		checkNodeModules();
	}

	shell.cd('..');
}

function checkNodeModules() {
	shell.cd('node_modules');

	shell.ls().forEach(directory => checkPackage(directory));

	shell.cd('..');
}

if (!hasNodeModules()) {
	console.error(colors.red('node_modules not found'));
	process.exit(1);
}

checkNodeModules();

process.exit(hasErrors ? 1 : 0);
