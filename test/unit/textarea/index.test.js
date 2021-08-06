/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import Textarea from '@/src/textarea/index.ts';

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
      await Vue.nextTick();
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
      await Vue.nextTick();
      expect(textareaElem.element.value).toEqual('text1');
    });

    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Textarea disabled={true} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':readonly', () => {
      const wrapper = mount({
        render() {
          return <Textarea readonly={true} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':maxlength', () => {
      const wrapper = mount({
        render() {
          return <Textarea maxlength={10} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('$attrs', () => {
    it('textarea attrs should pass to textarea element', () => {
      const wrapper = mount({
        render() {
          return <Textarea name="description" placeholder="please text" maxLength="20" />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('@event', () => {
    it('@input', () => {
      const wrapper = mount(Textarea);
      const textareaElem = wrapper.find('textarea');
      textareaElem.setValue('text');
      expect(wrapper.emitted().input).toBeTruthy();
      expect(wrapper.emitted().input[0][0]).toBe('text');
    });

    it('@change', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Textarea onChange={fn} />;
        },
      });
      const textareaWrapper = wrapper.findComponent(Textarea);
      const textareaElem = wrapper.find('textarea');
      textareaElem.setValue('text');
      expect(textareaWrapper.emitted().change).toBeTruthy();
      expect(fn).toBeCalled();
    });

    it('@focus', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Textarea onFocus={fn} />;
        },
      });
      const textareaWrapper = wrapper.findComponent(Textarea);
      const textareaElem = wrapper.find('textarea');
      textareaElem.trigger('focus');
      expect(textareaWrapper.emitted().focus).toBeTruthy();
      expect(fn).toBeCalled();
    });

    it('@blur', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Textarea onBlur={fn} />;
        },
      });
      const textareaWrapper = wrapper.findComponent(Textarea);
      const textareaElem = wrapper.find('textarea');
      textareaElem.trigger('blur');
      expect(textareaWrapper.emitted().blur).toBeTruthy();
      expect(fn).toBeCalled();
    });

    it('@keydown', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Textarea onKeydown={fn} />;
        },
      });
      const inputElemWrapper = wrapper.find('textarea');
      inputElemWrapper.trigger('keydown.enter');
      expect(fn).toBeCalled();
    });
  });

  describe('methods', () => {
    it('focus', async () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Textarea onFocus={fn} />;
        },
      });
      const textareaWrapper = wrapper.findComponent(Textarea);
      const textareaElem = wrapper.find('textarea');
      textareaWrapper.vm.focus();
      textareaElem.trigger('focus');
      await Vue.nextTick();
      expect(textareaWrapper.emitted().focus).toBeTruthy();
    });

    it('blur', async () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Textarea onBlur={fn} />;
        },
      });
      const textareaWrapper = wrapper.findComponent(Textarea);
      const textareaElem = wrapper.find('textarea');
      textareaWrapper.vm.focus();
      textareaWrapper.vm.blur();
      textareaElem.trigger('blur');
      await Vue.nextTick();
      expect(textareaWrapper.emitted().blur).toBeTruthy();
    });
  });
});
