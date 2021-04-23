module.exports = {
  root: true,
  extends: [
    'react-app',
    'react-app/jest',
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  globals: {
    logger: 'readonly',
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'prefer-const': 'warn',
    'no-console': 'error',
    '@typescript-eslint/no-extra-semi': 'off',
    'semi-style': ['error', 'first'],
  },
}
