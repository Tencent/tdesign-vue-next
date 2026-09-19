import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { Component, computed, createApp, h, nextTick, ref, shallowRef } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ConfigProvider from '@tdesign/components/config-provider';
import Dialog from '@tdesign/components/dialog';
import Drawer from '@tdesign/components/drawer';
import Popup from '@tdesign/components/popup';
import ImageViewer from '@tdesign/components/image-viewer';
import type { GlobalConfigProvider } from '@tdesign/components/config-provider/type';
import type { AttachNode } from '@tdesign/components/common';
import { DialogPlugin } from '@tdesign/components/dialog/plugin';
import { DrawerPlugin } from '@tdesign/components/drawer/plugin';
import { configProviderInjectKey } from '../utils/context';

const components = [
  { name: 'dialog', component: Dialog, selector: '.t-dialog__ctx', inline: true },
  { name: 'drawer', component: Drawer, selector: '.t-drawer', inline: true },
  { name: 'popup', component: Popup, selector: '.t-popup', inline: false },
  { name: 'imageViewer', component: ImageViewer, selector: '.t-image-viewer-preview-image', inline: false },
] as const;

type ComponentCase = typeof components[number];
const wrappers: VueWrapper[] = [];
let targets: HTMLElement[];

function renderOverlay(testCase: ComponentCase, attach?: AttachNode, visible = true) {
  const contentProps =
    testCase.name === 'imageViewer'
      ? { images: ['image.png'] }
      : testCase.name === 'popup'
      ? { content: 'overlay content' }
      : { body: 'overlay content' };
  return h(
    testCase.component as Component,
    { attach, visible, ...contentProps },
    { default: () => <button>trigger</button> },
  );
}

async function settle() {
  await flushPromises();
  await nextTick();
}

function mountOverlay(testCase: ComponentCase, config: GlobalConfigProvider = {}, attach?: AttachNode) {
  const globalConfig = shallowRef(config);
  const localAttach = ref(attach);
  const visible = ref(true);
  const wrapper = mount(
    () => (
      <ConfigProvider globalConfig={globalConfig.value}>
        <div class="overlay-owner">{renderOverlay(testCase, localAttach.value, visible.value)}</div>
      </ConfigProvider>
    ),
    { attachTo: targets[0], global: { stubs: { transition: false } } },
  );
  wrappers.push(wrapper);
  return { wrapper, globalConfig, localAttach, visible };
}

