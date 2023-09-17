import { traverse, types as t } from "@babel/core";
import { parse, ParserPlugin } from "@babel/parser";
import MagicString from "magic-string";
import { TRACE_ID } from "./constants";

export function transform_JSX(
  code: string,
  s: MagicString,
  options: {
    file: string;
    isTsx?: boolean;
    startIndex?: number;
    startLine?: number;
    startColumn?: number;
  }
) {
  const {
    file,
    isTsx,
    startIndex = 0,
    startLine = 1,
    startColumn = 0,
  } = options;

  const plugins: ParserPlugin[] = ["jsx"];
  if (isTsx) {
    plugins.push("typescript");
  }

  const ast = parse(code, {
    sourceType: "unambiguous",
    plugins,
    startLine,
    startColumn,
  })!;
  traverse(ast, {
    JSXOpeningElement({ node }) {
      const nameNode = node.name;
      if (!nameNode) {
        // <></> return
        return;
      }

      const { index, line, column } = node.loc!.start;
      const name = getJSXElementName(nameNode);
      const prependIndex = index + startIndex + name.length + 1;
      s.prependLeft(prependIndex, ` ${TRACE_ID}="${file}:${line}:${column}"`);
    },
  });
}

export function getJSXElementName(
  nameNode: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName
) {
  let nameValue: string;

  // example: `<div></div>`
  if (t.isJSXIdentifier(nameNode)) {
    nameValue = nameNode.name;
  }
  // example: `<foo:bar></foo:bar>`
  else if (t.isJSXNamespacedName(nameNode)) {
    const { namespace, name } = nameNode;
    nameValue = `${namespace.name}:${name.name}`;
  }
  // example: `<List.Item></List.Item>`
  else {
    const nameValues: string[] = [];

    while (t.isJSXMemberExpression(nameNode)) {
      nameValues.unshift(nameNode.property.name);
      nameNode = nameNode.object;
    }
    nameValues.unshift(nameNode.name);

    nameValue = nameValues.join(".");
  }

  return nameValue;
}
