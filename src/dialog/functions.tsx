/* eslint-disable func-call-spacing */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-use-before-define */

import TDialogComponent from './dialog';
import TButton from '../button';

function getContainer(attach: CreateDialogProps['attach']) {
  return typeof attach === 'string' ? document.querySelector(attach) : attach();
}

type TNode = any;

interface CreateDialogProps {
  class?: string | object;
  style?: string | object;
  visible?: boolean;
  mode?: 'modal' | 'not-modal';
  offset?: string | object;
  width?: string | number;
  header?: boolean | string | (() => TNode);
  body?: boolean | string | (() => TNode);
  footer?: boolean | string | (() => TNode);
  closeBtn?: boolean | ((close: () => void) => TNode);
  showOverlay?: boolean;
  preventScrollThrough?: boolean;
  draggable?: boolean;
  attach?: string | (() => Element);
  zIndex?: number;
  destroyOnClose?: boolean;
}

function createDialog(options: CreateDialogProps) {
  const dialog = new TDialogComponent();
  dialog.$mount();

  const container = getContainer(options.attach || 'body');
  container.appendChild(dialog.$el);

  const update = (options: CreateDialogProps) => {
    const props = Object.keys(dialog.$options.props);
    // TODO class style
    // if (options.class) dialog.
    props.forEach((prop) => {
      if (Object.prototype.hasOwnProperty.apply(options, prop)) dialog[prop] = options[prop];
    });
  };

  const destroy = () => {
    container.removeChild(dialog.$el);
    dialog.$destroy();
  };

  const closeAndDestroy = () => {
    let promise: Promise<void>;
    if (dialog.visible) {
      // 等待 closed 事件
      promise = new Promise((resolve) => {
        dialog.$on('closed', resolve);
      });
      dialog.visible = false;
    } else {
      promise = Promise.resolve();
    }
    return promise.then(() => {
      destroy();
    });
  };

  update(options);

  return {
    dialog,
    update,
    destroy,
    closeAndDestroy,
  };
}

interface ConfirmProps {
  class?: string | object;
  style?: string | object;
  theme?: 'info' | 'warning' | 'success' | 'error';
  header?: string | (() => TNode);
  body?: string | (() => TNode);
  closeBtn?: boolean | ((close: () => void) => TNode);
  offset?: string | object;
  width?: string | number;
  showOverlay?: boolean;
  preventScrollThrough?: boolean;
  attach?: string | (() => Element);
  zIndex?: number;
  confirmContent?: string | ((click: () => void) => TNode);
  cancelContent?: string | ((click: () => void) => TNode);
  loading?: boolean;
  asyncClose?: boolean;
  closeOnClickOverlay?: boolean;
}

export function confirm(options: ConfirmProps) {
  return new Promise<{
    confirm: boolean;
    update: (options: ConfirmProps) => void;
    close: () => Promise<void>;
      }>((resolve) => {
        const getDialogProps = (options: ConfirmProps) => {
          const {
            confirmContent,
            cancelContent,
            loading,
            asyncClose,
            closeOnClickOverlay,
            ...restOptions
          } = {
            theme: 'info',
            offset: 'center',
            preventScrollThrough: true,
            attach: 'body',
            confirmContent: '确定',
            cancelContent: '取消',
            closeOnClickOverlay: true,
            ...options,
          };

          const onConfirm = () => {
            if (!asyncClose) closeAndDestroy();
            resolve({ confirm: true, update, close: closeAndDestroy });
          };
          const onCancel = () => {
            if (!asyncClose) closeAndDestroy();
            resolve({ confirm: false, update, close: closeAndDestroy });
          };

          const props: CreateDialogProps = {
            ...restOptions,
            // @ts-ignore
            footer: h => (/* eslint-disable-line @typescript-eslint/no-unused-vars */
              <div>
                {typeof cancelContent === 'function' ? (
                  cancelContent(onCancel)
                ) : (
                  <TButton theme="line" loading={loading} onClick={onCancel}>
                    {cancelContent}
                  </TButton>
                )}
                {typeof confirmContent === 'function' ? (
                  confirmContent(onConfirm)
                ) : (
                  <TButton theme="primary" loading={loading} onClick={onConfirm}>
                    {confirmContent}
                  </TButton>
                )}
              </div>
            ),
          };

          return { props, onConfirm, onCancel, closeOnClickOverlay };
        };

        let { props, onCancel, closeOnClickOverlay } = getDialogProps(options);

        const { dialog, closeAndDestroy, update: updateDialog } = createDialog(props);

        dialog.$on('clickOverlay', () => {
          if (closeOnClickOverlay) onCancel();
        });

        dialog.$on('clickCloseBtn', () => onCancel());

        const update = (options: ConfirmProps) => {
          const updated = getDialogProps(options);
          props = updated.props;
          onCancel = updated.onCancel;
          closeOnClickOverlay = updated.closeOnClickOverlay;

          updateDialog(props);
        };

        updateDialog({ visible: true });
      });
}

interface AlertProps {
  class?: string | object;
  style?: string | object;
  theme?: 'info' | 'warning' | 'success' | 'error';
  header?: string | (() => TNode);
  body?: string | (() => TNode);
  closeBtn?: boolean | ((close: () => void) => TNode);
  offset?: string | object;
  width?: string | number;
  showOverlay?: boolean;
  preventScrollThrough?: boolean;
  attach?: string | (() => Element);
  zIndex?: number;
  confirmContent?: string | ((click: () => void) => TNode);
  loading?: boolean;
  asyncClose?: boolean;
  closeOnClickOverlay?: boolean;
}

export function alert(options: AlertProps) {
  return new Promise<{
    update: (options: AlertProps) => void;
    close: () => Promise<void>;
      }>((resolve) => {
        const getDialogProps = (options: AlertProps) => {
          const {
            confirmContent,
            loading,
            asyncClose,
            closeOnClickOverlay,
            ...restOptions
          } = {
            theme: 'info',
            offset: 'center',
            preventScrollThrough: true,
            attach: 'body',
            confirmContent: '确定',
            closeOnClickOverlay: true,
            ...options,
          };

          const onConfirm = () => {
            if (!asyncClose) closeAndDestroy();
            resolve({ update, close: closeAndDestroy });
          };

          const props: CreateDialogProps = {
            ...restOptions,
            // @ts-ignore
            footer: h => typeof confirmContent === 'function' ? (/* eslint-disable-line @typescript-eslint/no-unused-vars */
              confirmContent(onConfirm)
            ) : (
            <TButton theme="primary" loading={loading} onClick={onConfirm}>
              {confirmContent}
            </TButton>
            ),
          };

          return { props, onConfirm, closeOnClickOverlay };
        };

        let { props, onConfirm, closeOnClickOverlay } = getDialogProps(options);

        const { dialog, closeAndDestroy, update: updateDialog } = createDialog(props);

        dialog.$on('clickOverlay', () => {
          if (closeOnClickOverlay) onConfirm();
        });

        dialog.$on('clickCloseBtn', () => onConfirm());

        const update = (options: ConfirmProps) => {
          const updated = getDialogProps(options);
          props = updated.props;
          onConfirm = updated.onConfirm;
          closeOnClickOverlay = updated.closeOnClickOverlay;

          updateDialog(props);
        };

        updateDialog({ visible: true });
      });
}
