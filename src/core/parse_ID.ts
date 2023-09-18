import { extname } from 'path';
import { TRACE_ID } from './constants';

export interface VueQuery extends Record<string, any> {
  vue?: boolean;
  type?: 'script' | 'template' | 'style' | 'custom';
  [TRACE_ID]?: string;
}

export function parse_ID(id: string, root = '') {
  const [file, rawQuery] = id.split('?', 2);

  const ext = extname(file).slice(1);
  const isSfc = ext === 'vue';
  const isTsx = ext === 'tsx';
  const isJsx = isTsx || ext === 'jsx';

  const query = Object.fromEntries(new URLSearchParams(rawQuery)) as VueQuery;
  if (query.vue != null) {
    query.vue = true;
  }

  return {
    file: file.replace(root, ''),
    isSfc,
    isTsx,
    isJsx,
    query,
  };
}
