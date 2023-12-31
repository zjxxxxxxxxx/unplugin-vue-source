import { type Position } from '@vue/compiler-dom';
import fromMarkdown from 'mdast-util-from-markdown';
import { fromMarkdown as mdxJsxFromMarkdown } from 'mdast-util-mdx-jsx';
import mdxjs from 'micromark-extension-mdxjs';
import visit from 'unist-util-visit';

const mdxJsxRE = /^mdxJsx/;

export function transform_MDX(code: string, cb: (pos: Position) => void) {
  const ast = fromMarkdown(code, 'utf-8', {
    extensions: [mdxjs()],
    mdastExtensions: [mdxJsxFromMarkdown],
  });
  visit(ast, (node) => {
    if (mdxJsxRE.test(node.type) && 'name' in node && node.name != null) {
      const { start } = node.position!;
      const offset = start.offset! + (node.name as any).length + 1;

      cb({ ...start, offset });
    }
  });
}
