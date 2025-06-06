import { App, createApp, ref, Plugin, defineComponent, h, onMounted, nextTick } from 'vue';
import DrawerComponent from './drawer';
import { getAttach } from '@tdesign/shared-utils';
import { DrawerOptions, DrawerMethod, DrawerInstance } from './type';
import { omit } from 'lodash-es';

const createDrawer: DrawerMethod = (props: DrawerOptions) => {
  const options = { ...props };
  const wrapper = document.createElement('div');
  const visible = ref(false);
  const { style } = options;

  const updateStyle = (style: DrawerOptions['style']) => {
    if (style) {
      (wrapper.firstElementChild as HTMLElement).style.cssText += style;
    }
  };

  const component = defineComponent({
    setup(props, { expose }) {
      const drawerOptions = ref<Record<string, any>>(options);
      onMounted(() => {
        visible.value = true;
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
  const drawerComponent = createApp(component);
  const drawer = drawerComponent.mount(wrapper);

  const destroyDrawer = () => {
    visible.value = false;
    setTimeout(() => {
      drawerComponent.unmount();
      wrapper.remove();
    }, 300);
  };

  const container = getAttach(options.attach);
  if (container) {
    container.appendChild(wrapper);
  } else {
    console.error('attach is not exist');
  }

  const drawerNode: DrawerInstance = {
    show: () => {
      visible.value = true;
    },
    hide: () => {
      visible.value = false;
    },
    update: (newOptions: DrawerOptions) => {
      // className & style由updateClassNameStyle来处理
      drawer.update(omit(newOptions, ['style']));
      updateStyle(newOptions.style);
    },
    destroy: () => {
      destroyDrawer();
    },
  };
  return drawerNode;
};

export type DrawerPluginType = Plugin & DrawerMethod;

export const DrawerPlugin = createDrawer as DrawerPluginType;

DrawerPlugin.install = (app: App): void => {
  app.config.globalProperties.$drawer = createDrawer;
};

export default DrawerPlugin;
