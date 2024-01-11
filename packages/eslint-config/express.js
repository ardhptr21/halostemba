/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['./base.js'],
  env: { node: true },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
};
