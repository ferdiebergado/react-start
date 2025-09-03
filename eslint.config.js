// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import noBarrelFiles from 'eslint-plugin-no-barrel-files';
import reactDom from 'eslint-plugin-react-dom';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactX from 'eslint-plugin-react-x';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  [
    globalIgnores(['dist']),
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        js.configs.recommended,
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
        reactX.configs['recommended-typescript'],
        reactDom.configs.recommended,
        ...pluginQuery.configs['flat/recommended'],
        noBarrelFiles.flat,
        eslintPluginJsxA11y.flatConfigs.recommended,
        eslintConfigPrettier,
      ],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parserOptions: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: import.meta.dirname,
        },
      },
      rules: {
        'react-hooks/react-compiler': 'error',
      },
    },
  ],
  storybook.configs['flat/recommended']
);
