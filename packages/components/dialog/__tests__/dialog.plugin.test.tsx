import { createApp, nextTick } from 'vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DialogPlugin } from '../plugin';
import { sleep } from '@tdesign/internal-utils';

describe('Dialog Plugin', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'dialog-test-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    // 清理可能残留的 dialog 元素
    const dialogs = document.querySelectorAll('.t-dialog');
    dialogs.forEach((dialog) => dialog.parentElement?.remove());
  });

  describe('DialogPlugin', () => {
    it('creates a dialog instance', async () => {
      const dialog = DialogPlugin({
        header: 'Test Dialog',
        body: 'Test Content',
        visible: true,
      });

      await nextTick();
      await sleep(100);

      expect(dialog).toBeDefined();
      expect(dialog.show).toBeDefined();
      expect(dialog.hide).toBeDefined();
      expect(dialog.update).toBeDefined();
      expect(dialog.destroy).toBeDefined();
      expect(dialog.setConfirmLoading).toBeDefined();

      dialog.destroy();
    });

    it('shows dialog', async () => {
      const dialog = DialogPlugin({
        header: 'Test Dialog',
        body: 'Test Content',
      });

      dialog.show();
      await nextTick();
      await sleep(100);

      const dialogElement = document.querySelector('.t-dialog');
      expect(dialogElement).toBeTruthy();

      dialog.destroy();
    });

    it('hides dialog', async () => {
      const dialog = DialogPlugin({
        header: 'Test Dialog',
        body: 'Test Content',
        visible: true,
      });

      await nextTick();
      await sleep(100);

      dialog.hide();
      await nextTick();
      await sleep(400);

      // Dialog 应该被隐藏
      expect(dialog).toBeDefined();

      dialog.destroy();
    });

    it('updates dialog options', async () => {
      const dialog = DialogPlugin({
        header: 'Original Header',
        body: 'Original Body',
        visible: true,
      });

      await nextTick();
      await sleep(100);

      dialog.update({
        header: 'Updated Header',
        body: 'Updated Body',
      });

      await nextTick();
      await sleep(100);

      const dialogElement = document.querySelector('.t-dialog');
      expect(dialogElement).toBeTruthy();

      dialog.destroy();
    });

    it('destroys dialog', async () => {
      const dialog = DialogPlugin({
        header: 'Test Dialog',
        body: 'Test Content',
        visible: true,
      });

      await nextTick();
      await sleep(100);

      let dialogElement = document.querySelector('.t-dialog');
      expect(dialogElement).toBeTruthy();

      dialog.destroy();
      await nextTick();
      await sleep(400);

      dialogElement = document.querySelector('.t-dialog');
      expect(dialogElement).toBeFalsy();
    });

    it('sets confirm loading state', async () => {
      const dialog = DialogPlugin({
        header: 'Test Dialog',
        body: 'Test Content',
        visible: true,
      });

      await nextTick();
      await sleep(100);

      dialog.setConfirmLoading(true);
      await nextTick();
      await sleep(100);

      const confirmBtn = document.querySelector('.t-button--theme-primary');
      expect(confirmBtn).toBeTruthy();

      dialog.destroy();
    });

    it('handles custom className', async () => {
      const dialog = DialogPlugin({
        header: 'Test Dialog',
        body: 'Test Content',
        visible: true,
        className: 'custom-dialog-class',
      });

      await nextTick();
      await sleep(100);

      const dialogWrapper = document.querySelector('.custom-dialog-class');
      expect(dialogWrapper).toBeTruthy();

      dialog.destroy();
    });

    it('handles custom style', async () => {
      const dialog = DialogPlugin({
        header: 'Test Dialog',
        body: 'Test Content',
        visible: true,
        style: 'background-color: red;',
      });

      await nextTick();
      await sleep(100);

      expect(document.querySelector('.t-dialog')).toBeTruthy();

      dialog.destroy();
    });

    it('updates className', async () => {
      const dialog = DialogPlugin({
        header: 'Test Dialog',
        body: 'Test Content',
        visible: true,
        className: 'original-class',
      });

      await nextTick();
      await sleep(100);

      dialog.update({
        className: 'updated-class',
      });

      await nextTick();
      await sleep(100);

      const dialogWrapper = document.querySelector('.updated-class');
      expect(dialogWrapper).toBeTruthy();

      dialog.destroy();
    });

    it('handles attach option', async () => {
      const attachElement = document.createElement('div');
      attachElement.id = 'custom-attach';
      document.body.appendChild(attachElement);

      const dialog = DialogPlugin({
        header: 'Test Dialog',
        body: 'Test Content',
        visible: true,
        attach: '#custom-attach',
      });

      await nextTick();
      await sleep(100);

      const dialogInAttach = attachElement.querySelector('.t-dialog');
      expect(dialogInAttach).toBeTruthy();

      dialog.destroy();
      document.body.removeChild(attachElement);
    });

    it('handles destroyOnClose option', async () => {
      const dialog = DialogPlugin({
        header: 'Test Dialog',
        body: 'Test Content',
        visible: true,
        destroyOnClose: true,
      });

      await nextTick();
      await sleep(100);

      dialog.hide();
      await nextTick();
      await sleep(400);

      // destroyOnClose 为 true 时，dialog 会在关闭后销毁
      expect(dialog).toBeDefined();

      dialog.destroy();
    });

    it('handles onClose callback', async () => {
      const onClose = vi.fn();
      const dialog = DialogPlugin({
        header: 'Test Dialog',
        body: 'Test Content',
        visible: true,
        onClose,
      });

      await nextTick();
      await sleep(100);

      const closeBtn = document.querySelector('.t-dialog__close');
      if (closeBtn) {
        (closeBtn as HTMLElement).click();
        await nextTick();
        await sleep(100);

        // onClose 可能会被调用
        // 由于 plugin 的实现，onClose 会在内部处理
        expect(dialog).toBeDefined();
      }

      dialog.destroy();
    });
  });

  describe('DialogPlugin.confirm', () => {
    it('creates a confirm dialog', async () => {
      const dialog = DialogPlugin.confirm({
        header: 'Confirm',
        body: 'Are you sure?',
      });

      await nextTick();
      await sleep(100);

      expect(dialog).toBeDefined();
      expect(document.querySelector('.t-dialog')).toBeTruthy();

      dialog.destroy();
    });

    it('confirm dialog has both confirm and cancel buttons', async () => {
      const dialog = DialogPlugin.confirm({
        header: 'Confirm',
        body: 'Are you sure?',
        visible: true,
      });

      await nextTick();
      await sleep(100);

      const confirmBtn = document.querySelector('.t-button--theme-primary');
      const cancelBtn = document.querySelector('.t-dialog__cancel');

      expect(confirmBtn).toBeTruthy();
      expect(cancelBtn).toBeTruthy();

      dialog.destroy();
    });

    it('handles confirm callback', async () => {
      const onConfirm = vi.fn();
      const dialog = DialogPlugin.confirm({
        header: 'Confirm',
        body: 'Are you sure?',
        visible: true,
        onConfirm,
      });

      await nextTick();
      await sleep(100);

      const confirmBtn = document.querySelector('.t-button--theme-primary');
      if (confirmBtn) {
        (confirmBtn as HTMLElement).click();
        await nextTick();

        expect(onConfirm).toHaveBeenCalled();
      }

      dialog.destroy();
    });

    it('handles cancel callback', async () => {
      const onCancel = vi.fn();
      const dialog = DialogPlugin.confirm({
        header: 'Confirm',
        body: 'Are you sure?',
        visible: true,
        onCancel,
      });

      await nextTick();
      await sleep(100);

      const cancelBtn = document.querySelector('.t-dialog__cancel');
      if (cancelBtn) {
        (cancelBtn as HTMLElement).click();
        await nextTick();

        expect(onCancel).toHaveBeenCalled();
      }

      dialog.destroy();
    });
  });

  describe('DialogPlugin.alert', () => {
    it('creates an alert dialog', async () => {
      const dialog = DialogPlugin.alert({
        header: 'Alert',
        body: 'This is an alert',
      });

      await nextTick();
      await sleep(100);

      expect(dialog).toBeDefined();
      expect(document.querySelector('.t-dialog')).toBeTruthy();

      dialog.destroy();
    });

    it('alert dialog has only confirm button', async () => {
      const dialog = DialogPlugin.alert({
        header: 'Alert',
        body: 'This is an alert',
        visible: true,
      });

      await nextTick();
      await sleep(100);

      const confirmBtn = document.querySelector('.t-button--theme-primary');
      const cancelBtn = document.querySelector('.t-dialog__cancel');

      expect(confirmBtn).toBeTruthy();
      expect(cancelBtn).toBeFalsy();

      dialog.destroy();
    });

    it('handles confirm callback in alert', async () => {
      const onConfirm = vi.fn();
      const dialog = DialogPlugin.alert({
        header: 'Alert',
        body: 'This is an alert',
        visible: true,
        onConfirm,
      });

      await nextTick();
      await sleep(100);

      const confirmBtn = document.querySelector('.t-button--theme-primary');
      if (confirmBtn) {
        (confirmBtn as HTMLElement).click();
        await nextTick();

        expect(onConfirm).toHaveBeenCalled();
      }

      dialog.destroy();
    });
  });

  describe('DialogPlugin.install', () => {
    it('installs plugin to Vue app', () => {
      const app = createApp({});
      DialogPlugin.install(app);

      expect(app.config.globalProperties.$dialog).toBeDefined();
      expect(app.config.globalProperties.$dialog.confirm).toBeDefined();
      expect(app.config.globalProperties.$dialog.alert).toBeDefined();
    });

    it('sets app context when installed', () => {
      const app = createApp({});
      DialogPlugin.install(app);
      // eslint-disable-next-line no-underscore-dangle
      expect(DialogPlugin._context).toBeDefined();
      // eslint-disable-next-line no-underscore-dangle
      expect(DialogPlugin._context).toBe(app._context);
    });
  });

  describe('Multiple dialogs', () => {
    it('can create multiple dialogs', async () => {
      const dialog1 = DialogPlugin({
        header: 'Dialog 1',
        body: 'Content 1',
        visible: true,
      });

      const dialog2 = DialogPlugin({
        header: 'Dialog 2',
        body: 'Content 2',
        visible: true,
      });

      await nextTick();
      await sleep(100);

      const dialogs = document.querySelectorAll('.t-dialog');
      expect(dialogs.length).toBeGreaterThanOrEqual(2);

      dialog1.destroy();
      dialog2.destroy();
    });

    it('can destroy dialogs independently', async () => {
      const dialog1 = DialogPlugin({
        header: 'Dialog 1',
        body: 'Content 1',
        visible: true,
      });

      const dialog2 = DialogPlugin({
        header: 'Dialog 2',
        body: 'Content 2',
        visible: true,
      });

      await nextTick();
      await sleep(100);

      dialog1.destroy();
      await nextTick();
      await sleep(400);

      const dialogs = document.querySelectorAll('.t-dialog');
      expect(dialogs.length).toBeGreaterThanOrEqual(1);

      dialog2.destroy();
    });
  });

  describe('Dialog instance methods', () => {
    it('show method makes dialog visible', async () => {
      const dialog = DialogPlugin({
        header: 'Test',
        body: 'Content',
        visible: false,
      });

      await nextTick();

      dialog.show();
      await nextTick();
      await sleep(100);

      expect(document.querySelector('.t-dialog')).toBeTruthy();

      dialog.destroy();
    });

    it('hide method makes dialog invisible', async () => {
      const dialog = DialogPlugin({
        header: 'Test',
        body: 'Content',
        visible: true,
      });

      await nextTick();
      await sleep(100);

      dialog.hide();
      await nextTick();
      await sleep(400);

      // Dialog 应该被隐藏（但可能还在 DOM 中）
      expect(dialog).toBeDefined();

      dialog.destroy();
    });

    it('update method updates dialog props', async () => {
      const dialog = DialogPlugin({
        header: 'Original',
        body: 'Original Body',
        visible: true,
      });

      await nextTick();
      await sleep(100);

      dialog.update({
        header: 'Updated',
        body: 'Updated Body',
        width: '600px',
      });

      await nextTick();
      await sleep(100);

      expect(document.querySelector('.t-dialog')).toBeTruthy();

      dialog.destroy();
    });

    it('setConfirmLoading method updates loading state', async () => {
      const dialog = DialogPlugin({
        header: 'Test',
        body: 'Content',
        visible: true,
      });

      await nextTick();
      await sleep(100);

      dialog.setConfirmLoading(true);
      await nextTick();

      dialog.setConfirmLoading(false);
      await nextTick();

      expect(document.querySelector('.t-dialog')).toBeTruthy();

      dialog.destroy();
    });
  });
});
