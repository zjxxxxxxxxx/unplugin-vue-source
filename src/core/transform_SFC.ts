import { parse, transform } from "@vue/compiler-dom";
import MagicString from "magic-string";
import { NodeTypes, TRACE_ID, TagTypes } from "./constants";

export function transform_SFC(filename: string, code: string) {
  const s = new MagicString(code);

  const ast = parse(code);
  transform(ast, {
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
            ` ${TRACE_ID}="${filename}:${line}:${column}"`
          );
        }
      },
    ],
  });

  return s.toString();
}
