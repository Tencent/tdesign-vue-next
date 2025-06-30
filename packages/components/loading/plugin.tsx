import { App, Plugin, createVNode, defineComponent, h, reactive, render, AppContext } from 'vue';
import { merge } from 'lodash-es';
import LoadingComponent from './loading';
import { usePrefixClass } from '@tdesign/shared-hooks';
import { getAttach, removeClass, addClass } from '@tdesign/shared-utils';
import { TdLoadingProps, LoadingInstance, LoadingMethod } from './type';

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

function createLoading(props: TdLoadingProps, context?: AppContext): LoadingInstance {
  const mergedProps = mergeDefaultProps(props);

  if (mergedProps.fullscreen && fullScreenLoadingInstance) {
    return fullScreenLoadingInstance;
  }

  const component = defineComponent({
    setup() {
      const loadingOptions = reactive(mergedProps);

      return () => h(LoadingComponent, loadingOptions);
    },
  });

  const attach = getAttach(mergedProps.fullscreen ? 'body' : mergedProps.attach);

  const instance = createVNode(component);

  // eslint-disable-next-line no-underscore-dangle
  if (context ?? LoadingPlugin._context) {
    // eslint-disable-next-line no-underscore-dangle
    instance.appContext = context ?? LoadingPlugin._context;
  }

  const wrapper = document.createElement('div');
  render(instance, wrapper);

  const parentRelativeClass = usePrefixClass('loading__parent--relative').value;
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
      removeClass(attach, parentRelativeClass);
      removeClass(document.body, lockClass.value);
      // 卸载组件渲染
      render(null, wrapper);
      wrapper.remove();
    },
  };
  return loadingInstance;
}

function produceLoading(props: boolean | TdLoadingProps, context?: AppContext): LoadingInstance {
  // 全屏加载
  if (props === true) {
    fullScreenLoadingInstance = createLoading(
      {
        fullscreen: true,
        loading: true,
        attach: 'body',
        preventScrollThrough: true,
      },
      context,
    );
    return fullScreenLoadingInstance;
  }

  if (props === false) {
    // 销毁全屏实例
    fullScreenLoadingInstance?.hide();
    fullScreenLoadingInstance = null;
    return;
  }
  return createLoading(props);
}

export type LoadingPluginType = Plugin &
  LoadingMethod & {
    _context?: AppContext;
  };

export const LoadingPlugin: LoadingPluginType = produceLoading as LoadingPluginType;

LoadingPlugin.install = (app: App) => {
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$loading = produceLoading;
  // eslint-disable-next-line no-underscore-dangle
  LoadingPlugin._context = app._context;
};

export default LoadingPlugin;
