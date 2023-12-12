import { extname } from 'path';
import { TRACE_ID } from './constants';

export interface VueQuery extends Record<string, any> {
  type?: 'script' | 'template' | 'style' | 'custom';
  raw?: string;
  [TRACE_ID]?: string;
}

export function parse_ID(id: string, root = '') {
  const [file, rawQuery] = id.split('?', 2);
  const ext = extname(file).slice(1);
  const query = Object.fromEntries(new URLSearchParams(rawQuery)) as VueQuery;

  return {
    file: file.replace(root, ''),
    isSfc: ext === 'vue',
    isTsx: ext.startsWith('ts'),
    isMdx: ext.startsWith('md'),
    query,
  };
}
