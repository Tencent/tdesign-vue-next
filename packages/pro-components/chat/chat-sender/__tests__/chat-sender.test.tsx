/* eslint-disable vue/one-component-per-file */
import { chatText, flush, mountChat } from '../../test/helpers';

import { describe, expect, it, vi } from 'vitest';
import ChatSender from '..';
import { defineComponent, ref } from 'vue';

const SEND_BTN = '.t-chat-sender__button__sendbtn button';

describe('ChatSender', () => {
  describe('props', () => {
    it.each(['suffix', 'footerPrefix'] as const)('%s 支持文本和渲染函数', async (prop) => {
      const wrapper = mountChat(ChatSender, { props: { [prop]: 'prop text' } });
      expect(wrapper.text()).toContain('prop text');
      await wrapper.setProps({ [prop]: () => <span>rendered prop</span> });
      expect(wrapper.text()).toContain('rendered prop');
      expect(wrapper.text()).not.toContain('prop text');
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

    it(':attachmentsProps.items 渲染附件区', async () => {
      const wrapper = mountChat(ChatSender, {
        props: {
          attachmentsProps: { items: [{ key: 'report', name: 'report.pdf', size: 1024 }], overflow: 'scrollX' },
        },
      });
      await flush();
      expect(chatText(wrapper.element)).toContain('report.pdf');
    });
  });

  describe('events', () => {
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
          suffix: ({ renderPresets }: any) => renderPresets([{ name: 'uploadImage' }]),
        },
      });
      const input = wrapper.find('input[type="file"]');
      const file = new File(['x'], 'a.png', { type: 'image/png' });
      Object.defineProperty(input.element, 'files', { value: [file], configurable: true });
      await input.trigger('change');
      expect(onFileSelect).toHaveBeenCalledTimes(1);
      expect(onFileSelect).toHaveBeenCalledWith({ files: [file], name: 'uploadImage', e: expect.any(Event) });
      expect(onFileSelect.mock.calls[0][0].files[0]).toBe(file);
    });

    it('回车（非组合输入）触发 send', async () => {
      const onSend = vi.fn();
      const wrapper = mountChat(ChatSender, { props: { defaultValue: '回车发送', onSend } });
      await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: false });
      expect(onSend).toHaveBeenCalled();
    });
  });

  describe('slots', () => {
    it('header / inner-header / footer-prefix / input-prefix 插槽均渲染', () => {
      const wrapper = mountChat(ChatSender, {
        slots: {
          header: '<div class="slot-header">header</div>',
          'inner-header': '<div class="slot-inner-header">inner</div>',
          'footer-prefix': '<div class="slot-footer-prefix">mode</div>',
          'input-prefix': '<div class="slot-input-prefix">prefix</div>',
        },
      });
      expect(wrapper.find('.slot-header').exists()).toBe(true);
      expect(wrapper.find('.slot-inner-header').exists()).toBe(true);
      expect(wrapper.find('.slot-footer-prefix').exists()).toBe(true);
      expect(wrapper.find('.slot-input-prefix').exists()).toBe(true);
    });

    it('suffix 插槽替换默认发送按钮', () => {
      const wrapper = mountChat(ChatSender, {
        slots: { suffix: '<div class="slot-suffix">自定义发送</div>' },
      });
      expect(wrapper.find('.slot-suffix').exists()).toBe(true);
      expect(wrapper.find(SEND_BTN).exists()).toBe(false);
    });
  });
  describe('scenarios', () => {
    describe('controlled input and send', () => {
      it('updates the parent value before sending the current text', async () => {
        const value = ref('initial');
        const onChange = vi.fn();
        const onSend = vi.fn();
        const Host = defineComponent({
          setup: () => () =>
            (
              <ChatSender
                modelValue={value.value}
                onChange={onChange}
                onSend={onSend}
                {...{
                  'onUpdate:modelValue': (next: string) => {
                    value.value = next;
                  },
                }}
              />
            ),
        });
        const wrapper = mountChat(Host);
        await wrapper.find('textarea').setValue('current question');
        await flush();
        expect(value.value).toBe('current question');
        expect(onChange).toHaveBeenCalledWith('current question', expect.objectContaining({ e: expect.anything() }));
        expect(onSend).not.toHaveBeenCalled();
        await wrapper.find(SEND_BTN).trigger('click');
        expect(onSend).toHaveBeenCalledTimes(1);
        expect(onSend).toHaveBeenCalledWith('current question', expect.objectContaining({ e: expect.anything() }));
      });
    });

    describe('send and stop controls', () => {
      it('switches from send to stop while loading, then allows sending again', async () => {
        const onSend = vi.fn();
        const onStop = vi.fn();
        const wrapper = mountChat(ChatSender, { props: { defaultValue: 'question', onSend, onStop } });
        await wrapper.find(SEND_BTN).trigger('click');
        expect(onSend).toHaveBeenCalledTimes(1);
        await wrapper.setProps({ loading: true });
        await wrapper.find(SEND_BTN).trigger('click');
        expect(onStop).toHaveBeenCalledTimes(1);
        expect(onStop).toHaveBeenCalledWith('question', expect.objectContaining({ e: expect.anything() }));
        expect(onSend).toHaveBeenCalledTimes(1);
        await wrapper.setProps({ loading: false });
        await wrapper.find(SEND_BTN).trigger('click');
        expect(onSend).toHaveBeenCalledTimes(2);
      });

      it('does not send while disabled or sendBtnDisabled', async () => {
        const onSend = vi.fn();
        const wrapper = mountChat(ChatSender, { props: { defaultValue: 'question', disabled: true, onSend } });
        await wrapper.find(SEND_BTN).trigger('click');
        expect(onSend).not.toHaveBeenCalled();
        await wrapper.setProps({ disabled: false, sendBtnDisabled: true });
        await wrapper.find(SEND_BTN).trigger('click');
        expect(onSend).not.toHaveBeenCalled();
        await wrapper.setProps({ sendBtnDisabled: false });
        await wrapper.find(SEND_BTN).trigger('click');
        expect(onSend).toHaveBeenCalledTimes(1);
      });
    });
  });
});
