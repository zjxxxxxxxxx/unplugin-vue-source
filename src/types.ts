export interface Options {
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

  /** @default '**\/*.{vue,jsx.tsx}' */
  include?: string | RegExp | (string | RegExp)[];
  /** @default 'node_modules/**' */
  exclude?: string | RegExp | (string | RegExp)[];
}

export type ResolvedOptions = Required<Options>;
