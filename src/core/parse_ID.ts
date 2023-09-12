import { extname } from "path";

export interface VueQuery {
  vue?: boolean;
  src?: string;
  type?: "script" | "template" | "style" | "custom";
  lang?: string;
}

export function parse_ID(
  id: string,
  rootDir: string
): {
  filename: string;
  ext: string;
  query: VueQuery;
} {
  const [filename, rawQuery] = id.split(`?`, 2);
  const query = Object.fromEntries(new URLSearchParams(rawQuery)) as VueQuery;
  if (query.vue != null) {
    query.vue = true;
  }

  return {
    filename: filename.replace(rootDir, ""),
    ext: extname(filename).slice(1),
    query,
  };
}
