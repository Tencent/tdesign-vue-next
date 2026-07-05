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
      const value = ref('text');
      const wrapper = mount(() => <Textarea v-model={value.value} clearable />);
      const root = wrapper.find('.t-textarea');
      // clearable 为 true 时，根节点应带上 --clearable 修饰类（对应 tdesign-common 里的右侧内边距样式）
      expect(root.classes()).toContain('t-textarea--clearable');
      // 未悬浮时不展示清空按钮
      expect(wrapper.find('.t-textarea__clear').exists()).toBeFalsy();
      await root.trigger('mouseenter');
      expect(wrapper.find('.t-textarea__clear').exists()).toBeTruthy();
      await root.trigger('mouseleave');
      expect(wrapper.find('.t-textarea__clear').exists()).toBeFalsy();
    });

    it(':clearable(default false)', async () => {
      // 默认 clearable=false：即使有值且悬浮，也不应该出现清空按钮，防止未来默认值被误改
      const value = ref('text');
      const wrapper = mount(() => <Textarea v-model={value.value} />);
      const root = wrapper.find('.t-textarea');
      expect(root.classes()).not.toContain('t-textarea--clearable');
      await root.trigger('mouseenter');
      expect(wrapper.find('.t-textarea__clear').exists()).toBeFalsy();
    });

    it(':clearable(no value)', async () => {
      const wrapper = mount(() => <Textarea clearable />);
      const root = wrapper.find('.t-textarea');
      await root.trigger('mouseenter');
      // 没有内容时即使悬浮也不展示清空按钮
      expect(wrapper.find('.t-textarea__clear').exists()).toBeFalsy();
    });

    it(':clearable(disabled)', async () => {
      const wrapper = mount(() => <Textarea clearable disabled defaultValue="text" />);
      const root = wrapper.find('.t-textarea');
      await root.trigger('mouseenter');
      // 禁用状态下即使悬浮也不展示清空按钮
      expect(wrapper.find('.t-textarea__clear').exists()).toBeFalsy();
    });

    it(':clearable(readonly)', async () => {
      const wrapper = mount(() => <Textarea clearable readonly defaultValue="text" />);
      const root = wrapper.find('.t-textarea');
      await root.trigger('mouseenter');
      // 只读状态下即使悬浮也不展示清空按钮
      expect(wrapper.find('.t-textarea__clear').exists()).toBeFalsy();
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
      const fn = vi.fn();
      const value = ref('text');
      const wrapper = mount(() => <Textarea v-model={value.value} clearable onClear={fn} />);
      const root = wrapper.find('.t-textarea');
      await root.trigger('mouseenter');
      const clearBtn = wrapper.find('.t-textarea__clear');
      expect(clearBtn.exists()).toBeTruthy();
      await clearBtn.trigger('click');
      expect(fn).toBeCalled();
      expect(value.value).toBe('');
      const textarea = wrapper.find('textarea');
      expect(textarea.element.value).toBe('');
    });
  });
});
