/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { nextTick } from 'vue';
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
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':readonly', () => {
      const wrapper = mount({
        render() {
          return <Textarea readonly={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':maxlength', () => {
      const wrapper = mount({
        render() {
          return <Textarea maxlength={10} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('$attrs', () => {
    it('textarea attrs should pass to textarea element', () => {
      const wrapper = mount({
        render() {
          return <Textarea name="description" placeholder="please text" maxLength="20" />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
