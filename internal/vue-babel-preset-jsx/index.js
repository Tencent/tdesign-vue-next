import babelSugarFunctionalVue from '@vue/babel-sugar-functional-vue';
import babelSugarInjectH from '@vue/babel-sugar-inject-h';
import babelSugarCompositionApiInjectH from '@vue/babel-sugar-composition-api-inject-h';
import babelSugarCompositionApiRenderInstance from '@vue/babel-sugar-composition-api-render-instance';
import babelSugarVModel from '@vue/babel-sugar-v-model';
import babelSugarVOn from '@vue/babel-sugar-v-on';
import babelPluginTransformVueJsx from './babel-plugin-transform-vue-jsx/index.js';

export default (_, {
  functional = true,
  injectH = true,
  vModel = true,
  vOn = true,
  compositionAPI = false,
} = {}) => {
  // compositionAPI: 'auto' | 'native' | 'plugin' | 'vue-demi' | false | { importSource: string; }
  // legacy: compositionAPI: true (equivalent to 'auto')
  // bonus:  compositionAPI: 'naruto' (equivalent to 'native')
  let injectHPlugin = babelSugarInjectH;
  let importSource = '@vue/composition-api';

  if (compositionAPI) {
    if (['native', 'naruto'].includes(compositionAPI)) {
      importSource = 'vue';
    }

    if (compositionAPI === 'vue-demi') {
      importSource = 'vue-demi';
    }

    if (['auto', true].includes(compositionAPI)) {
      try {
        const vueVersion = require('vue/package.json').version;
        if (vueVersion.startsWith('2.7')) {
          importSource = 'vue';
        }
      } catch (e) { }
    }

    if (typeof compositionAPI === 'object' && compositionAPI.importSource) {
      importSource = compositionAPI.importSource;
    }

    injectHPlugin = [babelSugarCompositionApiInjectH, { importSource }];
  }
  return {
    plugins: [
      functional && babelSugarFunctionalVue,
      injectH && injectHPlugin,
      vModel && babelSugarVModel,
      vOn && babelSugarVOn,
      compositionAPI && [babelSugarCompositionApiRenderInstance, { importSource }],
      babelPluginTransformVueJsx,
    ].filter(Boolean),
  };
};
