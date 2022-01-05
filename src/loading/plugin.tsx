import { App, Plugin, createApp, defineComponent, h } from 'vue';
import LoadingComponent from './loading';
import { prefix } from '../config';
import { getAttach, removeClass } from '../utils/dom';
import { TdLoadingProps, LoadingInstance, LoadingMethod } from './type';

const lockClass = `${prefix}-loading--lock`;

let fullScreenLoadingInstance: LoadingInstance = null;

function createLoading(props: TdLoadingProps): LoadingInstance {
  const options = { ...props };
  const component = defineComponent({
    data() {
      return {
        loadingOptions: options as Record<string, any>,
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
  // 全屏加载
  // 全屏加载
  if (props === true) {
    fullScreenLoadingInstance = createLoading({
      fullscreen: true,
      loading: true,
      attach: 'body',
    });
    return fullScreenLoadingInstance;
  }
  removeClass(document.body, lockClass);

  if (props === false) {
    // 销毁全屏实例
    removeClass(document.body, lockClass);
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
