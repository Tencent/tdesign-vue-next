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
  return new Promise((resolve) => {
    const container = getAttach(options.attach);
    container.appendChild(dialog.$el);
    dialogMap.set(dialog.$el, dialog);
    // 事件处理
    const eventNames = ['click-confirm', 'click-close-btn', 'click-cancel', 'keydown-esc', 'click-overlay'];
    const close = () => {
      dialog.visible = false;
      container.removeChild(dialog.$el);
    };
    eventNames.forEach((eventName) => {
      dialog.$on(eventName, () => {
        if (!options.asyncClose) {
          close();
        }
        resolve({
          eventName,
          confirm: eventName === eventNames[0],
          close,
          vnode: dialog,
        });
      });
    });
  });
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
