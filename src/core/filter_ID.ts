import { TRACE_ID } from "./constants";
import { parse_ID } from "./parse_ID";

export function filter_ID(id: string) {
  const parsed = parse_ID(id);

  if (parsed.isJsx) {
    return true;
  }

  if (parsed.isSfc) {
    const { query } = parsed;
    // vue cli | vue-loader
    if (query.type === "template") {
      return true;
    }
    return (
      // vite-plugin-vue
      !query[TRACE_ID] &&
      // rollup-plugin-vue
      !query["rollup-plugin-vue"]
    );
  }

  return false;
}
