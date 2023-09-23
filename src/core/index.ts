import type { UnpluginFactory } from 'unplugin';
import { createUnplugin } from 'unplugin';
import type { Options } from '../types';
import { filter_ID } from './filter_ID';
import { transform } from './transform';

export const unpluginFactory: UnpluginFactory<Options> = (options = {}) => {
  if (process.env.NODE_ENV !== 'development') {
    return {
      name: 'unplugin-vue-source',
    };
  }

  const opts = resolveOptions(options);

  return {
    name: 'unplugin-vue-source',
    enforce: 'pre',
    transformInclude: filter_ID,
    transform(code, id) {
      return transform(code, id, opts);
    },
  };
};

function resolveOptions(options: Options): Required<Options> {
  const { root = process.cwd(), sourceMap = false } = options;

  return {
    root,
    sourceMap,
  };
}

export default /* #__PURE__ */ createUnplugin(unpluginFactory);
