// eslint.config.cjs
const js = require('@eslint/js');

module.exports = [
  {
    files: ['**/*.js'], // This targets JavaScript files
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...require('globals').node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off', // Consider if this is needed
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // '@typescript-eslint/no-empty-function': 'off',
      // '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
    },
  },
];