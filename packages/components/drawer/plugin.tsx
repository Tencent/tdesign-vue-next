import { App, ref, Plugin, defineComponent, h, onMounted, nextTick, render, createVNode, AppContext } from 'vue';
import DrawerComponent from './drawer';
import { getAttach } from '@tdesign/shared-utils';
import { DrawerOptions, DrawerMethod, DrawerInstance } from './type';
import { omit } from 'lodash-es';

const createDrawer: DrawerMethod = (props, context) => {
  const options = { ...props };
  const wrapper = document.createElement('div');
  const visible = ref(false);
  const { style } = options;

  const updateStyle = (style: DrawerOptions['style']) => {
    if (style) {
      (wrapper.firstElementChild as HTMLElement).style.cssText += style;
    }
  };

  function destroySelf() {
    render(null, wrapper);
    wrapper.remove();
  }

  const component = defineComponent({
    setup(props, { expose }) {
      const drawerOptions = ref<Record<string, any>>(options);
      onMounted(() => {
        nextTick(() => {
          visible.value = true;
        });
        (document.activeElement as HTMLElement).blur();
        nextTick(() => {
          updateStyle(style);
        });
      });
      const update = (newOptions: DrawerOptions) => {
        drawerOptions.value = {
          ...options,
          ...newOptions,
        };
      };

      expose({
        update,
      });

      return () => {
        const onClose =
          options.onClose ||
          function () {
            visible.value = false;
            if (options.destroyOnClose) {
              setTimeout(() => {
                destroySelf();
              }, 300);
            }
          };
        delete options.style;
        return h(DrawerComponent, {
          onClose,
          visible: visible.value,
          drawerClassName: drawerOptions.value?.className,
          ...drawerOptions.value,
        });
      };
    },
  });
  const drawerComponent = createVNode(component);
  // eslint-disable-next-line no-underscore-dangle
  if (context ?? DrawerPlugin._context) {
    // eslint-disable-next-line no-underscore-dangle
    drawerComponent.appContext = context ?? DrawerPlugin._context;
  }
  const container = getAttach(options.attach);
  if (container) {
    container.appendChild(wrapper);
  } else {
    console.error('attach is not exist');
  }

  render(drawerComponent, wrapper);

  const destroyDrawer = () => {
    visible.value = false;
    setTimeout(() => {
      destroySelf();
    }, 400);
  };

  const drawerNode: DrawerInstance = {
    show: () => {
      visible.value = true;
    },
    hide: () => {
      visible.value = false;
    },
    update: (newOptions: DrawerOptions) => {
      // className & style由updateClassNameStyle来处理
      drawerComponent.component.exposed.update(omit(newOptions, ['style']));
      updateStyle(newOptions.style);
    },
    destroy: () => {
      destroyDrawer();
    },
  };
  return drawerNode;
};

export type DrawerPluginType = Plugin &
  DrawerMethod & {
    _context?: AppContext;
  };

export const DrawerPlugin = createDrawer as DrawerPluginType;

DrawerPlugin.install = (app: App): void => {
  // 如果使用 use 方法，自动绑定当前 App 的 context
  // eslint-disable-next-line no-underscore-dangle
  DrawerPlugin._context = app._context;
  app.config.globalProperties.$drawer = createDrawer;
};

export default DrawerPlugin;
