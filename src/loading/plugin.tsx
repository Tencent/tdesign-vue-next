import LoadingComponent from './loading';
import { App, Plugin, createApp, defineComponent, h } from 'vue';
import { prefix } from '../config';
import { getAttach, removeClass } from '../utils/dom';
import { TdLoadingProps, LoadingInstance, LoadingMethod } from './type';

const lockClass = `${prefix}-loading-lock`;

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

  const container = getAttach(props.attach);

  const loading = createApp(component).mount(document.createElement('div'));

  if (container) {
    container.appendChild(loading.$el);
  } else {
    console.error('attach is not exist');
  }

  const loadingInstance: LoadingInstance = {
    hide: () => {
      container.contains(loading.$el) && container.removeChild(loading.$el);
      if (props.attach) {
        while (container.getElementsByClassName('t-loading').length) {
          container.removeChild(container.getElementsByClassName('t-loading')[0]);
        }
      }
    },
  };
  return loadingInstance;
}

function produceLoading(props: boolean | TdLoadingProps): LoadingInstance {
  // 全屏加载
  if (typeof props === 'boolean' && props) {
    return createLoading({
      fullscreen: true,
      loading: true,
    });
  }

  // 销毁全屏实例
  if (typeof props === 'boolean' && !props) {
    removeClass(document.body, lockClass);
    document.body.removeChild(getAttach('body > .t-loading-fullscreen'));
    return;
  }

  // 自定义配置
  const options = { ...(props as TdLoadingProps) };
  return createLoading(options);
}

export type LoadingPluginType = Plugin & LoadingMethod;

const LoadingPlugin: LoadingPluginType = produceLoading as LoadingPluginType;

LoadingPlugin.install = (app: App) => {
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$loading = produceLoading;
};

export default LoadingPlugin;
