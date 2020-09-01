import DialogComponent from './dialog';
import { VueConstructor, PluginObject } from 'vue';
import { DialogProps, ConfirmProps, AlertProps } from './type/index';
import { getAttach } from '../utils/dom';

/* eslint-disable no-param-reassign */

function createDialog(options: DialogProps) {
  options.visible = true;
  const dialog = new DialogComponent({
    propsData: options,
  }).$mount();
  const container = getAttach(options.attach);
  container.appendChild(dialog.$el);
  // 事件处理
  const eventNames = ['click-confirm', 'click-close-btn', 'click-cancel', 'keydown-esc', 'click-overlay'];
  const eventTypes = ['confirm', 'closeBtn', 'cancel', 'esc', 'overlay'];
  const close = () => {
    dialog.visible = false;
    container.contains(dialog.$el) && container.removeChild(dialog.$el);
  };
  eventNames.forEach((eventName) => {
    dialog.$on(eventName, async () => {
      try {
        if (eventName === eventNames[0] && typeof options.onConfirm === 'function') {
          await options.onConfirm(eventTypes[0], close);
        }
        const closeType = eventNames.indexOf(eventName, 1);
        if (closeType !== -1 && typeof options.onClose === 'function') {
          await options.onClose(eventTypes[closeType], close);
        }
        close(); // onConfirm/onClose 在 reject 时，不在组件内部执行关闭
      } catch (e) {
        console.warn(e);
      }
    });
  });
  const dialogNode = {
    show: () => {
      dialog.visible = true;
    },
    hide: () => {
      dialog.visible = false;
    },
    update: (options: DialogProps) => {
      Object.assign(dialog, options);
    },
    destroy: () => {
      close();
    },
  };
  return dialogNode;
}

const DialogPlugin = createDialog as (typeof createDialog & PluginObject<void>);

DialogPlugin.confirm = (options: ConfirmProps) => createDialog(options);

DialogPlugin.alert = (options: AlertProps) => {
  options.cancelContent = false;
  return createDialog(options);
};

DialogPlugin.install = (Vue: VueConstructor) => {
  Vue.prototype.$dialog = DialogPlugin;
};

export default DialogPlugin;
