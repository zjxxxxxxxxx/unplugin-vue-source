import type { UnpluginFactory } from "unplugin";
import { createUnplugin } from "unplugin";
import MagicString from "magic-string";
import type { Options } from "../types";
import { filter_ID } from "./filter_ID";
import { parse_ID } from "./parse_ID";
import { transform_SFC } from "./transform_SFC";
import { transform_JSX } from "./transform_JSX";

export const unpluginFactory: UnpluginFactory<Options> = (options = {}) => {
  if (process.env.NODE_ENV !== "development") {
    return {
      name: "unplugin-vue-source",
    };
  }

  const { root = process.cwd(), sourceMap = false } = options;

  return {
    name: "unplugin-vue-source",
    enforce: "pre",
    transformInclude: filter_ID,
    transform(code, id) {
      const s = new MagicString(code);

      const parsed = parse_ID(id, root);
      if (parsed.isSfc) {
        transform_SFC(code, s, parsed);
      } else if (parsed.isJsx) {
        transform_JSX(code, s, parsed);
      }

      return {
        code: s.toString(),
        map: sourceMap ? s.generateMap() : null,
      };
    },
  };
};

export default /* #__PURE__ */ createUnplugin(unpluginFactory);
