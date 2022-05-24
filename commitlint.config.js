const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packages = fs
  .readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

// precomputed scope
const scopeComplete = execSync("git status -s | grep 'src' 2> /dev/null")
  .toString()
  .trim()
  .split('\n')
  .find((r) => r.indexOf('M  ') !== -1)
  ?.match(/src\/(\S*)\//)?.[1];

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    scopes: [...packages],
    customScopesAlign: !scopeComplete ? 'top-bottom' : 'bottom',
    scopeOverrides: {
      test: ['unit', 'e2e'],
    },
    defaultScope: scopeComplete,
    allowEmptyIssuePrefixs: false,
    allowCustomIssuePrefixs: false,
  },
};
