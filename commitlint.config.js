const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const packages = [
  ...Array.from(fs
    .readdirSync(path.resolve(__dirname, 'packages/components/common/src'), { withFileTypes: true })),
  ...Array.from(fs
    .readdirSync(path.resolve(__dirname, 'packages/components/vue3/src'), { withFileTypes: true })),
]
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// precomputed scope
const scopeComplete = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find(r => r.includes('M  '))
  ?.replace(/(\/)/g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1];

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
