import { relative } from "path";
import type { UnpluginFactory } from "unplugin";
import { createUnplugin } from "unplugin";
import { parse, transform } from "@vue/compiler-dom";
import MagicString from "magic-string";
import type { Options } from "../types";
import { ElementTypes, NodeTypes, TRACE_ID } from "./constants";

const filterRE = /.(vue|jsx|tsx)$/;
const TagTypes = [ElementTypes.ELEMENT, ElementTypes.COMPONENT];

export const unpluginFactory: UnpluginFactory<Options> = (options = {}) => {
  const { rootDir = process.cwd() } = options;

  if (process.env.NODE_ENV !== "development") {
    return {
      name: "unplugin-vue-source",
    };
  }

  return {
    name: "unplugin-vue-source",
    enforce: "pre",
    transformInclude(id) {
      return filterRE.test(id);
    },
    transform(raw, id) {
      const relativePath = `/${relative(rootDir, id)}`;

      const s = new MagicString(raw);
      transform(parse(raw), {
        nodeTransforms: [
          (node) => {
            if (
              node.type === NodeTypes.ELEMENT &&
              TagTypes.includes(node.tagType as any)
            ) {
              const { line, column, offset } = node.loc.start;
              const startIndex = offset + node.tag.length + 1;
              s.prependLeft(
                startIndex,
                ` ${TRACE_ID}="${relativePath}:${line}:${column}"`
              );
            }
          },
        ],
      });
      return s.toString();
    },
  };
};

export default /* #__PURE__ */ createUnplugin(unpluginFactory);
