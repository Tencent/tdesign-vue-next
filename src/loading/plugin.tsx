import LoadingComponent from './loading';
import { VueConstructor, PluginObject } from 'vue';
import { LoadingProps } from './type/index';
import { getAttach } from '../utils/dom';

function createLoading(options: LoadingProps) {
  const loadingObj = new LoadingComponent({
    propsData: { ...options, fullscreen: true, isService: true },
  }).$mount();
  if (options.loading) {
    document.body.appendChild(loadingObj.$el);
  } else {
    document.body.removeChild(getAttach('body > .t-loading-parent__relative'));
  }

  return {
    show: () => {
      loadingObj.loading = true;
    },
    hide: () => {
      loadingObj.loading = false;
    },
  };
}
const LoadingPlugin = createLoading as (typeof createLoading & PluginObject<void>);
LoadingPlugin.show = (options: LoadingProps) => {
  createLoading({ ...options, loading: true });
};
LoadingPlugin.hide = (options: LoadingProps) => {
  createLoading({ ...options, loading: false });
};
LoadingPlugin.install = (Vue: VueConstructor) => {
  Vue.prototype.$loading = LoadingPlugin; // eslint-disable-line
};

export default LoadingPlugin;
