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

    it(':clearable', async () => {
      const wrapper = mount(() => <Textarea value="text" clearable />);
      expect(wrapper.find('.t-textarea__clear').exists()).toBeTruthy();
      expect(wrapper.find('.t-textarea__clear--visible').exists()).toBeFalsy();

      await wrapper.trigger('mouseenter');
      expect(wrapper.find('.t-textarea__clear--visible').exists()).toBeTruthy();
    });

    it(':clearable should show when value is number zero', async () => {
      const wrapper = mount(() => <Textarea value={0} clearable />);

      await wrapper.trigger('mouseenter');

      expect(wrapper.find('.t-textarea__clear--visible').exists()).toBeTruthy();
    });

    it(':clearable should not show when empty, disabled or readonly', async () => {
      const emptyWrapper = mount(() => <Textarea value="" clearable />);
      await emptyWrapper.trigger('mouseenter');
      expect(emptyWrapper.find('.t-textarea__clear--visible').exists()).toBeFalsy();

      const disabledWrapper = mount(() => <Textarea value="text" clearable disabled />);
      await disabledWrapper.trigger('mouseenter');
      expect(disabledWrapper.find('.t-textarea__clear').exists()).toBeFalsy();

      const readonlyWrapper = mount(() => <Textarea value="text" clearable readonly />);
      await readonlyWrapper.trigger('mouseenter');
      expect(readonlyWrapper.find('.t-textarea__clear').exists()).toBeFalsy();
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

    it(':onClear', async () => {
      const onClear = vi.fn();
      const onChange = vi.fn();
      const wrapper = mount(() => <Textarea defaultValue="text" clearable onClear={onClear} onChange={onChange} />);
      const textarea = wrapper.find('textarea');

      await wrapper.trigger('mouseenter');
      await wrapper.find('.t-textarea__clear').trigger('click');

      expect(onClear).toHaveBeenCalledTimes(1);
      expect(onClear.mock.calls[0][0].e.type).toBe('click');
      expect(onChange).toHaveBeenCalledWith('', expect.objectContaining({ trigger: 'clear' }));
      expect(textarea.element.value).toBe('');
    });
  });
});
