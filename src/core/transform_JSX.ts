import type { Position } from '@vue/compiler-dom';
import { traverse, types as t } from '@babel/core';
import { parse, ParserPlugin } from '@babel/parser';

export function transform_JSX(
  code: string,
  transformer: (pos: Position) => void,
  options: {
    isTsx?: boolean;
    startIndex?: number;
    startLine?: number;
    startColumn?: number;
  },
) {
  const { isTsx, startIndex = 0, startLine = 1, startColumn = 0 } = options;

  const plugins: ParserPlugin[] = ['jsx'];
  if (isTsx) {
    plugins.push('typescript');
  }

  const ast = parse(code, {
    sourceType: 'unambiguous',
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

      const { start } = node.loc!;
      const name = getJSXElementName(nameNode);
      transformer({
        ...start,
        offset: start.index + startIndex + name.length + 1,
      });
    },
  });
}

export function getJSXElementName(
  nameNode: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName,
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

    nameValue = nameValues.join('.');
  }

  return nameValue;
}
