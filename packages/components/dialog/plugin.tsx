import { App, ref, Plugin, defineComponent, h, onMounted, nextTick, AppContext, createVNode, render } from 'vue';
import DialogComponent from './dialog';
import { getAttach } from '@tdesign/shared-utils';
import { DialogOptions, DialogMethod, DialogConfirmMethod, DialogAlertMethod, DialogInstance } from './type';
import { omit } from 'lodash-es';

const createDialog: DialogMethod = (props, context) => {
  const options = { ...props };
  const wrapper = document.createElement('div');
  const visible = ref(false);
  const { className, style } = options;

  let preClassName = className;

  const updateClassNameStyle = (className: string, style: DialogOptions['style']) => {
    if (className) {
      if (preClassName && preClassName !== className) {
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

  function destroySelf() {
    render(null, wrapper);
    wrapper.remove();
  }

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
  const dialog = createVNode(component);
  // eslint-disable-next-line no-underscore-dangle
  if (context ?? DialogPlugin._context) {
    // eslint-disable-next-line no-underscore-dangle
    dialog.appContext = context ?? DialogPlugin._context;
  }

  const container = getAttach(options.attach);
  if (container) {
    container.appendChild(wrapper);
  } else {
    console.error('attach is not exist');
  }

  render(dialog, wrapper);

  const dialogNode: DialogInstance = {
    show: () => {
      visible.value = true;
    },
    hide: () => {
      visible.value = false;
    },
    update: (newOptions: DialogOptions) => {
      // className & style由updateClassNameStyle来处理
      dialog.component.exposed.update(omit(newOptions, ['className', 'style']));
      updateClassNameStyle(newOptions.className, newOptions.style);
    },
    destroy: () => {
      visible.value = false;
      setTimeout(() => {
        destroySelf();
      }, 300);
    },
    setConfirmLoading: (val: boolean) => {
      dialog.component.exposed.update({ confirmLoading: val });
    },
  };
  return dialogNode;
};
interface ExtraApi {
  confirm: DialogConfirmMethod;
  alert: DialogAlertMethod;
}

type ExtraApiType = keyof ExtraApi;

const confirm: DialogConfirmMethod = (props: DialogOptions, context?: AppContext) => createDialog(props, context);

const alert: DialogAlertMethod = (props: Omit<DialogOptions, 'confirmBtn'>, context?: AppContext) => {
  const options = { ...props };
  options.cancelBtn = null;
  return createDialog(options, context);
};

const extraApi: ExtraApi = {
  confirm,
  alert,
};

export type DialogPluginType = Plugin &
  ExtraApi &
  DialogMethod & {
    _context?: AppContext;
  };

export const DialogPlugin = createDialog as DialogPluginType;

DialogPlugin.install = (app: App): void => {
  app.config.globalProperties.$dialog = createDialog;
  // 如果使用 use 方法，自动绑定当前 App 的 context
  // eslint-disable-next-line no-underscore-dangle
  DialogPlugin._context = app._context;
  Object.keys(extraApi).forEach((funcName: ExtraApiType) => {
    app.config.globalProperties.$dialog[funcName] = extraApi[funcName];
  });
};

Object.keys(extraApi).forEach((funcName: ExtraApiType) => {
  DialogPlugin[funcName] = extraApi[funcName];
});

export default DialogPlugin;
