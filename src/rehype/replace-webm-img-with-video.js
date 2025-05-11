import { visit } from 'unist-util-visit';

/**
 * Replaces `<img>` tags with `.webm` videos embedded with actual `<video>` tags
 */
export default function replaceWebmImgWithVideo() {
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
                node.tagName !== 'img' ||
                !node.properties.src ||
                !(
                    node.properties.src.endsWith('.webm') ||
                    node.properties.src.endsWith('.mp4')
                )
            ) {
                return;
            }

            const videoTag = {
                type: 'element',
                tagName: 'video',
                properties: {
                    width: '720',
                    controls: true,
                    'aria-label': node.properties.alt,
                    title: node.properties.alt,
                },
                children: [
                    {
                        type: 'element',
                        tagName: 'source',
                        properties: {
                            src: node.properties.src.replace('.mp4', '.webm'),
                            type: 'video/webm',
                        },
                        children: [],
                    },
                    {
                        type: 'element',
                        tagName: 'source',
                        properties: {
                            src: node.properties.src.replace('.webm', '.mp4'),
                            type: 'video/mp4',
                        },
                        children: [],
                    },
                ],
            };

            parent.children[index] = videoTag;
        });
    };
}
