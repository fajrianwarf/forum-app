module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  rules: {
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
        ignorePropertyModificationsFor: ['state', 'threadList', 'threadDetail'],
      },
    ],
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
  overrides: [
    {
      files: [
        'vite.config.*',
        'webpack.config.*',
        'rollup.config.*',
        '*.config.js',
      ],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
      },
    },
    {
      files: ['src/utils/custom-hooks.js'],
      rules: {
        'react/function-component-definition': 'off',
        'react/destructuring-assignment': 'off',
      },
    },
  ],
};
