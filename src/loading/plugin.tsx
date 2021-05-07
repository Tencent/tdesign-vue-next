import Loading from './loading';
import { App, Plugin, createApp, ref, defineComponent } from 'vue';
import { LoadingProps } from './type/index';

import type { Ref } from 'vue';

interface TdLoadingHandlder {
  show: () => void;
  hide: () => void;
}
interface TdLoadingPlugin {
  (opts: LoadingProps): TdLoadingHandlder;
  show?: (opts: LoadingProps) => void;
  hide?: (opts: LoadingProps) => void;
  install?: Plugin;
}

let wrapper: Element = null;
let loading: Ref<boolean> = ref(false);

function createLoading(options: LoadingProps) {
  if (options.loading) {
    if (wrapper) {
      loading.value = true;
    } else {
      loading = ref(true);
      wrapper = document.createElement('div');
      const componet = defineComponent({
        render() {
          return (<Loading {...options} loading={loading.value} fullscreen isService />);
        },
      });
      createApp(componet).mount(wrapper);
      document.body.appendChild(wrapper);
    }
  } else {
    document.body.removeChild(wrapper);
  }

  return {
    show: () => {
      loading.value = true;
    },
    hide: () => {
      loading.value = false;
    },
  };
}

const LoadingPlugin: TdLoadingPlugin = createLoading;

LoadingPlugin.show = (options: LoadingProps) => {
  createLoading({ ...options, loading: true });
};
LoadingPlugin.hide = (options: LoadingProps) => {
  createLoading({ ...options, loading: false });
};
LoadingPlugin.install = (app: App) => {
  app.config.globalProperties.$loading = LoadingPlugin; // eslint-disable-line
};

export default LoadingPlugin;
