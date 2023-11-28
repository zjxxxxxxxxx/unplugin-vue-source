import type { Position } from '@vue/compiler-dom';
import { traverse, types as t } from '@babel/core';
import { parse, ParserPlugin } from '@babel/parser';

export function transform_JSX(
  code: string,
  cb: (pos: Position) => void,
  options: {
    isTsx?: boolean;
    startIndex?: number;
    startLine?: number;
    startColumn?: number;
  },
) {
  const { isTsx, startIndex = 0, startLine = 1, startColumn = 1 } = options;

  const plugins: ParserPlugin[] = ['jsx'];
  if (isTsx) {
    plugins.push('typescript');
  }

  const ast = parse(code, {
    sourceType: 'unambiguous',
    plugins,
    startLine,
    // babel start at 0
    startColumn: startColumn - 1,
  });
  traverse(ast, {
    JSXOpeningElement({ node }) {
      const nameNode = node.name;
      // <></> return
      if (!nameNode) return;

      const { start } = node.loc!;
      const name = getJSXElementName(nameNode);
      const offset = start.index + startIndex + name.length + 1;

      cb({
        ...start,
        // babel starts at 0, so we need to add 1
        column: start.column + 1,
        offset,
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
