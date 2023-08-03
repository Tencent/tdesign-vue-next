import { App, createApp, ref, Plugin, defineComponent, h, onMounted } from 'vue';
import DialogComponent from './dialog';
import { getAttach } from '../utils/dom';
import { DialogOptions, DialogMethod, DialogConfirmMethod, DialogAlertMethod, DialogInstance } from './type';

const createDialog: DialogMethod = (props: DialogOptions) => {
  const options = { ...props };
  const wrapper = document.createElement('div');
  const visible = ref(false);
  const { className, style } = options;
  const component = defineComponent({
    setup(props, { expose }) {
      const dialogOptions = ref<Record<string, any>>(options);
      onMounted(() => {
        visible.value = true;
        // 处理 https://github.com/Tencent/tdesign-vue-next/issues/394
        (document.activeElement as HTMLElement).blur();
      });
      const update = (newOptions: DialogOptions) => {
        dialogOptions.value = {
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
        delete options.style;
        return h(DialogComponent, {
          onClose,
          visible: visible.value,
          ...dialogOptions.value,
        });
      };
    },
  });
  const dialogComponent = createApp(component);
  const dialog = dialogComponent.mount(wrapper);

  let preClassName = className;

  const updateClassNameStyle = (className: string, style: DialogOptions['style']) => {
    if (className) {
      if (preClassName !== className) {
        wrapper.firstElementChild.classList.remove(...preClassName.split(' ').map((name) => name.trim()));
      }
      className.split(' ').forEach((name) => {
        wrapper.firstElementChild.classList.add(name.trim());
      });
    }

    if (style) {
      (wrapper.firstElementChild as HTMLElement).style.cssText += style;
    }

    preClassName = className;
  };

  updateClassNameStyle(className, style);

  const container = getAttach(options.attach);
  if (container) {
    container.appendChild(wrapper);
  } else {
    console.error('attach is not exist');
  }

  const dialogNode: DialogInstance = {
    show: () => {
      visible.value = true;
    },
    hide: () => {
      visible.value = false;
    },
    update: (newOptions: DialogOptions) => {
      dialog.update(newOptions);
      updateClassNameStyle(newOptions.className, newOptions.style);
    },
    destroy: () => {
      visible.value = false;
      setTimeout(() => {
        dialogComponent.unmount();
      }, 300);
    },
  };
  return dialogNode;
};
interface ExtraApi {
  confirm: DialogConfirmMethod;
  alert: DialogAlertMethod;
}

const confirm: DialogConfirmMethod = (props: DialogOptions) => createDialog(props);

const alert: DialogAlertMethod = (props: Omit<DialogOptions, 'confirmBtn'>) => {
  const options = { ...props };
  options.cancelBtn = null;
  return createDialog(options);
};

const extraApi: ExtraApi = {
  confirm,
  alert,
};

export type DialogPluginType = Plugin & ExtraApi & DialogAlertMethod;

export const DialogPlugin: DialogPluginType = createDialog as DialogPluginType;

DialogPlugin.install = (app: App): void => {
  app.config.globalProperties.$dialog = createDialog;
  Object.keys(extraApi).forEach((funcName) => {
    app.config.globalProperties.$dialog[funcName] = extraApi[funcName];
  });
};

Object.keys(extraApi).forEach((funcName) => {
  DialogPlugin[funcName] = extraApi[funcName];
});

export default DialogPlugin;
