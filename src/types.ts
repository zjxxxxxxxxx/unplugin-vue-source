import { ParserPlugin } from '@babel/parser';

export interface Options {
  /** @default '**\/*.{vue,jsx,tsx}' */
  include?: string | RegExp | (string | RegExp)[];
  /** @default 'node_modules/**' */
  exclude?: string | RegExp | (string | RegExp)[];

  /**
   * source root path
   *
   * @default process.cwd()
   */
  root?: string;
  /**
   * generate sourceMap
   *
   * @default false
   */
  sourceMap?: boolean;

  /**
   * Array containing the plugins that you want to enable.
   *
   * @default ['jsx', 'typescript']
   */
  babelParserPlugins?: ParserPlugin[];
}

export type ResolvedOptions = Required<Options>;
