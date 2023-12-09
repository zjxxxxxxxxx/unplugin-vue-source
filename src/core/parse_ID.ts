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

  if (ext === 'vue') {
    return {
      file: file.replace(root, ''),
      isSfc: true,
      query,
    };
  }

  return {
    file: file.replace(root, ''),
    isJsx: true,
    isTsx: ext.includes('ts'),
    query,
  };
}
