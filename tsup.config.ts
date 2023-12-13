import type { Options } from 'tsup';

export const tsup: Options = {
  entry: ['src/*.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  clean: true,
  cjsInterop: true,
  external: [
    '@babel/core',
    '@babel/parser',
    '@babel/plugin-syntax-jsx',
    '@babel/plugin-syntax-typescript',
    '@vue/compiler-dom',
    'mdast-util-from-markdown',
    'mdast-util-mdx-jsx',
    'micromark-extension-mdxjs',
    'unist-util-visit',
  ],
};
