import { App, Plugin, createApp, defineComponent, h, reactive } from 'vue';
import LoadingComponent from './loading';
import { getAttach, removeClass } from '../utils/dom';
import { TdLoadingProps, LoadingInstance, LoadingMethod } from './type';
import { usePrefixClass } from '../hooks/useConfig';

let fullScreenLoadingInstance: LoadingInstance = null;

function createLoading(props: TdLoadingProps): LoadingInstance {
  const component = defineComponent({
    setup() {
      const loadingOptions = reactive(props);
      return {
        loadingOptions,
      };
    },
    render() {
      return h(LoadingComponent, {
        ...this.loadingOptions,
      });
    },
  });

  const attach = getAttach(props.attach);

  const loading = createApp(component).mount(document.createElement('div'));

  if (attach) {
    attach.appendChild(loading.$el);
  } else {
    console.error('attach is not exist');
  }

  const loadingInstance: LoadingInstance = {
    hide: () => {
      loading.loading = false;
      loading.$el.parentNode.removeChild(loading.$el);
    },
  };
  return loadingInstance;
}

function produceLoading(props: boolean | TdLoadingProps): LoadingInstance {
  const lockClass = usePrefixClass('loading--lock');

  // 全屏加载
  if (props === true) {
    fullScreenLoadingInstance = createLoading({
      fullscreen: true,
      loading: true,
      attach: 'body',
    });
    return fullScreenLoadingInstance;
  }
  removeClass(document.body, lockClass.value);

  if (props === false) {
    // 销毁全屏实例
    removeClass(document.body, lockClass.value);
    fullScreenLoadingInstance.hide();
    fullScreenLoadingInstance = null;
    return;
  }
  return createLoading(props);
}

export type LoadingPluginType = Plugin & LoadingMethod;

const LoadingPlugin: LoadingPluginType = produceLoading as LoadingPluginType;

LoadingPlugin.install = (app: App) => {
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$loading = produceLoading;
};

export default LoadingPlugin;
