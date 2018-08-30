const fs = require('fs');

const shell = require('shelljs');
const colors = require('colors/safe');

function hasNodeModules() {
	const dirs = shell.ls();

	return dirs.includes('node_modules');
}

function checkPackage(directory) {
	const pathBackup = shell.pwd().stdout;

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

	shell.cd(pathBackup);
}

function checkNodeModules() {
	shell.cd('node_modules');

	shell.ls().forEach(directory => checkPackage(directory));

	shell.cd('..');
}

module.exports = function() {
	let hasErrors = false;

	if (!hasNodeModules()) {
		console.error(colors.red('node_modules not found'));
		return false;
	}

	checkNodeModules();

	if (!hasErrors) {
		console.log(colors.green('all clear'));
	}

	return hasErrors;
};
