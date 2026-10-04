/**
 * L2 - ChatSender 基础 API / 事件 / 插槽
 *
 * Sender 是纯 Vue 实现，DOM 稳定，是「基础 API 不 breaking」的关键回归点：
 * 输入值、发送/停止、禁用态、上传入口、以及全部扩展插槽。
 */
import { describe, expect, it, vi } from 'vitest';
import ChatSender from '../chat-sender';
import { flush, mountChat } from '../test/helpers';

const SEND_BTN = '.t-chat-sender__button__sendbtn button';

describe('ChatSender', () => {
  describe(':props', () => {
    it('渲染完整输入区结构', () => {
      const wrapper = mountChat(ChatSender);
      expect(wrapper.find('.t-chat-sender').exists()).toBe(true);
      expect(wrapper.find('.t-chat-sender__textarea').exists()).toBe(true);
      expect(wrapper.find('.t-chat-sender__footer').exists()).toBe(true);
      expect(wrapper.find('textarea').exists()).toBe(true);
    });

    it(':value 受控回显', () => {
      const wrapper = mountChat(ChatSender, { props: { value: '你好' } });
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('你好');
    });

    it(':modelValue 受控回显', () => {
      const wrapper = mountChat(ChatSender, { props: { modelValue: 'hello' } });
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('hello');
    });

    it(':defaultValue 非受控回显', () => {
      const wrapper = mountChat(ChatSender, { props: { defaultValue: '默认值' } });
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('默认值');
    });

    it(':disabled 禁用输入框', () => {
      const wrapper = mountChat(ChatSender, { props: { disabled: true, value: 'a' } });
      expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    });

    it('空值时发送按钮为禁用态', () => {
      const wrapper = mountChat(ChatSender);
      expect(wrapper.find(SEND_BTN).attributes('disabled')).toBeDefined();
    });

    it(':sendBtnDisabled 显式禁用发送', () => {
      const wrapper = mountChat(ChatSender, { props: { value: 'a', sendBtnDisabled: true } });
      expect(wrapper.find(SEND_BTN).attributes('disabled')).toBeDefined();
    });

    it(':loading 切换为停止按钮', () => {
      const wrapper = mountChat(ChatSender, { props: { loading: true } });
      expect(wrapper.find('.t-chat-sender__button__stopicon').exists()).toBe(true);
    });

    it(':stopDisabled 同样切换为停止按钮', () => {
      const wrapper = mountChat(ChatSender, { props: { stopDisabled: true } });
      expect(wrapper.find('.t-chat-sender__button__stopicon').exists()).toBe(true);
    });

    it(':attachmentsProps.items 渲染附件区', () => {
      const wrapper = mountChat(ChatSender, {
        props: { attachmentsProps: { items: [{ name: 'a.png', size: 1024 }], overflow: 'scrollX' } },
      });
      expect(wrapper.find('.t-chat-sender__attachment').exists()).toBe(true);
    });
  });

  describe('@event', () => {
    it('点击发送按钮触发 send，回传输入值', async () => {
      const onSend = vi.fn();
      const wrapper = mountChat(ChatSender, { props: { defaultValue: '你好', onSend } });
      await wrapper.find(SEND_BTN).trigger('click');
      expect(onSend).toHaveBeenCalled();
      expect(onSend.mock.calls[0][0]).toBe('你好');
      expect(onSend.mock.calls[0][1]).toHaveProperty('e');
    });

    it('输入后触发 update:modelValue', async () => {
      const wrapper = mountChat(ChatSender, { props: { modelValue: '' } });
      const textarea = wrapper.find('textarea');
      (textarea.element as HTMLTextAreaElement).value = 'abc';
      await textarea.trigger('input');
      await flush();
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect((wrapper.emitted('update:modelValue') as any[])[0][0]).toBe('abc');
    });

    it('loading 下点击触发 stop', async () => {
      const onStop = vi.fn();
      const wrapper = mountChat(ChatSender, { props: { loading: true, defaultValue: 'a', onStop } });
      await wrapper.find('.t-chat-sender__button__default').trigger('click');
      expect(onStop).toHaveBeenCalled();
    });

    it('聚焦/失焦触发 focus / blur', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const wrapper = mountChat(ChatSender, { props: { onFocus, onBlur } });
      await wrapper.find('textarea').trigger('focus');
      await wrapper.find('textarea').trigger('blur');
      expect(onFocus).toHaveBeenCalled();
      expect(onBlur).toHaveBeenCalled();
    });

    it('选择本地文件触发 fileSelect', async () => {
      const onFileSelect = vi.fn();
      const wrapper = mountChat(ChatSender, {
        props: { onFileSelect },
        // 通过 suffix 插槽的 renderPresets 开启内置上传入口（与官方示例一致）
        slots: {
          suffix: ({ renderPresets }: any) => renderPresets([{ name: 'uploadImage' }, { name: 'uploadAttachment' }]),
        },
      });
      const inputs = wrapper.findAll('input[type="file"]');
      expect(inputs.length).toBeGreaterThan(0);
      const file = new File(['x'], 'a.png', { type: 'image/png' });
      Object.defineProperty(inputs[0].element, 'files', { value: [file], configurable: true });
      await inputs[0].trigger('change');
      expect(onFileSelect).toHaveBeenCalled();
      expect(onFileSelect.mock.calls[0][0]).toHaveProperty('files');
    });

    it('回车（非组合输入）触发 send', async () => {
      const onSend = vi.fn();
      const wrapper = mountChat(ChatSender, { props: { defaultValue: '回车发送', onSend } });
      await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: false });
      expect(onSend).toHaveBeenCalled();
    });
  });

  describe('<slot>', () => {
    it('header / inner-header / footer-prefix / input-prefix 插槽均渲染', () => {
      const wrapper = mountChat(ChatSender, {
        slots: {
          header: '<div class="slot-header">header</div>',
          'inner-header': '<div class="slot-inner-header">inner</div>',
          'footer-prefix': '<div class="slot-footer-prefix">mode</div>',
          'input-prefix': '<div class="slot-input-prefix">prefix</div>',
        },
      });
      expect(wrapper.find('.t-chat-sender__header .slot-header').exists()).toBe(true);
      expect(wrapper.find('.t-chat-sender__inner-header .slot-inner-header').exists()).toBe(true);
      expect(wrapper.find('.t-chat-sender__mode .slot-footer-prefix').exists()).toBe(true);
      expect(wrapper.find('.slot-input-prefix').exists()).toBe(true);
    });

    it('suffix 插槽替换默认发送按钮', () => {
      const wrapper = mountChat(ChatSender, {
        slots: { suffix: '<div class="slot-suffix">自定义发送</div>' },
      });
      expect(wrapper.find('.slot-suffix').exists()).toBe(true);
    });
  });
});
