import type { App, Plugin } from '@td/adapter-vue';
import { createApp, defineComponent, h, nextTick, onMounted, ref } from '@td/adapter-vue';
import type { DialogAlertMethod, DialogConfirmMethod, DialogInstance, DialogMethod, DialogOptions } from '@td/intel/dialog/type';
import { omit } from 'lodash-es';
import { getAttach } from '@td/adapter-utils';
import DialogComponent from './dialog';

const createDialog: DialogMethod = (props: DialogOptions) => {
  const options = { ...props };
  const wrapper = document.createElement('div');
  const visible = ref(false);
  const { className, style } = options;

  let preClassName = className;

  const updateClassNameStyle = (className: string, style: DialogOptions['style']) => {
    if (className) {
      if (preClassName && preClassName !== className) {
        wrapper.firstElementChild.classList.remove(...preClassName.split(' ').map(name => name.trim()));
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

  const component = defineComponent({
    setup(props, { expose }) {
      const dialogOptions = ref<Record<string, any>>(options);
      onMounted(() => {
        visible.value = true;
        // 处理 https://github.com/Tencent/tdesign-vue-next/issues/394
        (document.activeElement as HTMLElement).blur();
        // 避免元素未挂载就触发样式获取，子元素为空的问题
        nextTick(() => {
          updateClassNameStyle(className, style);
        });
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
        const onClose
          = options.onClose
          || function () {
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
      // className & style由updateClassNameStyle来处理
      dialog.update(omit(newOptions, ['className', 'style']));
      updateClassNameStyle(newOptions.className, newOptions.style);
    },
    destroy: () => {
      visible.value = false;
      setTimeout(() => {
        dialogComponent.unmount();
        wrapper.remove();
      }, 300);
    },
    setConfirmLoading: (val: boolean) => {
      dialog.update({ confirmLoading: val });
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

export type DialogPluginType = Plugin & ExtraApi & DialogMethod;

export const DialogPlugin = createDialog as DialogPluginType;

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
