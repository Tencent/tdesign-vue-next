/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { Input } from '@/src/input/index.ts';

describe('Input', () => {
  describe(':props', () => {
    it(':value', () => {
      const wrapper = mount({
        render() {
          return <Input value={'text'} />;
        },
      });
      const inputElemWrapper = wrapper.find('input');
      expect(inputElemWrapper.element.value).toEqual('text');
    });

    it(':value(controlled)', async () => {
      const wrapper = mount({
        render() {
          return <Input value={'text'} />;
        },
      });
      const inputElemWrapper = wrapper.find('input');
      inputElemWrapper.setValue('text1');
      await Vue.nextTick();
      expect(inputElemWrapper.element.value).toEqual('text');
    });

    it(':default-value', async () => {
      const wrapper = mount({
        render() {
          return <Input default-value={'text'} />;
        },
      });
      const inputElemWrapper = wrapper.find('input');
      inputElemWrapper.setValue('text1');
      await Vue.nextTick();
      expect(inputElemWrapper.element.value).toEqual('text1');
    });

    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Input disabled={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':readonly', () => {
      const wrapper = mount({
        render() {
          return <Input readonly={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':autocomplete', () => {
      const wrapper = mount({
        render() {
          return <Input autocomplete={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':prefix-icon', () => {
      const wrapper = mount({
        render() {
          return <Input prefix-icon={(h) => <i class="icon"></i>} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':suffix-icon', () => {
      const wrapper = mount({
        render() {
          return <Input suffix-icon={(h) => <i class="icon"></i>} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Input size={'large'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('$attrs', () => {
    it('input attrs should pass to input element', () => {
      const wrapper = mount({
        render() {
          return <Input name="password" placeholder="please text" maxLength="20" type="password" />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@event', () => {
    it('@change', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Input on={{ change: fn }} change={fn} />;
        },
      });
      const inputWrapper = wrapper.findComponent(Input);
      const inputElemWrapper = wrapper.find('input');
      inputElemWrapper.setValue('text');
      await inputWrapper.vm.$nextTick();
      // TODO emitted return undefined in vue 2.7
      // expect(inputWrapper.emitted().change).toBeTruthy();
      expect(fn).toBeCalled();
    });

    it('@blur', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Input onBlur={fn} />;
        },
      });
      const inputWrapper = wrapper.findComponent(Input);
      const inputElemWrapper = wrapper.find('input');
      inputElemWrapper.trigger('blur');
      // TODO emitted return undefined in vue 2.7
      // expect(inputWrapper.emitted().blur).toBeTruthy();
      expect(fn).toBeCalled();
    });

    it(':onKeydown', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Input onKeydown={fn} />;
        },
      });
      const input = wrapper.find('.t-input input');
      await input.trigger('keydown');
      expect(fn).toBeCalled();
    });
  });

  describe('methods', () => {
    it('blur', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Input onBlur={fn} />;
        },
      });
      const inputWrapper = wrapper.findComponent(Input);
      const inputElemWrapper = wrapper.find('input');
      inputWrapper.vm.focus();
      inputWrapper.vm.blur();
      inputElemWrapper.trigger('blur');

      // TODO emitted return undefined in vue 2.7
      // expect(inputWrapper.emitted().blur).toBeTruthy();
      expect(fn).toBeCalled();
    });
  });
});
