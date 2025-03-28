import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['dist/**/*'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: true,
        document: true,
        navigator: true,
        console: true,
        URL: true,
        TextDecoder: true,
        crypto: true,
        self: true,
        structuredClone: true,
        ReadableStream: true,

        // Node.js globals
        process: true,
        Buffer: true,
        __dirname: true,
        module: true,
        require: true,
        exports: true,

        // ES2022 globals
        Promise: true,
        Set: true,
        Map: true,
        WeakMap: true,
        WeakSet: true,
        Proxy: true,
        Reflect: true,
        globalThis: true,
      },
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      'no-prototype-builtins': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-useless-escape': 'off',
      'no-cond-assign': ['error', 'except-parens'],
      'no-func-assign': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];
