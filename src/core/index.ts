import { type UnpluginFactory, createUnplugin } from 'unplugin';
import { createFilter } from '@rollup/pluginutils';
import { type ResolvedOptions, type Options } from '../types';
import { TRACE_ID } from './constants';
import { transform } from './transform';
import { parse_ID } from './parse_ID';

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
      if (filter(id)) {
        const parsed = parse_ID(id);

        if (parsed.isSfc) {
          const { query } = parsed;
          // vue cli | vue-loader
          if (query.type === 'template') {
            return true;
          }
          return (
            // vite-plugin-vue
            !query[TRACE_ID] &&
            // rollup-plugin-vue
            !query['rollup-plugin-vue']
          );
        }

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
    include: opts.include ?? '**/*.{vue,jsx.tsx}',
    exclude: opts.exclude ?? 'node_modules/**',
  };
}

export default /* #__PURE__ */ createUnplugin(unpluginFactory);
