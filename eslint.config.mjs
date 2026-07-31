import js from '@eslint/js';
import nextConfig from 'eslint-config-next';
// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

export default [
  // Generated/vendored output. Flat config does not read .gitignore, so these
  // have to be repeated here even though .gitignore already covers them.
  {
    ignores: [
      '.next/**',
      'build/**',
      'build-storybook/**',
      'public/draco/**',
      'public/og/**',
    ],
  },
  js.configs.recommended,
  ...nextConfig,
  ...storybook.configs['flat/recommended'],
  {
    rules: {
      semi: 'error',
      'no-unused-vars': 'warn',
      'import/no-anonymous-default-export': 'off',
      'react/display-name': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
  {
    // Jest globals for test files and the setup file
    files: ['**/*.test.{js,jsx}', 'jest.setup.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
      },
    },
  },
];
