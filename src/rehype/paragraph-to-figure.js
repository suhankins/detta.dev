import { visit } from 'unist-util-visit';

/**
 * Converts paragraphs with an image and description text to <figure>
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure
 */
export default function paragraphToFigure() {
    /**
     * Transform.
     *
     * @param {Root} tree
     *   Tree.
     * @returns {undefined}
     *   Nothing.
     */
    return function (tree) {
        visit(tree, 'element', function (node, index, parent) {
            if (
                !parent ||
                typeof index !== 'number' ||
                node.tagName !== 'p' ||
                !node.children.find(
                    ({ tagName }) =>
                        tagName === 'img' ||
                        tagName === 'picture' ||
                        tagName === 'video'
                ) ||
                !node.children.find(({ tagName }) => tagName === 'em')
            ) {
                return;
            }

            const descriptionIndex = node.children.findIndex(
                ({ tagName }) => tagName === 'em'
            );
            const children = node.children.toSpliced(descriptionIndex, 1, {
                ...node.children[descriptionIndex],
                tagName: 'figcaption',
            });

            parent.children[index] = {
                type: 'element',
                tagName: 'figure',
                properties: {},
                children,
            };
        });
    };
}
