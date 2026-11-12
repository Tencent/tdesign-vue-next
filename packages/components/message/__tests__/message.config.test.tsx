import { createApp, defineComponent, h } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MessagePlugin } from '@tdesign/components/message';

const EmptyApp = defineComponent({ render: () => h('div') });

const createAttach = () => {
  const el = document.createElement('div');
  document.body.appendChild(el);
  return el;
};

describe('MessagePlugin.config', () => {
  afterEach(() => {
    vi.useRealTimers();
    (MessagePlugin as any).config({});
  });

  it('exposes a config method on the installed plugin', () => {
    const app = createApp(EmptyApp);
    app.use(MessagePlugin);
    const $message = (app.config.globalProperties as any).$message;

    expect($message).toBeTypeOf('function');
    expect($message.config).toBeTypeOf('function');
  });

  it('exposes a config method on the plugin itself for direct import usage', () => {
    expect((MessagePlugin as any).config).toBeTypeOf('function');
  });

  it('applies the configured global duration to subsequent messages', async () => {
    vi.useFakeTimers();
    (MessagePlugin as any).config({ duration: 500 });

    const attach = createAttach();
    const onClose = vi.fn();
    await MessagePlugin.info({ content: 'hi', attach: () => attach, onClose });

    expect(attach.querySelector('.t-message')).not.toBeNull();

    vi.advanceTimersByTime(499);
    expect(onClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(2);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose.mock.calls[0][0]).toMatchObject({ trigger: 'duration-end' });

    attach.remove();
  });

  it('lets per-call options override the global defaults', async () => {
    vi.useFakeTimers();
    (MessagePlugin as any).config({ duration: 100 });

    const attach = createAttach();
    const onClose = vi.fn();
    await MessagePlugin.info({ content: 'hi', attach: () => attach, onClose, duration: 900 });

    vi.advanceTimersByTime(500);
    expect(onClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(401);
    expect(onClose).toHaveBeenCalledTimes(1);

    attach.remove();
  });

  it('ignores config changes for messages already created', async () => {
    vi.useFakeTimers();
    (MessagePlugin as any).config({ duration: 100 });

    const attach = createAttach();
    const onClose = vi.fn();
    await MessagePlugin.info({ content: 'hi', attach: () => attach, onClose });

    (MessagePlugin as any).config({ duration: 9000 });

    vi.advanceTimersByTime(102);
    expect(onClose).toHaveBeenCalledTimes(1);

    attach.remove();
  });
});
