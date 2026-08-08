import { createApp, nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NotifyPlugin } from '@tdesign/components/notification';

const animationMocks = vi.hoisted(() => ({
  fadeIn: vi.fn(),
  fadeOut: vi.fn((_dom: HTMLElement, _placement: string, onFinish: () => void) => onFinish()),
}));

vi.mock('@tdesign/components/notification/utils', () => animationMocks);

const attachNodes: HTMLElement[] = [];
const EmptyApp = { render: (): null => null };
const attachTo = (element: HTMLElement) => () => element;

const createAttach = (id?: string) => {
  const element = document.createElement('div');
  if (id) element.id = id;
  document.body.appendChild(element);
  attachNodes.push(element);
  return element;
};

const flushPlugin = async () => {
  await Promise.resolve();
  await nextTick();
};

describe('NotifyPlugin', () => {
  afterEach(async () => {
    NotifyPlugin.closeAll();
    await nextTick();
    attachNodes.splice(0).forEach((element) => element.remove());
    // eslint-disable-next-line no-underscore-dangle
    NotifyPlugin._context = undefined;
    vi.clearAllMocks();
  });

  describe('methods', () => {
    it(':call[function]', async () => {
      const attach = createAttach();
      const instance = await NotifyPlugin('warning', {
        attach: attachTo(attach),
        title: '警告',
        content: '通知内容',
        duration: 0,
      });

      expect(instance.close).toEqual(expect.any(Function));
      expect(attach.querySelector('.t-notification')).not.toBeNull();
      expect(attach.querySelector('.t-is-warning')).not.toBeNull();
    });

    it.each(['info', 'success', 'warning', 'error'] as const)(':%s[function]', async (theme) => {
      const attach = createAttach();
      const instance = await NotifyPlugin[theme]({
        attach: attachTo(attach),
        content: `${theme} content`,
        duration: 0,
      });

      expect(instance.close).toEqual(expect.any(Function));
      expect(attach.querySelector(`.t-is-${theme}`)).not.toBeNull();
      expect(attach.textContent).toContain(`${theme} content`);
    });

    it(':close[function]', async () => {
      const attach = createAttach();
      const notification = NotifyPlugin.info({ attach: attachTo(attach), content: '待关闭', duration: 0 });
      await notification;

      NotifyPlugin.close(notification);
      await flushPlugin();
      expect(attach.querySelector('.t-notification')).toBeNull();
    });

    it(':closeAll[function]', async () => {
      const attach = createAttach();
      await NotifyPlugin.info({ attach: attachTo(attach), content: '第一条', duration: 0 });
      await NotifyPlugin.success({ attach: attachTo(attach), content: '第二条', duration: 0 });
      expect(attach.querySelectorAll('.t-notification')).toHaveLength(2);

      NotifyPlugin.closeAll();
      await nextTick();
      expect(attach.querySelectorAll('.t-notification')).toHaveLength(0);
    });

    it(':config[function] is not exposed by the current implementation', () => {
      // Current behavior: the generated API documents config(), but the plugin does not implement it.
      expect((NotifyPlugin as unknown as { config?: unknown }).config).toBeUndefined();
    });
  });

  describe('options', () => {
    it(':attach[string]', async () => {
      const attach = createAttach('notification-string-attach');
      await NotifyPlugin.info({ attach: '#notification-string-attach', content: '字符串挂载', duration: 0 });

      expect(attach.querySelector('.t-notification')?.textContent).toContain('字符串挂载');
    });

    it(':attach[function]', async () => {
      const attach = createAttach();
      await NotifyPlugin.info({ attach: () => attach, content: '函数挂载', duration: 0 });

      expect(attach.querySelector('.t-notification')?.textContent).toContain('函数挂载');
    });

    it(':attach[HTMLElement]', async () => {
      const attach = createAttach();
      await NotifyPlugin.info({
        // @ts-expect-error the runtime accepts HTMLElement although AttachNode omits it
        attach,
        content: '节点挂载',
        duration: 0,
      });

      expect(attach.querySelector('.t-notification')?.textContent).toContain('节点挂载');
    });

    it(':className[string]', async () => {
      const attach = createAttach();
      await NotifyPlugin.info({
        attach: attachTo(attach),
        className: 'custom-notification',
        content: '内容',
        duration: 0,
      });

      expect(attach.querySelector('.t-notification')?.classList).toContain('custom-notification');
    });

    it(':offset[array<string/number>]', async () => {
      const attach = createAttach();
      await NotifyPlugin.info({
        attach: attachTo(attach),
        placement: 'bottom-left',
        offset: ['2rem', 24],
        content: '内容',
        duration: 0,
      });
      const list = attach.querySelector('.t-notification-list__show') as HTMLElement;

      expect(list.style.left).toBe('2rem');
      expect(list.style.bottom).toBe('24px');
    });

    it(':placement[string] creates one list for each placement', async () => {
      const attach = createAttach();
      const placements = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;

      await Promise.all(
        placements.map((placement) =>
          NotifyPlugin.info({ attach: attachTo(attach), placement, content: placement, duration: 0 }),
        ),
      );

      expect(attach.querySelectorAll('.t-notification-list__show')).toHaveLength(4);
      placements.forEach((placement) => expect(attach.textContent).toContain(placement));
    });

    it(':style[string]', async () => {
      const attach = createAttach();
      await NotifyPlugin.info({
        attach: attachTo(attach),
        style: 'color: red; width: 320px;',
        content: '内容',
        duration: 0,
      });
      const notification = attach.querySelector('.t-notification') as HTMLElement;

      expect(notification.style.color).toBe('red');
      expect(notification.style.width).toBe('320px');
    });

    it(':style[object]', async () => {
      const attach = createAttach();
      await NotifyPlugin.info({
        attach: attachTo(attach),
        style: { color: 'blue', width: '280px' },
        content: '内容',
        duration: 0,
      });
      const notification = attach.querySelector('.t-notification') as HTMLElement;

      expect(notification.style.color).toBe('blue');
      expect(notification.style.width).toBe('280px');
    });

    it(':zIndex[number]', async () => {
      const attach = createAttach();
      await NotifyPlugin.info({ attach: attachTo(attach), zIndex: 7002, content: '内容', duration: 0 });
      const notification = attach.querySelector('.t-notification') as HTMLElement;

      expect(notification.style.zIndex).toBe('7002');
    });

    it('uses default options and an empty content fallback', async () => {
      const instance = await NotifyPlugin.info({ duration: 0 });
      const notification = document.body.querySelector('.t-notification') as HTMLElement;

      expect(instance.close).toEqual(expect.any(Function));
      expect(notification).not.toBeNull();
      expect(notification.textContent).toBe('');
      expect(notification.style.zIndex).toBe('6000');
    });
  });

  describe('behavior', () => {
    it('reuses one list for notifications with the same attach and placement', async () => {
      const attach = createAttach();
      await NotifyPlugin.info({
        attach: attachTo(attach),
        placement: 'top-right',
        content: '第一条',
        duration: 0,
      });
      await NotifyPlugin.success({
        attach: attachTo(attach),
        placement: 'top-right',
        content: '第二条',
        duration: 0,
      });

      expect(attach.querySelectorAll('.t-notification-list__show')).toHaveLength(1);
      expect(attach.querySelectorAll('.t-notification')).toHaveLength(2);
    });

    it('keeps separate lists for different attach nodes', async () => {
      const firstAttach = createAttach();
      const secondAttach = createAttach();
      await NotifyPlugin.info({ attach: attachTo(firstAttach), content: '第一处', duration: 0 });
      await NotifyPlugin.info({ attach: attachTo(secondAttach), content: '第二处', duration: 0 });

      expect(firstAttach.querySelectorAll('.t-notification')).toHaveLength(1);
      expect(secondAttach.querySelectorAll('.t-notification')).toHaveLength(1);
    });

    it('returns an instance that closes one notification and calls onClose', async () => {
      const attach = createAttach();
      const onClose = vi.fn();
      const instance = await NotifyPlugin.info({
        attach: attachTo(attach),
        content: '关闭单条',
        duration: 0,
        onClose,
      });

      instance.close();
      await nextTick();
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(attach.querySelector('.t-notification')).toBeNull();
    });
  });

  describe('install', () => {
    it('registers $notify and all implemented methods', () => {
      const app = createApp(EmptyApp);
      app.use(NotifyPlugin);
      const globalProperties = app.config.globalProperties as Record<string, any>;

      expect(globalProperties.$notify).toEqual(expect.any(Function));
      ['info', 'success', 'warning', 'error', 'close', 'closeAll'].forEach((method) => {
        expect(globalProperties.$notify[method]).toEqual(expect.any(Function));
      });
      // Current behavior: docs/examples mention this alias, but install() only registers $notify.
      expect(globalProperties.$notification).toBeUndefined();
    });

    it('accepts an explicit app context', async () => {
      const app = createApp(EmptyApp);
      const attach = createAttach();
      // eslint-disable-next-line no-underscore-dangle
      const appContext = app._context;
      const instance = await NotifyPlugin.info(
        { attach: attachTo(attach), content: '显式上下文', duration: 0 },
        appContext,
      );

      expect(instance).toBeDefined();
      expect(attach.textContent).toContain('显式上下文');
    });

    it('uses the context saved by install()', async () => {
      const app = createApp(EmptyApp);
      app.use(NotifyPlugin);
      const attach = createAttach();
      const instance = await NotifyPlugin.info({
        attach: attachTo(attach),
        content: '安装上下文',
        duration: 0,
      });

      expect(instance).toBeDefined();
      expect(attach.textContent).toContain('安装上下文');
    });
  });
});
