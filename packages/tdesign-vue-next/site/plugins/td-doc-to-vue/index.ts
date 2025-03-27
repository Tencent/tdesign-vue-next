import vue from '@vitejs/plugin-vue';
// @ts-ignore
import vitePluginTdoc from 'vite-plugin-tdoc';
import transforms from './transforms';
import renderDemo from './render-demo';

export default () =>
  vitePluginTdoc({
    plugins: [
      vue({
        include: [/\.md$/],
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('td-'),
          },
        },
      }),
    ],
    transforms,
    markdown: {
      anchor: {
        tabIndex: false,
        config: (anchor: any) => ({
          permalink: anchor.permalink.linkInsideHeader({ symbol: '' }),
        }),
      },
      toc: {
        listClass: 'tdesign-toc_list',
        itemClass: 'tdesign-toc_list_item',
        linkClass: 'tdesign-toc_list_item_a',
        containerClass: 'tdesign-toc_container',
      },
      container(md: any, container: any) {
        renderDemo(md, container);
      },
    },
  });
