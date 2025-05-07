import js from '@eslint/js';
import globals from 'globals';
import dicoding from 'eslint-config-dicodingacademy';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  dicoding,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        Intl: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      import: importPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@components', './src/components'],
            ['@pages', './src/pages'],
            ['@services', './src/services'],
            ['@slices', './src/slices'],
            ['@stores', './src/stores'],
            ['@utils', './src/utils'],
            ['@assets', './src/assets'],
          ],
          extensions: ['.js', '.jsx'],
        },
      },
    },
    rules: {
      ...prettier.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
      'import/prefer-default-export': 'off',
      'no-control-regex': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'no-underscore-dangle': [
        'error',
        {
          allow: ['__dirname', '__filename'],
        },
      ],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [
            'state',
            'threadList',
            'threadDetail',
          ],
        },
      ],
    },
  },
  {
    files: [
      'vite.config.*',
      'webpack.config.*',
      'rollup.config.*',
      '*.config.js',
    ],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
  {
    files: ['src/utils/custom-hooks.js'],
    rules: {
      'react/function-component-definition': 'off',
      'react/destructuring-assignment': 'off',
    },
  },
];
