import { nextTick, ref } from '@td/adapter-vue';
import { mount } from '@vue/test-utils';
import { expect, it, vi } from 'vitest';
import { Textarea } from 'tdesign-vue-next';

const statusList = ['success', 'warning', 'error'];

describe('textarea', () => {
  describe(':props', () => {
    it(':value', () => {
      const wrapper = mount({
        render() {
          return <Textarea value="text" />;
        },
      });
      const textareaElem = wrapper.find('textarea');
      expect(textareaElem.element.value).toEqual('text');
    });

    it(':value(controlled)', async () => {
      const wrapper = mount({
        render() {
          return <Textarea value="text" />;
        },
      });
      const textareaElem = wrapper.find('textarea');
      textareaElem.setValue('text1');
      await nextTick();
      expect(textareaElem.element.value).toEqual('text1');
    });

    it(':default-value', async () => {
      const wrapper = mount({
        render() {
          return <Textarea default-value="text" />;
        },
      });
      const textareaElem = wrapper.find('textarea');
      textareaElem.setValue('text1');
      await nextTick();
      expect(textareaElem.element.value).toEqual('text1');
    });

    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Textarea disabled={true} />;
        },
      });
      const textarea = wrapper.find('textarea');
      expect(textarea.classes()).toContain('t-is-disabled');
    });

    it(':readonly', () => {
      const value = ref('123');
      const wrapper = mount(() => <Textarea readonly v-model={value.value} />);
      const textarea = wrapper.find('textarea');
      value.value = '123123';
      expect(textarea.element.value).toBe('123');
    });

    it(':maxlength', () => {
      const wrapper = mount(() => <Textarea maxlength={5} />);
      const textarea = wrapper.find('textarea');
      expect(textarea.element.getAttribute('maxlength')).toBe('5');
    });

    it(':autofocus', async () => {
      const wrapper = mount(() => <Textarea autofocus />);
      const textarea = wrapper.find('textarea');
      await nextTick();
      expect(textarea.element.focus).toBeTruthy();
    });

    it(':placeholder', () => {
      const wrapper = mount(() => <Textarea placeholder="请输入" />);
      const textarea = wrapper.find('textarea');
      expect(textarea.element.getAttribute('placeholder')).toBe('请输入');
    });

    it(':name', () => {
      const wrapper = mount(() => <Textarea name="name" />);
      const textarea = wrapper.find('textarea');
      expect(textarea.element.getAttribute('name')).toBe('name');
    });

    it(':status', () => {
      statusList.forEach((status) => {
        const wrapper = mount(() => <Textarea status={status} />);
        const textarea = wrapper.find('textarea');
        expect(textarea.classes()).toContain(`t-is-${status}`);
      });
    });

    it(':tips', () => {
      const wrapper = mount(() => <Textarea tips="tips" />);
      const tips = wrapper.find('.t-textarea__tips');
      expect(tips.exists()).toBeTruthy();
      expect(tips.text()).toBe('tips');
    });

    it(':maxcharacter', async () => {
      const value = ref('12345');
      const wrapper = mount(() => <Textarea v-model={value.value} maxcharacter={5} />);
      const textarea = wrapper.find('textarea');
      value.value = '123456';
      expect(textarea.element.value).toBe('12345');
    });
  });

  describe(':events', () => {
    it(':onBlur', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Textarea onBlur={fn} />);
      const textarea = wrapper.find('textarea');
      await textarea.trigger('blur');
      expect(fn).toBeCalled();
    });

    it(':onFocus', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Textarea onFocus={fn} />);
      const textarea = wrapper.find('textarea');
      await textarea.trigger('focus');
      expect(fn).toBeCalled();
    });

    it(':onKeydown', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Textarea onKeydown={fn} />);
      const textarea = wrapper.find('textarea');
      await textarea.trigger('keydown');
      expect(fn).toBeCalled();
    });

    it(':onKeypress', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Textarea onKeypress={fn} />);
      const textarea = wrapper.find('textarea');
      await textarea.trigger('keypress');
      expect(fn).toBeCalled();
    });

    it(':onKeyup', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Textarea onKeyup={fn} />);
      const textarea = wrapper.find('textarea');
      await textarea.trigger('keyup');
      expect(fn).toBeCalled();
    });
  });
});
