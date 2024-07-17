import { type UnpluginFactory, createUnplugin } from 'unplugin';
import { createFilter } from '@rollup/pluginutils';
import { type ResolvedOptions, type Options } from '../types';
import { isDev } from './isDev';
import { parse_ID } from './parse_ID';
import { transform } from './transform';

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  options = {},
  meta,
) => {
  if (!isDev()) {
    return {
      name: 'unplugin-vue-source',
    };
  }

  const opts = resolveOptions(options);
  const filter = createFilter(opts.include, opts.exclude);
  const isWebpack = meta.framework === 'webpack';

  return {
    name: 'unplugin-vue-source',
    enforce: 'pre',

    transformInclude(id) {
      const { file, query } = parse_ID(normalizePath(id));
      return query.raw == null && filter(file);
    },
    transform(code, id) {
      return transform(code, normalizePath(id), opts, isWebpack);
    },
  };
};

function resolveOptions(opts: Options): ResolvedOptions {
  return {
    root: normalizePath(opts.root ?? process.cwd()),
    sourceMap: opts.sourceMap ?? false,
    babelParserPlugins: opts.babelParserPlugins ?? [],
    include: opts.include ?? /\.(vue|jsx|tsx|mdx)$/,
    exclude: opts.exclude ?? /\/node_modules\//,
  };
}

function normalizePath(path: string) {
  return path.replace(/\\/g, '/');
}

export default /* #__PURE__ */ createUnplugin(unpluginFactory);
