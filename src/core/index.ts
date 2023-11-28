import { type UnpluginFactory, createUnplugin } from 'unplugin';
import { createFilter } from '@rollup/pluginutils';
import { type ResolvedOptions, type Options } from '../types';
import { TRACE_ID } from './constants';
import { parse_ID } from './parse_ID';
import { transform } from './transform';

export const unpluginFactory: UnpluginFactory<Options> = (options = {}) => {
  if (process.env.NODE_ENV !== 'development') {
    return {
      name: 'unplugin-vue-source',
    };
  }

  const opts = resolveOptions(options);
  const filter = createFilter(opts.include, opts.exclude);

  return {
    name: 'unplugin-vue-source',
    enforce: 'pre',

    transformInclude(id) {
      const { file, isSfc, query } = parse_ID(id);

      if (filter(file)) {
        if (isSfc && query.type !== 'template') {
          return (
            // vite-plugin-vue
            !query[TRACE_ID] &&
            // rollup-plugin-vue
            !query['rollup-plugin-vue']
          );
        }

        // vue cli | vue-loader | tsx | jsx
        return true;
      }
    },
    transform(code, id) {
      return transform(code, id, opts);
    },
  };
};

function resolveOptions(opts: Options): ResolvedOptions {
  return {
    root: opts.root ?? process.cwd(),
    sourceMap: opts.sourceMap ?? false,
    include: opts.include ?? '**/*.{vue,jsx,tsx}',
    exclude: opts.exclude ?? 'node_modules/**',
  };
}

export default /* #__PURE__ */ createUnplugin(unpluginFactory);
