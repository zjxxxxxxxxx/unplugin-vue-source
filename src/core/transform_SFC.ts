import { ElementNode, parse, transform } from "@vue/compiler-dom";
import { NodeTypes, TRACE_ID, TagTypes } from "./constants";
import MagicString from "magic-string";
import { transform_JSX } from "./transform_JSX";
import { AttributeNode } from "@vue/compiler-dom";
import { RootNode } from "@vue/compiler-dom";
import { TextNode } from "@vue/compiler-dom";

export function transform_SFC(
  code: string,
  s: MagicString,
  options: {
    file: string;
    query: any;
  }
) {
  const { file } = options;

  const ast = parse(code);
  transform(ast, {
    nodeTransforms: [
      (node) => {
        if (
          node.type === NodeTypes.ELEMENT &&
          TagTypes.includes(node.tagType as any)
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
    transform_JSX(jsxOpts.content, s, {
      ...jsxOpts,
      file,
    });
  }
}

function resolveJsxOptions(ast: RootNode) {
  const script = (ast.children as ElementNode[]).find(
    (node) => node.tag === "script"
  );
  if (!script) return;

  const code = script?.children[0] as TextNode | undefined;
  if (!code) return;

  const langProp = script!.props.find(
    (prop) => prop.name === "lang"
  ) as AttributeNode;
  const lang = langProp?.value?.content;
  const isTsx = lang === "tsx";
  const isJsx = isTsx || lang === "jsx";
  if (isJsx) {
    const { offset, line, column } = code.loc.start;
    return {
      isTsx,
      startIndex: offset,
      startLine: line,
      startColumn: column,
      content: code.content,
    };
  }
}
