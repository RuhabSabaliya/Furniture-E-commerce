'use strict';

const fs = require('fs');
const path = require('path');

const targetPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-dev-utils',
  'checkRequiredFiles.js'
);
const oldLine = '      fs.accessSync(filePath, fs.F_OK);';
const newLine = '      fs.accessSync(filePath, fs.constants.F_OK);';

if (!fs.existsSync(targetPath)) {
  process.exit(0);
}

const source = fs.readFileSync(targetPath, 'utf8');
if (!source.includes(oldLine)) {
  process.exit(0);
}

fs.writeFileSync(targetPath, source.replace(oldLine, newLine), 'utf8');
