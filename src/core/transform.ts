import { type Position } from '@vue/compiler-dom';
import MagicString from 'magic-string';
import { type ResolvedOptions } from '../types';
import { TRACE_ID } from './constants';
import { parse_ID } from './parse_ID';
import { transform_SFC } from './transform_SFC';
import { transform_MDX } from './transform_MDX';
import { transform_JSX } from './transform_JSX';

export function transform(
  code: string,
  id: string,
  opts: ResolvedOptions,
  isWebpack = false,
) {
  const { root, sourceMap } = opts;

  let s: MagicString;
  const parsed = parse_ID(id, root);

  if (!isWebpack && parsed.query[TRACE_ID]) {
    return;
  }

  if (parsed.isSfc) {
    transform_SFC(code, replace, opts);
  } else if (parsed.isMdx) {
    transform_MDX(code, replace);
  } else {
    transform_JSX(code, replace, parsed, opts);
  }

  function replace(pos: Position) {
    s ||= new MagicString(code);

    const { offset, line, column } = pos;
    s.prependLeft(offset, ` ${TRACE_ID}="${parsed.file}:${line}:${column}"`);
  }

  // @ts-ignore
  if (s) {
    return {
      code: s.toString(),
      map: sourceMap ? s.generateMap() : null,
    };
  }
}
