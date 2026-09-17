/* eslint-disable vue/one-component-per-file */
import { createApp, defineComponent, h, inject, nextTick } from 'vue';
import type { AppContext } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MessagePlugin } from '@tdesign/components/message';
import type { MessageInstance, MessageOptions } from '@tdesign/components/message';

const EmptyApp = defineComponent({
  render() {
    return h('div');
  },
});

describe('MessagePlugin', () => {
  let initialBodyChildren: Set<Element>;
  let attachId = 0;

  const createAttach = () => {
    attachId += 1;
    const element = document.createElement('div');
    element.id = `message-test-attach-${attachId}`;
    document.body.appendChild(element);
    return element;
  };

  const permanentOptions = (attach: HTMLElement, options: MessageOptions = {}): MessageOptions => ({
    attach: () => attach,
    duration: 0,
    ...options,
  });

  beforeEach(() => {
    initialBodyChildren = new Set(document.body.children);
    Reflect.deleteProperty(MessagePlugin, '_context');
  });

  afterEach(async () => {
    MessagePlugin.closeAll();
    await nextTick();
    Array.from(document.body.children).forEach((element) => {
      if (!initialBodyChildren.has(element)) element.remove();
    });
    Reflect.deleteProperty(MessagePlugin, '_context');
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('props', () => {
    it(':message[string]', async () => {
      const instance = await MessagePlugin('warning', 'String message', 0);
      const message = document.querySelector('.t-message');

      expect(instance).toBeDefined();
      expect(message?.textContent).toContain('String message');
      expect(message?.classList).toContain('t-is-warning');
    });

    it(':message[VNode]', async () => {
      await MessagePlugin('info', h('span', { class: 'vnode-message' }, 'VNode message') as unknown as string, 0);

      expect(document.querySelector('.vnode-message')?.textContent).toBe('VNode message');
    });

    it(':message[object]', async () => {
      const attach = createAttach();
      await MessagePlugin(
        'success',
        permanentOptions(attach, {
          content: () => <strong class="object-message">Object message</strong>,
        }),
      );

      expect(attach.querySelector('.object-message')?.textContent).toBe('Object message');
      expect(attach.querySelector('.t-message')?.classList).toContain('t-is-success');
    });

    it(':message[array] currently ignores unsupported array input', async () => {
      // Arrays are not part of the public type; this verifies the runtime guard around object options.
      await MessagePlugin('info', [] as unknown as string, 0);

      expect(document.querySelector('.t-message')).not.toBeNull();
      expect(document.querySelector('.t-message')?.textContent).toBe('');
    });

    it.each([
      ['info', MessagePlugin.info],
      ['success', MessagePlugin.success],
      ['warning', MessagePlugin.warning],
      ['error', MessagePlugin.error],
      ['question', MessagePlugin.question],
      ['loading', MessagePlugin.loading],
    ] as const)('%s(message) creates the corresponding theme', async (theme, showMessage) => {
      const attach = createAttach();
      await showMessage(permanentOptions(attach, { content: `${theme} message` }));

      const message = attach.querySelector('.t-message');
      expect(message?.textContent).toContain(`${theme} message`);
      expect(message?.classList).toContain(`t-is-${theme}`);
    });

    it(':duration[number] accepts zero as the second argument', async () => {
      vi.useFakeTimers();
      const attach = createAttach();
      await MessagePlugin.info(permanentOptions(attach, { content: 'Persistent', duration: 20 }), 0);

      vi.runAllTimers();
      await nextTick();
      expect(attach.querySelector('.t-message')).not.toBeNull();
    });

    it(':attach[string]', async () => {
      const attach = createAttach();
      await MessagePlugin.info({ content: 'Selector attach', attach: `#${attach.id}`, duration: 0 });

      expect(attach.querySelector('.t-message')?.textContent).toContain('Selector attach');
    });

    it(':attach[function]', async () => {
      const attach = createAttach();
      await MessagePlugin.info(permanentOptions(attach, { content: 'Function attach' }));

      expect(attach.querySelector('.t-message')?.textContent).toContain('Function attach');
    });

    it(':className[string]', async () => {
      const attach = createAttach();
      await MessagePlugin.info(permanentOptions(attach, { className: 'plugin-message' }));

      expect(attach.querySelector('.t-message')?.classList).toContain('plugin-message');
    });

    it(':offset[array]', async () => {
      const attach = createAttach();
      await MessagePlugin.info(permanentOptions(attach, { offset: [14, '2rem'] }));
      const message = attach.querySelector('.t-message') as HTMLElement;

      expect(message.style.left).toBe('14px');
      expect(message.style.top).toBe('2rem');
    });

    it.each([
      'center',
      'top',
      'left',
      'right',
      'bottom',
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ] as const)(':placement[string] creates the %s list', async (placement) => {
      const attach = createAttach();
      await MessagePlugin.info(permanentOptions(attach, { content: placement, placement }));

      expect(attach.querySelector('.t-message__list')).not.toBeNull();
      expect(attach.querySelector('.t-message')?.textContent).toContain(placement);
    });

    it(':style[object]', async () => {
      const attach = createAttach();
      await MessagePlugin.info(permanentOptions(attach, { style: { color: 'rgb(0, 0, 255)' } }));

      expect((attach.querySelector('.t-message') as HTMLElement).style.color).toBe('rgb(0, 0, 255)');
    });

    it(':zIndex[number]', async () => {
      const attach = createAttach();
      await MessagePlugin.info(permanentOptions(attach, { zIndex: 7002 }));

      expect((attach.querySelector('.t-message__list') as HTMLElement).style.zIndex).toBe('7002');
    });

    it(':context[AppContext]', async () => {
      const attach = createAttach();
      const app = createApp(EmptyApp);
      app.provide('message-context', 'direct context');
      const ContextConsumer = defineComponent({
        setup() {
          const value = inject('message-context');
          return () => <span class="context-value">{String(value)}</span>;
        },
      });
      const context = Reflect.get(app, '_context') as AppContext;

      await MessagePlugin.info(permanentOptions(attach, { content: () => <ContextConsumer /> }), 0, context);
      expect(attach.querySelector('.context-value')?.textContent).toBe('direct context');
    });
  });

  describe('instanceFunctions', () => {
    it('reuses one list for the same attach and placement', async () => {
      const attach = createAttach();
      await MessagePlugin.info(permanentOptions(attach, { content: 'first' }));
      await MessagePlugin.info(permanentOptions(attach, { content: 'second' }));
      await MessagePlugin.info(permanentOptions(attach, { content: 'third' }));

      expect(attach.querySelectorAll('.t-message__list')).toHaveLength(1);
      expect(attach.querySelectorAll('.t-message')).toHaveLength(3);
    });

    it('creates separate lists for different placements', async () => {
      const attach = createAttach();
      await MessagePlugin.info(permanentOptions(attach, { placement: 'top' }));
      await MessagePlugin.info(permanentOptions(attach, { placement: 'bottom' }));

      expect(attach.querySelectorAll('.t-message__list')).toHaveLength(2);
    });

    it('creates separate lists for different attach nodes', async () => {
      const firstAttach = createAttach();
      const secondAttach = createAttach();
      await MessagePlugin.info(permanentOptions(firstAttach));
      await MessagePlugin.info(permanentOptions(secondAttach));

      expect(firstAttach.querySelectorAll('.t-message__list')).toHaveLength(1);
      expect(secondAttach.querySelectorAll('.t-message__list')).toHaveLength(1);
    });

    it('recreates a cached list after its wrapper is detached', async () => {
      const attach = createAttach();
      await MessagePlugin.info(permanentOptions(attach, { content: 'first' }));
      attach.firstElementChild?.remove();

      await MessagePlugin.info(permanentOptions(attach, { content: 'second' }));
      expect(attach.querySelectorAll('.t-message__list')).toHaveLength(1);
      expect(attach.querySelector('.t-message')?.textContent).toContain('second');
    });

    it('returned close() removes its message', async () => {
      const attach = createAttach();
      const instance = await MessagePlugin.info(permanentOptions(attach, { closeBtn: true }));

      instance.close();
      await nextTick();
      expect(attach.querySelector('.t-message')).toBeNull();
    });

    it('close() delegates to the resolved message instance', async () => {
      const attach = createAttach();
      const promise = MessagePlugin.info(permanentOptions(attach, { closeBtn: true }));
      const instance = await promise;
      const closeSpy = vi.spyOn(instance, 'close');

      MessagePlugin.close(promise);
      await Promise.resolve();
      expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('close() tolerates an unresolved message instance', async () => {
      const emptyPromise = Promise.resolve(undefined as unknown as MessageInstance);

      expect(() => MessagePlugin.close(emptyPromise)).not.toThrow();
      await emptyPromise;
    });

    it('closeAll() removes messages from every attach and placement', async () => {
      const firstAttach = createAttach();
      const secondAttach = createAttach();
      await MessagePlugin.info(permanentOptions(firstAttach, { placement: 'top' }));
      await MessagePlugin.error(permanentOptions(firstAttach, { placement: 'bottom' }));
      await MessagePlugin.success(permanentOptions(secondAttach, { placement: 'top' }));

      MessagePlugin.closeAll();
      await nextTick();
      expect(firstAttach.querySelector('.t-message')).toBeNull();
      expect(secondAttach.querySelector('.t-message')).toBeNull();
    });

    it('config() is currently missing although it is documented', () => {
      // Keep the current public surface visible until the documented API is implemented or removed.
      expect(Reflect.get(MessagePlugin, 'config')).toBeUndefined();
    });
  });

  describe('lifecycle', () => {
    it('install() exposes the callable plugin and all implemented methods', () => {
      const app = createApp(EmptyApp);

      MessagePlugin.install(app);
      const installed = app.config.globalProperties.$message;
      expect(installed).toBe(MessagePlugin);
      ['info', 'success', 'warning', 'error', 'question', 'loading', 'close', 'closeAll'].forEach((method) => {
        expect(typeof installed[method]).toBe('function');
      });
    });

    it('uses the application context captured by install()', async () => {
      const attach = createAttach();
      const app = createApp(EmptyApp);
      app.provide('installed-message-context', 'installed context');
      MessagePlugin.install(app);
      const ContextConsumer = defineComponent({
        setup() {
          const value = inject('installed-message-context');
          return () => <span class="installed-context-value">{String(value)}</span>;
        },
      });

      await MessagePlugin.info(permanentOptions(attach, { content: () => <ContextConsumer /> }));
      expect(attach.querySelector('.installed-context-value')?.textContent).toBe('installed context');
    });
  });
});
