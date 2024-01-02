/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['./base.js', 'next/core-web-vitals'],
  globals: {
    React: true,
    Jsx: true,
  },
  env: {
    node: true,
    browser: true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
};
