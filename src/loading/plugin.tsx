import { App, Plugin, createApp, defineComponent, h, reactive } from 'vue';
import merge from 'lodash/merge';
import LoadingComponent from './loading';
import { getAttach, removeClass, addClass } from '../utils/dom';
import { TdLoadingProps, LoadingInstance, LoadingMethod } from './type';
import { usePrefixClass } from '../hooks/useConfig';

let fullScreenLoadingInstance: LoadingInstance = null;

function mergeDefaultProps(props: TdLoadingProps): TdLoadingProps {
  const options: TdLoadingProps = merge(
    {
      fullscreen: false,
      attach: 'body',
      loading: true,
      preventScrollThrough: true,
    },
    props,
  );

  return options;
}

function createLoading(props: TdLoadingProps): LoadingInstance {
  const mergedProps = mergeDefaultProps(props);
  const component = defineComponent({
    setup() {
      const loadingOptions = reactive(mergedProps);
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

  const attach = getAttach(mergedProps.fullscreen ? 'body' : mergedProps.attach);

  const app = createApp(component);
  const loading = app.mount(document.createElement('div'));
  const parentRelativeClass = usePrefixClass('loading__parent--relative').value;
  const prefixClass = usePrefixClass('loading');
  const lockClass = usePrefixClass('loading--lock');
  const lockFullscreen = mergedProps.preventScrollThrough && mergedProps.fullscreen;

  if (lockFullscreen) {
    addClass(document.body, lockClass.value);
  }

  if (attach) {
    addClass(attach, parentRelativeClass);
  } else {
    console.error('attach is not exist');
  }

  const loadingInstance: LoadingInstance = {
    hide: () => {
      loading.loading = false;
      attach.querySelectorAll(`.${prefixClass.value}`)?.forEach((item) => {
        item.remove();
      });
      removeClass(attach, parentRelativeClass);
      removeClass(document.body, lockClass.value);
      app.unmount();
    },
  };
  return loadingInstance;
}

function produceLoading(props: boolean | TdLoadingProps): LoadingInstance {
  // 全屏加载
  if (props === true) {
    fullScreenLoadingInstance = createLoading({
      fullscreen: true,
      loading: true,
      attach: 'body',
      preventScrollThrough: true,
    });
    return fullScreenLoadingInstance;
  }

  if (props === false) {
    // 销毁全屏实例
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
