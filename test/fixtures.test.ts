import { readFileSync } from 'node:fs';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { expect, test } from 'vitest';
import { format, Options } from 'prettier';
import fg from 'fast-glob';
import { transform } from '../src/core/transform';

const fixtures = fg.sync('test/fixtures/**/input.**');

const formatOptions = JSON.parse(readCodeString(resolve('.prettierrc')));
const formatCode = (code: string, opts: Options) =>
  format(code, { ...formatOptions, ...opts });

test.each(fixtures)('transform %s', async (name) => {
  const filename = resolve(name);
  const { default: options } = await import(
    resolvePath(filename, 'options.ts')
  );
  const input = readCodeString(filename);

  const output = readCodeString(filename, `output${extname(filename)}`);
  const result = transform(input, filename, options)!;

  if (basename(dirname(name)) === 'vue-skip') {
    return expect(result).toBeUndefined();
  }

  expect(
    await formatCode(result.code, {
      parser:
        extname(filename) === '.vue'
          ? 'vue'
          : extname(filename).startsWith('.md')
          ? 'mdx'
          : 'babel',
    }),
  ).toBe(output);

  if (options.sourceMap) {
    const sourceMap = readCodeString(filename, 'source-map.json');
    expect(
      await formatCode(result.map!.toString(), {
        parser: 'json',
      }),
    ).toEqual(sourceMap);
  } else {
    expect(result.map).toBeNull();
  }
});

function resolvePath(filename: string, relative?: string) {
  return relative ? join(filename, '../', relative) : filename;
}

function readCodeString(filename: string, relative?: string) {
  const path = resolvePath(filename, relative);
  return readFileSync(path, 'utf-8');
}
