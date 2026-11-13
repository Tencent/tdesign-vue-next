import { defineComponent, h, nextTick, ref, toRefs } from 'vue';
import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { useVModel } from '../../../shared/hooks/useVModel';
import { useDefaultValue } from '../../../shared/hooks/useDefaultValue';

describe('useVModel', () => {
  describe('defaultValue', () => {
    it('follows defaultValue changes while the component stays uncontrolled', async () => {
      const Wrapper = defineComponent({
        props: {
          defaultValue: { type: String, default: '' },
        },
        setup(props) {
          const { defaultValue } = toRefs(props);
          const [value] = useVModel(ref(), ref(), defaultValue, undefined);
          return () => h('span', { class: 'out' }, value.value);
        },
      });

      const wrapper = mount(Wrapper, { props: { defaultValue: 'first' } });
      await nextTick();
      expect(wrapper.find('.out').text()).toBe('first');

      await wrapper.setProps({ defaultValue: 'second' });
      await nextTick();
      expect(wrapper.find('.out').text()).toBe('second');
    });

    it('accepts a plain value and keeps it as the initial internal value', async () => {
      const Wrapper = defineComponent({
        setup() {
          const [value] = useVModel(ref(), ref(), 'plain', undefined);
          return () => h('span', { class: 'out' }, value.value);
        },
      });
      const wrapper = mount(Wrapper);
      await nextTick();
      expect(wrapper.find('.out').text()).toBe('plain');
    });

    it('keeps the internal value after the user changes it', async () => {
      const Wrapper = defineComponent({
        setup() {
          const [value, setValue] = useVModel(ref(), ref(), 'initial', undefined);
          return () => h('button', { class: 'out', onClick: () => setValue('changed') }, value.value);
        },
      });
      const wrapper = mount(Wrapper);
      await nextTick();
      expect(wrapper.find('.out').text()).toBe('initial');
      await wrapper.find('.out').trigger('click');
      await nextTick();
      expect(wrapper.find('.out').text()).toBe('changed');
    });
  });
  describe('useDefaultValue', () => {
    it('follows a reactive defaultValue while the component stays uncontrolled', async () => {
      const Wrapper = defineComponent({
        props: {
          defaultChecked: { type: String, default: '' },
        },
        setup(props) {
          const { defaultChecked } = toRefs(props);
          const [value] = useDefaultValue(ref(), defaultChecked, undefined, 'checked');
          return () => h('span', { class: 'out' }, value.value);
        },
      });

      const wrapper = mount(Wrapper, { props: { defaultChecked: 'first' } });
      await nextTick();
      expect(wrapper.find('.out').text()).toBe('first');

      await wrapper.setProps({ defaultChecked: 'second' });
      await nextTick();
      expect(wrapper.find('.out').text()).toBe('second');
    });

    it('accepts a plain value and keeps it as the initial internal value', async () => {
      const Wrapper = defineComponent({
        setup() {
          const [value] = useDefaultValue(ref(), 'plain', undefined, 'checked');
          return () => h('span', { class: 'out' }, value.value);
        },
      });
      const wrapper = mount(Wrapper);
      await nextTick();
      expect(wrapper.find('.out').text()).toBe('plain');
    });
  });
});
