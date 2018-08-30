#!/usr/bin/env node 

const check = require('./index.js');

process.exit(check() ? 0 : 1);
