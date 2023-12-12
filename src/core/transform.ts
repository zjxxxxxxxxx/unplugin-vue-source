import { type Position } from '@vue/compiler-dom';
import MagicString from 'magic-string';
import { type ResolvedOptions } from '../types';
import { TRACE_ID } from './constants';
import { parse_ID } from './parse_ID';
import { transform_SFC } from './transform_SFC';
import { transform_MDX } from './transform_MDX';
import { transform_JSX } from './transform_JSX';

const skipRE = new RegExp(` ${TRACE_ID}=['"].+:[0-9]+:[0-9]+['"]`);

export function transform(code: string, id: string, opts: ResolvedOptions) {
  if (skipRE.test(code)) return;

  const { root, sourceMap } = opts;

  const s = new MagicString(code);
  const parsed = parse_ID(id, root);

  if (parsed.isSfc) {
    transform_SFC(code, replace, opts);
  } else if (parsed.isMdx) {
    transform_MDX(code, replace);
  } else {
    transform_JSX(code, replace, parsed, opts);
  }

  function replace(pos: Position) {
    const { offset, line, column } = pos;
    s.prependLeft(offset, ` ${TRACE_ID}="${parsed.file}:${line}:${column}"`);
  }

  return {
    code: s.toString(),
    map: sourceMap ? s.generateMap() : null,
  };
}
