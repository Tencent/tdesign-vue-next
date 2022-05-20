import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Input from '@/src/input/index.ts';

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
      await nextTick();
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
      await nextTick();
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
    it('@input', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Input onChange={fn} />;
        },
      });
      const inputWrapper = wrapper.findComponent(Input);
      const inputElemWrapper = wrapper.find('input');
      inputElemWrapper.setValue('text');
      expect(inputWrapper.props('onChange')).toBeTruthy();
      expect(fn).toBeCalled();
    });

    it('@change', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Input onChange={fn} />;
        },
      });
      const inputWrapper = wrapper.findComponent(Input);
      const inputElemWrapper = wrapper.find('input');
      inputElemWrapper.setValue('text');
      expect(inputWrapper.props('onChange')).toBeTruthy();
      expect(fn).toBeCalled();
    });
  });
});
