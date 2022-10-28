import { App, createApp, ref, Plugin, defineComponent, h, onMounted } from 'vue';
import DrawerComponent from './drawer';
import { getAttach } from '../utils/dom';
import { DrawerOptions, DrawerMethod, DrawerInstance } from './type';

const createDrawer: DrawerMethod = (props: DrawerOptions) => {
  const options = { ...props };
  const wrapper = document.createElement('div');
  const visible = ref(false);
  const { className } = options;
  const component = defineComponent({
    setup(props, { expose }) {
      const drawerOptions = ref<Record<string, any>>(options);
      onMounted(() => {
        visible.value = true;
        // 处理 https://github.com/Tencent/tdesign-vue-next/issues/394
        (document.activeElement as HTMLElement).blur();
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
        delete options.className;
        return h(DrawerComponent, {
          onClose,
          visible: visible.value,
          ...drawerOptions.value,
        });
      };
    },
  });
  const drawer = createApp(component).mount(wrapper);

  if (className) {
    className.split(' ').forEach((name) => {
      drawer.$el.classList.add(name.trim());
    });
  }
  if (options.style) {
    (drawer.$el as HTMLElement).style.cssText += options.style;
  }

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
      drawer.update(newOptions);
    },
    destroy: () => {
      visible.value = false;
      setTimeout(() => {
        wrapper.parentNode.removeChild(wrapper);
      }, 300);
    },
  };
  return drawerNode;
};

export type DrawerPluginType = Plugin;

export const DrawerPlugin: DrawerPluginType = createDrawer as DrawerPluginType;
DrawerPlugin.install = (app: App): void => {
  app.config.globalProperties.$drawer = createDrawer;
};

export default DrawerPlugin;
