import { type Position } from '@vue/compiler-dom';
import { type Processor } from '@mdx-js/mdx/internal-create-format-aware-processors';
import { createProcessor } from '@mdx-js/mdx';
import { visit } from 'unist-util-visit';

const mdxJsxRE = /^mdxJsx/;

let processor: Processor;
export function transform_MDX(code: string, cb: (pos: Position) => void) {
  processor ||= createProcessor({});

  const ast = processor.parse(code);
  visit(
    ast,
    (node) => mdxJsxRE.test(node.type),
    (node) => {
      if ('name' in node && node.name != null) {
        const { start } = node.position!;
        const offset = start.offset! + node.name.length + 1;

        cb({ ...start, offset });
      }
    },
  );
}
