import DialogComponent from './dialog';
import { VueConstructor, PluginObject } from 'vue';
import { DialogProps, ConfirmProps, AlertProps } from './type/index';
import { getAttach } from '../utils/dom';

/* eslint-disable no-param-reassign */

const dialogMap: Map<Element, any> = new Map();

function createDialog(options: DialogProps) {
  options.visible = true;
  const dialog = new DialogComponent({
    propsData: options,
  }).$mount();
  const container = getAttach(options.attach);
  container.appendChild(dialog.$el);
  dialogMap.set(dialog.$el, dialog);
  // 事件处理
  const eventNames = ['click-confirm', 'click-close-btn', 'click-cancel', 'keydown-esc', 'click-overlay'];
  const closeType = ['', 'closeBtn', 'cancel', 'esc', 'overlay'];
  const close = () => {
    dialog.visible = false;
    container.contains(dialog.$el) && container.removeChild(dialog.$el);
  };
  eventNames.forEach((eventName) => {
    dialog.$on(eventName, async () => {
      if (eventName === eventNames[0] && options.onConfirm) {
        await options.onConfirm('confirm', close);
      }
      if (eventNames.indexOf(eventName, 1) !== -1 && options.onClose) {
        await options.onClose(closeType[eventNames.indexOf(eventName, 1)], close);
      }
      if (!options.asyncClose) {
        close();
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
    update: (options: any) => {
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
