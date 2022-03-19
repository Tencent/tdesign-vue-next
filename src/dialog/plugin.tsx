import { App, createApp, ref, Plugin, defineComponent, h, onMounted } from 'vue';
import DialogComponent from './dialog';
import { getAttach } from '../utils/dom';
import { DialogOptions, DialogMethod, DialogConfirmMethod, DialogAlertMethod, DialogInstance } from './type';

const createDialog: DialogMethod = (props: DialogOptions) => {
  const options = { ...props };
  const wrapper = document.createElement('div');
  const visible = ref(false);
  const { className } = options;
  const component = defineComponent({
    setup() {
      const dialogOptions = ref<Record<string, any>>(options);
      onMounted(() => {
        visible.value = true;
        // 处理 https://github.com/Tencent/tdesign-vue-next/issues/394
        (document.activeElement as HTMLElement).blur();
      });
      return {
        dialogOptions,
      };
    },
    render() {
      const onClose =
        options.onClose ||
        function () {
          visible.value = false;
        };
      delete options.className;
      return h(DialogComponent, {
        onClose,
        visible: visible.value,
        ...this.dialogOptions,
      });
    },
  });
  const dialog = createApp(component).mount(wrapper);

  if (className) {
    className.split(' ').forEach((name) => {
      dialog.$el.classList.add(name.trim());
    });
  }
  if (options.style) {
    (dialog.$el as HTMLElement).style.cssText += options.style;
  }

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
    update: (options: DialogOptions) => {
      Object.assign(dialog, { dialogOptions: options });
    },
    destroy: () => {
      visible.value = false;
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
