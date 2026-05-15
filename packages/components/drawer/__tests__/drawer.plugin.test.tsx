import { expect, vi } from 'vitest';
import { nextTick, createApp } from 'vue';
import { DrawerPlugin } from '@tdesign/components/drawer';
import type { DrawerInstance } from '@tdesign/components/drawer/type';

async function openDrawer() {
  await nextTick();
  vi.runAllTimers();
  await nextTick();
}

async function destroyDrawer(instance: DrawerInstance) {
  instance.destroy();
  vi.advanceTimersByTime(500);
  await nextTick();
}

describe('DrawerPlugin', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  describe('props', () => {
    it(':header[string] + :body[string]', async () => {
      const instance = DrawerPlugin({
        attach: 'body',
        header: '插件标题',
        body: '插件内容',
      });
      await openDrawer();

      expect(document.querySelector('.t-drawer')).toBeTruthy();
      expect(document.querySelector('.t-drawer__header')?.textContent).toBe('插件标题');
      expect(document.querySelector('.t-drawer__body')?.textContent).toBe('插件内容');

      await destroyDrawer(instance);
    });

    it(':style[string]', async () => {
      const instance = DrawerPlugin({
        body: '带样式',
        header: '标题',
        style: 'color: red;',
      });
      await openDrawer();

      expect(document.querySelector('.t-drawer')).toBeTruthy();

      await destroyDrawer(instance);
    });

    it(':destroyOnClose[boolean]', async () => {
      const instance = DrawerPlugin({
        attach: 'body',
        body: '自动关闭',
        destroyOnClose: true,
      });
      await openDrawer();
      expect(document.querySelector('.t-drawer')).toBeTruthy();

      const cancelBtn = document.querySelector('.t-drawer__cancel') as HTMLElement;
      expect(cancelBtn).toBeTruthy();
      cancelBtn.click();
      await nextTick();
      vi.advanceTimersByTime(500);
      await nextTick();

      await destroyDrawer(instance);
    });

    it(':onClose[function]', async () => {
      const onClose = vi.fn();
      const instance = DrawerPlugin({
        attach: 'body',
        body: '自定义关闭',
        onClose,
        closeBtn: true,
      });
      await openDrawer();

      const closeBtn = document.querySelector('.t-drawer__close-btn') as HTMLElement;
      expect(closeBtn).toBeTruthy();
      closeBtn.click();
      await nextTick();

      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose.mock.calls[0][0].trigger).toBe('close-btn');
      expect(onClose.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);

      await destroyDrawer(instance);
    });
  });

  describe('instanceFunctions', () => {
    it('show', async () => {
      const instance = DrawerPlugin({
        attach: 'body',
        body: '内容',
      });
      await openDrawer();
      expect(document.querySelector('.t-drawer')).toBeTruthy();

      instance.hide();
      vi.runAllTimers();
      await nextTick();

      instance.show();
      vi.runAllTimers();
      await nextTick();
      expect(document.querySelector('.t-drawer')).toBeTruthy();

      await destroyDrawer(instance);
    });

    it('hide', async () => {
      const instance = DrawerPlugin({
        attach: 'body',
        body: '内容',
      });
      await openDrawer();

      instance.hide();
      vi.runAllTimers();
      await nextTick();

      await destroyDrawer(instance);
    });

    it('update', async () => {
      const instance = DrawerPlugin({
        attach: 'body',
        header: '初始标题',
        body: '初始内容',
      });
      await openDrawer();

      expect(document.querySelector('.t-drawer__header')?.textContent).toBe('初始标题');
      expect(document.querySelector('.t-drawer__body')?.textContent).toBe('初始内容');

      instance.update({
        header: '更新标题',
        body: '更新内容',
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();

      expect(document.querySelector('.t-drawer__header')?.textContent).toBe('更新标题');
      expect(document.querySelector('.t-drawer__body')?.textContent).toBe('更新内容');

      await destroyDrawer(instance);
    });

    it('update style', async () => {
      const instance = DrawerPlugin({
        body: '更新样式',
        header: '标题',
      });
      await openDrawer();

      instance.update({ style: 'background: blue;' });
      await nextTick();

      expect(document.querySelector('.t-drawer')).toBeTruthy();

      await destroyDrawer(instance);
    });

    it('destroy', async () => {
      const instance = DrawerPlugin({
        attach: 'body',
        body: '销毁测试',
      });
      await openDrawer();
      expect(document.querySelector('.t-drawer')).toBeTruthy();

      await destroyDrawer(instance);
      expect(document.querySelector('.t-drawer')).toBeFalsy();
    });
  });

  describe('edge cases', () => {
    it('install registers $drawer on app', () => {
      const app = createApp({ render: (): null => null });
      app.use(DrawerPlugin as any);
      expect(app.config.globalProperties.$drawer).toBeTruthy();
    });

    it('non-existent attach container logs error', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      DrawerPlugin({
        attach: '#non-existent-container',
        body: '容器不存在',
      });
      expect(consoleSpy).toHaveBeenCalledWith('attach is not exist');
      consoleSpy.mockRestore();
    });
  });
});
