import type { Options } from 'tsup';

export const tsup: Options = {
  entry: ['src/*.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  clean: true,
  shims: false,
  cjsInterop: true,
  external: [
    '@babel/core',
    '@babel/parser',
    '@babel/plugin-syntax-jsx',
    '@babel/plugin-syntax-typescript',
    '@vue/compiler-dom',
  ],
};
