import { defineConfig } from 'astro/config';
import remarkToc from 'remark-toc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import paragraphToFigure from './src/rehype/paragraph-to-figure';
import replaceWebmImgWithVideo from './src/rehype/replace-webm-img-with-video';
import rehypeMermaid from 'rehype-mermaid';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://detta.dev',

    markdown: {
        syntaxHighlight: {
            type: 'shiki',
            excludeLangs: ['mermaid', 'math'],
        },
        shikiConfig: {
            theme: 'tokyo-night',
        },
        remarkPlugins: [
            [remarkToc, { heading: 'Contents', maxDepth: 3, ordered: true }],
        ],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: 'prepend',
                    content: {
                        type: 'element',
                        tagName: 'span',
                        properties: {},
                        children: [{ type: 'text', value: '#' }],
                    },
                },
            ],
            replaceWebmImgWithVideo,
            paragraphToFigure,
            [rehypeMermaid, {
                dark: true,
                strategy: 'img-svg'
            }],
        ],
    },

    integrations: [sitemap()],
});
