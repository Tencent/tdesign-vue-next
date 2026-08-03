// @ts-nocheck
import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, it, vi } from 'vitest';
import Textarea from '@tdesign/components/textarea';

const statusList = ['success', 'warning', 'error'];

describe('Textarea', () => {
  describe(':props', () => {
    it(':value', () => {
      const wrapper = mount({
        render() {
          return <Textarea value={'text'} />;
        },
      });
      const textareaElem = wrapper.find('textarea');
      expect(textareaElem.element.value).toEqual('text');
    });

    it(':value(controlled)', async () => {
      const wrapper = mount({
        render() {
          return <Textarea value={'text'} />;
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
          return <Textarea default-value={'text'} />;
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

    it('reconciles controlled maxcharacter input without readonly warnings', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const wrapper = mount(Textarea, { props: { value: '', maxcharacter: 4 } });
      const textarea = wrapper.get('textarea');

      await textarea.setValue('你好a');

      expect(textarea.element.value).toBe('你好');
      expect(wrapper.emitted('update:value')).toEqual([['你好']]);
      expect(warnSpy.mock.calls.flat().join(' ')).not.toContain(
        'Set operation on key "value" failed: target is readonly',
      );
    });

    it('forwards rows and string styles to the native textarea', async () => {
      const wrapper = mount(Textarea, {
        attrs: { rows: 4, style: 'height: 80px; color: red;' },
      });
      const textarea = wrapper.get('textarea');
      await nextTick();

      expect(wrapper.attributes('rows')).toBeUndefined();
      expect(wrapper.attributes('style')).toBeUndefined();
      expect(textarea.attributes('rows')).toBe('4');
      expect(textarea.element.style.height).toBe('80px');
      expect(textarea.element.style.color).toBe('red');
    });

    it('clears calculated height when autosize is disabled', async () => {
      const wrapper = mount(Textarea, { props: { autosize: true, defaultValue: 'content' } });
      const textarea = wrapper.get('textarea');
      await nextTick();
      await nextTick();

      expect(textarea.element.style.height).not.toBe('');

      await wrapper.setProps({ autosize: false });
      await nextTick();

      expect(textarea.classes()).not.toContain('t-hide-scrollbar');
      expect(textarea.element.style.height).toBe('');
      expect(textarea.element.style.minHeight).toBe('');
    });

    it('uses Unicode length for the maxlength counter', async () => {
      const onValidate = vi.fn();
      const wrapper = mount(Textarea, {
        props: { value: '😊', maxlength: 1, allowInputOverMax: true, onValidate },
      });
      await nextTick();

      expect(wrapper.get('.t-textarea__limit').text()).toBe('1/1');
      expect(onValidate).not.toHaveBeenCalled();
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
