import { App, createApp, ref, defineComponent, h } from 'vue';
import DialogComponent from './dialog';
import { getAttach } from '../utils/dom';
import {
  DialogOptions,
  DialogMethod,
  DialogConfirmMethod,
  DialogAlertMethod,
  DialogInstance,
} from '../../types/dialog/TdDialogProps';

const createDialog: DialogMethod = (props: DialogOptions) => {
  const options = { ...props };
  const wrapper = document.createElement('div');
  const visible = ref(true);
  const component = defineComponent({
    data() {
      return {
        dialogOptions: options as Record<string, any>,
      };
    },
    render() {
      const onClose = options.onClose || function () {
        visible.value = false;
      };
      return h(DialogComponent, {
        onClose,
        visible: visible.value,
        ...this.dialogOptions,
      });
    },
  });
  const dialog = createApp(component).mount(wrapper);

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
      container.removeChild(wrapper);
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

const DialogPlugin = {
  /* eslint-disable no-param-reassign */
  install: (app: App): void => {
    app.config.globalProperties.$dialog = createDialog;
    Object.keys(extraApi).forEach((funcName) => {
      app.config.globalProperties.$dialog[funcName] = extraApi[funcName];
    });
  },
};

Object.keys(extraApi).forEach((funcName) => {
  DialogPlugin[funcName] = extraApi[funcName];
});

export default DialogPlugin;