describe('ConfigProvider', () => {
  beforeEach(() => {
    targets = ['owner', 'global', 'component', 'local'].map((name) => {
      const element = document.createElement('div');
      element.id = `attach-${name}`;
      document.body.appendChild(element);
      return element;
    });
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0);
      return 1;
    });
  });

  afterEach(async () => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    await settle();
    targets.forEach((target) => target.remove());
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it.each(components)('globalConfig.attach[string] mounts $name in the configured container', async (testCase) => {
      mountOverlay(testCase, { attach: '#attach-global' });
      await settle();
      expect(targets[1].querySelector(testCase.selector)).not.toBeNull();
      expect(targets[0].querySelector(testCase.selector)).toBeNull();
    });

    it.each(components)('globalConfig.attach[function] mounts $name in the returned container', async (testCase) => {
      const attach = vi.fn(() => targets[1]);
      mountOverlay(testCase, { attach });
      await settle();
      expect(attach).toHaveBeenCalled();
      expect(targets[1].querySelector(testCase.selector)).not.toBeNull();
      if (testCase.name === 'popup') {
        expect(attach).toHaveBeenCalledWith(targets[0].querySelector('button'));
      }
    });

    it.each(components)('globalConfig.attach[object] uses the $name key', async (testCase) => {
      mountOverlay(testCase, { attach: { [testCase.name]: '#attach-component' } });
      await settle();
      expect(targets[2].querySelector(testCase.selector)).not.toBeNull();
    });
  });

  describe('scenarios', () => {
    it.each([
      { name: 'dialog', selector: '.t-dialog__ctx' },
      { name: 'drawer', selector: '.t-drawer' },
    ])('keeps $name plugin styles and cleanup when the global target changes', async ({ name, selector }) => {
      const globalConfig = shallowRef<GlobalConfigProvider>({ attach: { [name]: '#attach-global' } });
      const app = createApp({});
      app.provide(
        configProviderInjectKey,
        computed(() => ({ classPrefix: 't', ...globalConfig.value })),
      );
      // eslint-disable-next-line no-underscore-dangle
      const context = app._context;
      const options = { body: 'plugin content', style: 'color: red;' };
      const instance = name === 'dialog' ? DialogPlugin(options, context) : DrawerPlugin(options, context);
      try {
        await settle();
        expect(targets[1].querySelector<HTMLElement>(selector)?.style.color).toBe('red');
        globalConfig.value = { attach: '#attach-component' };
        await settle();
        expect(targets[2].querySelector<HTMLElement>(selector)?.style.color).toBe('red');
        expect(targets[1].querySelector(selector)).toBeNull();
        instance.update({ attach: '#attach-local', style: 'color: blue;' });
        await settle();
        expect(targets[3].querySelector<HTMLElement>(selector)?.style.color).toBe('blue');
        expect(targets[2].querySelector(selector)).toBeNull();
      } finally {
        instance.destroy();
        await new Promise((resolve) => setTimeout(resolve, 450));
      }
      expect(document.querySelector(selector)).toBeNull();
    });

    it.each(components)('preserves the default mount location of $name without global attach', async (testCase) => {
      const { wrapper } = mountOverlay(testCase);
      await settle();
      expect(document.querySelector(testCase.selector)).not.toBeNull();
      expect(wrapper.find(testCase.selector).exists()).toBe(testCase.inline);
    });

    it.each(components)('preserves the default when global attach has no $name entry', async (testCase) => {
      const otherName = testCase.name === 'dialog' ? 'popup' : 'dialog';
      const { wrapper } = mountOverlay(testCase, { attach: { [otherName]: '#attach-component' } });
      await settle();
      expect(document.querySelector(testCase.selector)).not.toBeNull();
      expect(wrapper.find(testCase.selector).exists()).toBe(testCase.inline);
      expect(targets[2].querySelector(testCase.selector)).toBeNull();
    });

    it.each(components)('reactively applies local overrides and global fallback for $name', async (testCase) => {
      const { globalConfig, localAttach } = mountOverlay(testCase, { attach: '#attach-global' }, '#attach-local');
      await settle();
      expect(targets[3].querySelector(testCase.selector)).not.toBeNull();
      globalConfig.value = { attach: { [testCase.name]: () => targets[2] } };
      await settle();
      expect(targets[3].querySelector(testCase.selector)).not.toBeNull();
      expect(targets[2].querySelector(testCase.selector)).toBeNull();
      localAttach.value = undefined;
      await settle();
      expect(targets[2].querySelector(testCase.selector)).not.toBeNull();
      expect(targets[3].querySelector(testCase.selector)).toBeNull();
      globalConfig.value = { attach: '#attach-global' };
      await settle();
      expect(targets[1].querySelector(testCase.selector)).not.toBeNull();
      expect(targets[2].querySelector(testCase.selector)).toBeNull();
      localAttach.value = () => targets[3];
      await settle();
      expect(targets[3].querySelector(testCase.selector)).not.toBeNull();
      expect(targets[1].querySelector(testCase.selector)).toBeNull();
      localAttach.value = undefined;
      globalConfig.value = {};
      await settle();
      expect(targets[3].querySelector(testCase.selector)).toBeNull();
      expect(targets[1].querySelector(testCase.selector)).toBeNull();
      expect(targets[0].querySelector(testCase.selector) !== null).toBe(testCase.inline);
    });

    it.each(components)('preserves explicit empty attach for $name', async (testCase) => {
      const { wrapper } = mountOverlay(testCase, { attach: '#attach-global' }, '');
      await settle();
      expect(targets[1].querySelector(testCase.selector)).toBeNull();
      expect(wrapper.find(testCase.selector).exists()).toBe(testCase.name !== 'popup');
    });

    it.each(components)('restores defaults when the $name entry is removed', async (testCase) => {
      const { wrapper, globalConfig } = mountOverlay(testCase, { attach: { [testCase.name]: '#attach-component' } });
      await settle();
      expect(targets[2].querySelector(testCase.selector)).not.toBeNull();
      globalConfig.value = { attach: {} };
      await settle();
      expect(targets[2].querySelector(testCase.selector)).toBeNull();
      expect(document.querySelector(testCase.selector)).not.toBeNull();
      expect(wrapper.find(testCase.selector).exists()).toBe(testCase.inline);
    });

    it('mounts nested dialogs independently and removes the child when its parent is destroyed', async () => {
      const visible = ref(false);
      const childVisible = ref(false);
      const wrapper = mount(
        () => (
          <ConfigProvider globalConfig={{ attach: { dialog: '#attach-global' } }}>
            <Dialog visible={visible.value} destroyOnClose>
              <Dialog visible={childVisible.value} header="child" />
            </Dialog>
          </ConfigProvider>
        ),
        { attachTo: targets[0] },
      );
      wrappers.push(wrapper);
      visible.value = true;
      await settle();
      childVisible.value = true;
      await settle();
      expect(targets[1].querySelectorAll('.t-dialog__ctx')).toHaveLength(2);
      expect(targets[1].querySelector('.t-dialog__ctx .t-dialog__ctx')).toBeNull();
      wrapper.unmount();
      wrappers.splice(wrappers.indexOf(wrapper), 1);
      await settle();
      expect(targets[1].querySelector('.t-dialog__ctx')).toBeNull();
    });

    it.each(components)('cleans up $name and uses the current target when reopened', async (testCase) => {
      const { wrapper, globalConfig, visible } = mountOverlay(testCase, { attach: '#attach-global' });
      await settle();
      expect(targets[1].querySelector(testCase.selector)).not.toBeNull();
      visible.value = false;
      await settle();
      globalConfig.value = { attach: '#attach-component' };
      visible.value = true;
      await settle();
      expect(targets[2].querySelector(testCase.selector)).not.toBeNull();
      wrapper.unmount();
      wrappers.splice(wrappers.indexOf(wrapper), 1);
      await settle();
      expect(document.querySelector(testCase.selector)).toBeNull();
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6506
    it('moves a dialog out of its clipping ancestor with global attach', async () => {
      const wrapper = mount(
        () => (
          <ConfigProvider globalConfig={{ attach: { dialog: 'body' } }}>
            <div class="clipping-owner" style="overflow: hidden">
              <Dialog visible body="dialog content" />
            </div>
          </ConfigProvider>
        ),
        { attachTo: targets[0], global: { stubs: { transition: false } } },
      );
      wrappers.push(wrapper);
      await settle();
      expect(document.querySelector('.t-dialog__ctx')?.parentElement).toBe(document.body);
      expect(wrapper.find('.clipping-owner .t-dialog__ctx').exists()).toBe(false);
    });
  });
});
