# license-drama-check

A simple Node.js package to check your dependencies for any open source license shenanigans that deny license to certain entities.

## Installation

```yarn add license-drama-check```

or

```npm install license-drama-check```

## Usage

The package can be user either in CLI or programatically, as a function.

After installing the package, the CLI command is:

```
license-drama-check
```

If your package manager doesn't set the command up properly, you can always run it with

```
./node_modules/license-drama-check/run.js
```

To use programatically, import the module, which is a function and call it:

```
const check = require('license-drama-check');

const result = check();
```

The return value is true if a problem is found or false if no problems are found.

If you're using shelljs or a similar package to change cwd in your script, make sure to call the function while cwd is the root of your project.

## Contributions

PRs to make the script smarter or simply cover any changes in wording in the affected projects are greatly appreciated.

## Disclaimer

The purpose of this package is to detect any potentially harmful open source license tampering. Any similarities with a case of open source license drama, past, present or future, may or may not be intentional.
