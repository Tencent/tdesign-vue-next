const fs = require('fs');
const path = require('path');

const packages = fs.readdirSync(path.resolve(__dirname, 'src'));

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    scopes: [...packages],
    customScopesAlign: 'top-bottom',
    scopeOverrides: {
      test: ['unit', 'e2e'],
    },
    allowEmptyIssuePrefixs: false,
    allowCustomIssuePrefixs: false,
  },
};
