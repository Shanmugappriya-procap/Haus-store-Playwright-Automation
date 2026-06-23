const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const playwrightPlugin = require('eslint-plugin-playwright');

module.exports = [
  {
    files: ['tests/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      playwright: playwrightPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...playwrightPlugin.configs['flat/recommended'].rules,

      // Playwright rules — enforced as errors
      'playwright/no-wait-for-timeout': 'error',
      'playwright/no-force-option': 'error',
      'playwright/require-top-level-describe': 'error',

      // TypeScript rules — enforced as errors
      '@typescript-eslint/no-explicit-any': 'error',

      // Downgraded to warnings — pre-existing patterns or assertions inside PO methods
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      'playwright/expect-expect': 'warn',
      'playwright/no-conditional-in-test': 'warn',
      'playwright/no-skipped-test': 'warn',
    },
  },
];
