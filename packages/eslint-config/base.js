const { resolve } = require('node:path');
const project = resolve(process.cwd(), 'tsconfig.json');

/** @type{import('eslint').Linter.Config} */
module.exports = {
  extends: [require.resolve('@vercel/style-guide/eslint/next'), 'eslint-config-turbo', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: true },
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  settings: {
    'import/resolver': {
      typescript: { project },
    },
  },
  ignorePatterns: ['*.js', 'node_modules/'],
};
