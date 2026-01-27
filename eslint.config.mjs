import { createRequire } from 'module';
import eslintConfigPrettier from 'eslint-config-prettier';

const require = createRequire(import.meta.url);

const nextConfigCoreWebVitals = require('eslint-config-next/core-web-vitals');
const nextConfigTypeScript = require('eslint-config-next/typescript');

const eslintConfig = [
  {
    ignores: [
      'next-env.d.ts',
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
    ],
  },
  ...nextConfigCoreWebVitals,
  ...nextConfigTypeScript,
  eslintConfigPrettier,
  {
    settings: {
      next: {
        rootDir: ['src/'],
      },
    },
    rules: {
      '@next/next/no-page-custom-font': 'off',
    },
  },
];

export default eslintConfig;
