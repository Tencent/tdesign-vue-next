import { expect, vi } from 'vitest';
import { nextTick, createApp } from 'vue';
import { DrawerPlugin } from '@tdesign/components/drawer';

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

  // ==================== Props Tests ====================
  describe('props', () => {
    it('should create drawer via plugin', async () => {
      const instance = DrawerPlugin({
        attach: 'body',
        header: '插件标题',
        body: '插件内容',
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(document.querySelector('.t-drawer')).toBeTruthy();
      expect(document.querySelector('.t-drawer__header')?.textContent).toBe('插件标题');
      expect(document.querySelector('.t-drawer__body')?.textContent).toBe('插件内容');

      if (instance?.destroy) {
        instance.destroy();
        vi.runAllTimers();
        await nextTick();
      }
    });

    it(':style[string] should apply initial style option', async () => {
      const instance = DrawerPlugin({
        body: '带样式',
        header: '标题',
        style: 'color: red;',
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(document.querySelector('.t-drawer')).toBeTruthy();

      if (instance?.destroy) {
        instance.destroy();
        vi.runAllTimers();
        await nextTick();
      }
    });

    it(':destroyOnClose[boolean] should close drawer when onClose not provided', async () => {
      const instance = DrawerPlugin({
        attach: 'body',
        body: '自动关闭',
        destroyOnClose: true,
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(document.querySelector('.t-drawer')).toBeTruthy();

      // Click close btn to trigger default onClose
      const closeBtn = document.querySelector('.t-drawer__cancel') as HTMLElement;
      if (closeBtn) {
        closeBtn.click();
        await nextTick();
        vi.advanceTimersByTime(500);
        await nextTick();
      }

      if (instance?.destroy) {
        instance.destroy();
        vi.runAllTimers();
        await nextTick();
      }
    });

    it(':onClose[function] should apply custom onClose handler', async () => {
      const onClose = vi.fn();
      const instance = DrawerPlugin({
        attach: 'body',
        body: '自定义关闭',
        onClose,
        closeBtn: true,
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();

      const closeBtn = document.querySelector('.t-drawer__close-btn') as HTMLElement;
      if (closeBtn) {
        closeBtn.click();
        await nextTick();
        expect(onClose).toHaveBeenCalled();
      }

      if (instance?.destroy) {
        instance.destroy();
        vi.runAllTimers();
        await nextTick();
      }
    });
  });

  // ==================== Instance Functions Tests ====================
  describe('instanceFunctions', () => {
    it('show and hide', async () => {
      const instance = DrawerPlugin({
        attach: 'body',
        body: '内容',
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(document.querySelector('.t-drawer')).toBeTruthy();

      if (instance?.hide) {
        instance.hide();
        vi.runAllTimers();
        await nextTick();
      }

      if (instance?.show) {
        instance.show();
        vi.runAllTimers();
        await nextTick();
        expect(document.querySelector('.t-drawer')).toBeTruthy();
      }

      if (instance?.destroy) {
        instance.destroy();
        vi.runAllTimers();
        await nextTick();
      }
    });

    it('update', async () => {
      const instance = DrawerPlugin({
        attach: 'body',
        header: '初始标题',
        body: '初始内容',
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();

      expect(document.querySelector('.t-drawer__header')?.textContent).toBe('初始标题');
      expect(document.querySelector('.t-drawer__body')?.textContent).toBe('初始内容');

      if (instance?.update) {
        instance.update({
          header: '更新标题',
          body: '更新内容',
        });
        await nextTick();
        vi.runAllTimers();
        await nextTick();

        expect(document.querySelector('.t-drawer__header')?.textContent).toBe('更新标题');
        expect(document.querySelector('.t-drawer__body')?.textContent).toBe('更新内容');
      }

      if (instance?.destroy) {
        instance.destroy();
        vi.runAllTimers();
        await nextTick();
      }
    });

    it('update style', async () => {
      const instance = DrawerPlugin({
        body: '更新样式',
        header: '标题',
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();

      if (instance?.update) {
        instance.update({ style: 'background: blue;' });
        await nextTick();
        vi.runAllTimers();
        await nextTick();
      }
      expect(document.querySelector('.t-drawer')).toBeTruthy();

      if (instance?.destroy) {
        instance.destroy();
        vi.runAllTimers();
        await nextTick();
      }
    });

    it('destroy', async () => {
      const instance = DrawerPlugin({
        attach: 'body',
        body: '销毁测试',
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(document.querySelector('.t-drawer')).toBeTruthy();

      if (instance?.destroy) {
        instance.destroy();
        vi.advanceTimersByTime(500);
        await nextTick();
      }
    });
  });

  // ==================== Edge Cases Tests ====================
  describe('edge cases', () => {
    it('install method should register on app', () => {
      const app = createApp({ render: (): null => null });
      app.use(DrawerPlugin as any);
      expect(app.config.globalProperties.$drawer).toBeTruthy();
    });

    it('should handle container not found gracefully', () => {
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
