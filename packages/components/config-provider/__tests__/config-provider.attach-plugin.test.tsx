import { createApp, h, nextTick, shallowRef } from 'vue';
import { describe, expect, it } from 'vitest';
import ConfigProvider from '@tdesign/components/config-provider';
import { DialogPlugin } from '@tdesign/components/dialog/plugin';
import { DrawerPlugin } from '@tdesign/components/drawer/plugin';
import type { GlobalConfigProvider } from '@tdesign/components/config-provider/type';

describe('ConfigProvider', () => {
  describe('scenarios', () => {
    it('updates plugin attachment when the provider changes or removes its global configuration', async () => {
      const owner = document.createElement('div');
      const target = document.createElement('div');
      target.id = 'plugin-global-attach';
      document.body.append(owner, target);
      const globalConfig = shallowRef<GlobalConfigProvider>({ attach: '#plugin-global-attach' });
      const app = createApp(() => h(ConfigProvider, { globalConfig: globalConfig.value }));
      app.mount(owner);
      const dialog = DialogPlugin({ body: 'dialog content' });
      const drawer = DrawerPlugin({ body: 'drawer content' });
      try {
        await nextTick();
        await nextTick();
        expect(target.querySelector('.t-dialog__ctx')).not.toBeNull();
        expect(target.querySelector('.t-drawer')).not.toBeNull();
        globalConfig.value = {};
        await nextTick();
        expect(target.querySelector('.t-dialog__ctx')).toBeNull();
        expect(target.querySelector('.t-drawer')).toBeNull();
        expect(document.querySelector('.t-dialog__ctx')?.parentElement?.parentElement).toBe(document.body);
        expect(document.querySelector('.t-drawer')?.parentElement?.parentElement).toBe(document.body);
      } finally {
        dialog.destroy();
        drawer.destroy();
        await new Promise((resolve) => setTimeout(resolve, 450));
        app.unmount();
        owner.remove();
        target.remove();
      }
      expect(document.querySelector('.t-dialog__ctx')).toBeNull();
      expect(document.querySelector('.t-drawer')).toBeNull();
    });
  });
});
