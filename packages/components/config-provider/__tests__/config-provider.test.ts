import { nextTick } from 'vue';
import { expect } from 'vitest';
import { createApp } from 'vue';
import { LoadingPlugin } from '@tdesign/components/loading/plugin';
import { DrawerPlugin } from '@tdesign/components/drawer/plugin';
import { DialogPlugin } from '@tdesign/components/dialog/plugin';
import { NotifyPlugin } from '@tdesign/components/notification/plugin';
import { MessagePlugin } from '@tdesign/components/message/plugin';

import { ConfigProvider } from '@tdesign/components/config-provider/index';

describe('ConfigProvider Works with Plugins', () => {
  it('should use custom classPrefix from ConfigProvider', async () => {
    const customPrefix = 'custom';

    // Create container for attach
    const container = document.createElement('div');
    container.id = 'custom-prefix-test-container';
    document.body.appendChild(container);

    // Create app with ConfigProvider and custom classPrefix
    const testApp = createApp({
      components: { ConfigProvider },
      template: `<ConfigProvider :globalConfig="{ classPrefix: '${customPrefix}' }"><div></div></ConfigProvider>`,
    });

    // Mount the app to trigger ConfigProvider setup
    const wrapper = document.createElement('div');
    document.body.appendChild(wrapper);
    testApp.mount(wrapper);

    await nextTick();

    const loadingPluginInstance = LoadingPlugin({ loading: true, attach: `#${container.id}` });

    DialogPlugin({
      attach: `#${container.id}`,
      header: 'Dialog-Plugin',
      destroyOnClose: true,
    });

    DrawerPlugin({
      attach: `#${container.id}`,
      header: 'Drawer-Plugin',
      destroyOnClose: true,
    });

    NotifyPlugin.info({ attach: `#${container.id}`, title: 'Notification Title' });

    MessagePlugin.success({ content: 'Message Content', duration: 10 });

    await nextTick();

    // Check that the attach element has the custom prefix class
    expect(document.getElementsByClassName(`${customPrefix}-loading`).length).toBe(1);
    expect(document.getElementsByClassName(`${customPrefix}-dialog__ctx`).length).toBe(1);
    expect(document.getElementsByClassName(`${customPrefix}-drawer`).length).toBe(1);
    expect(document.getElementsByClassName(`${customPrefix}-notification`).length).toBe(1);
    expect(document.getElementsByClassName(`${customPrefix}-message`).length).toBe(1);

    loadingPluginInstance.hide();
    MessagePlugin.closeAll();
    NotifyPlugin.closeAll();

    await nextTick();

    // Check that the class is removed after closing
    expect(document.getElementsByClassName(`${customPrefix}-loading`).length).toBe(0);
    expect(document.getElementsByClassName(`${customPrefix}-notification`).length).toBe(0);
    expect(document.getElementsByClassName(`${customPrefix}-message`).length).toBe(0);

    // Cleanup
    testApp.unmount();
    wrapper.remove();
    container.remove();
  });
});
