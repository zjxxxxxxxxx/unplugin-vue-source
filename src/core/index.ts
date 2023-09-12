import type { UnpluginFactory } from "unplugin";
import { createUnplugin } from "unplugin";
import type { Options } from "../types";
import { parse_ID } from "./parse_ID";
import { transform_SFC } from "./transform_SFC";
// import { transform_JSX } from "./transform_JSX";

const includeRE = /.((vue\?vue)|(vue|jsx|tsx)$)/;

export const unpluginFactory: UnpluginFactory<Options> = (options = {}) => {
  if (process.env.NODE_ENV !== "development") {
    return {
      name: "unplugin-vue-source",
    };
  }

  const { rootDir = process.cwd() } = options;

  return {
    name: "unplugin-vue-source",
    enforce: "pre",
    transformInclude(id) {
      return includeRE.test(id);
    },
    transform(code, id) {
      const { filename, query } = parse_ID(id, rootDir);
      if (!query.type || query.type === "template") {
        return transform_SFC(filename, code);
      }
    },
  };
};

export default /* #__PURE__ */ createUnplugin(unpluginFactory);
