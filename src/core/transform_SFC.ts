import type { AttributeNode, RootNode, TextNode } from "@vue/compiler-dom";
import { ElementNode, parse, transform } from "@vue/compiler-dom";
import MagicString from "magic-string";
import { NodeTypes, TRACE_ID, TagTypes } from "./constants";
import { transform_JSX } from "./transform_JSX";

export function transform_SFC(
  code: string,
  s: MagicString,
  options: {
    file: string;
  }
) {
  const { file } = options;

  const ast = parse(code);
  transform(ast, {
    nodeTransforms: [
      (node) => {
        if (
          node.type === NodeTypes.ELEMENT &&
          TagTypes.includes(node.tagType)
        ) {
          const { line, column, offset } = node.loc.start;
          const prependIndex = offset + node.tag.length + 1;
          s.prependLeft(
            prependIndex,
            ` ${TRACE_ID}="${file}:${line}:${column}"`
          );
        }
      },
    ],
  });

  const jsxOpts = resolveJsxOptions(ast);
  if (jsxOpts) {
    transform_JSX(jsxOpts.code, s, {
      ...jsxOpts,
      file,
    });
  }
}

function resolveJsxOptions(ast: RootNode) {
  const scriptNode = (ast.children as ElementNode[]).find(
    (node) => node.tag === "script"
  );
  if (!scriptNode) return;

  const codeNode = scriptNode.children[0] as TextNode | undefined;
  if (!codeNode) return;

  const langProp = scriptNode.props.find(
    (prop) => prop.name === "lang"
  ) as AttributeNode;
  if (!langProp) return;

  const lang = langProp.value?.content;
  const isTsx = lang === "tsx";
  const isJsx = isTsx || lang === "jsx";
  if (isJsx) {
    const { offset, line, column } = codeNode.loc.start;
    return {
      isTsx,
      startIndex: offset,
      startLine: line,
      startColumn: column,
      code: codeNode.content,
    };
  }
}
