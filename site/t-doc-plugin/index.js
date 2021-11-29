import createVuePlugin from '@vitejs/plugin-vue';
import { mergeOptions, debug } from './utils';
import { createMarkdown } from './markdown';
import transforms from './transform';

function markdownPlugin(userOptions = {}) {
  const options = mergeOptions(userOptions);
  const mdRender = createMarkdown(options);

  return {
    name: 'tdesign-markdown',
    enforce: 'pre',

    transform(raw, id) {
      if (!id.endsWith('.md')) return null;

      return mdRender(raw, id);
    },
  };
}

export { transforms };

export const createTDesignPlugin = () => {
  debug('tdesign plugins loaded.');

  const vuePlugin = createVuePlugin({
    include: [/\.md$/],
    ssr: false,
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('td-'),
      },
    },
  });

  return [vuePlugin, markdownPlugin({ transforms: transforms() })];
};
