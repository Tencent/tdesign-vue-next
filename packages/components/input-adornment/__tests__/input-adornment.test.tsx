import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { describe, it, expect, afterEach } from 'vitest';
import { InputAdornment } from '@tdesign/components/input-adornment';

describe('InputAdornment', () => {
  describe('props', () => {
    let wrapper!: VueWrapper<InstanceType<typeof InputAdornment>>;

    afterEach(() => {
      wrapper?.unmount();
    });

    it('no prepend and append should render default slot directly', () => {
      wrapper = mount(
        <InputAdornment>
          <input />
        </InputAdornment>,
      ) as VueWrapper<InstanceType<typeof InputAdornment>>;
      expect(wrapper.find('.t-input-adornment').exists()).toBe(false);
      expect(wrapper.find('input').exists()).toBe(true);
    });

    it(':prepend[string]', () => {
      wrapper = mount(
        <InputAdornment prepend="http://">
          <input />
        </InputAdornment>,
      ) as VueWrapper<InstanceType<typeof InputAdornment>>;
      expect(wrapper.find('.t-input-adornment').exists()).toBe(true);
      expect(wrapper.classes('t-input-adornment--prepend')).toBe(true);
      expect(wrapper.find('.t-input-adornment__prepend').exists()).toBe(true);
      expect(wrapper.find('.t-input-adornment__text').text()).toBe('http://');
    });

    it(':prepend[slot/function]', () => {
      // slot
      const wrapper1 = mount(
        <InputAdornment v-slots={{ prepend: () => 'https://' }}>
          <input />
        </InputAdornment>,
      );
      expect(wrapper1.find('.t-input-adornment__prepend').exists()).toBe(true);
      expect(wrapper1.find('.t-input-adornment__prepend .t-input-adornment__text').text()).toBe('https://');
      wrapper1.unmount();

      // function
      const wrapper2 = mount(
        <InputAdornment prepend={() => <span class="custom-prepend">prefix</span>}>
          <input />
        </InputAdornment>,
      );
      expect(wrapper2.find('.t-input-adornment__prepend').exists()).toBe(true);
      expect(wrapper2.find('.custom-prepend').exists()).toBe(true);
      expect(wrapper2.find('.custom-prepend').text()).toBe('prefix');
      wrapper2.unmount();
    });

    it(':prepend[string] empty string should not render', () => {
      wrapper = mount(
        <InputAdornment prepend="">
          <input />
        </InputAdornment>,
      ) as VueWrapper<InstanceType<typeof InputAdornment>>;
      expect(wrapper.find('.t-input-adornment').exists()).toBe(false);
    });

    it(':append[string]', () => {
      wrapper = mount(
        <InputAdornment append=".com">
          <input />
        </InputAdornment>,
      ) as VueWrapper<InstanceType<typeof InputAdornment>>;
      expect(wrapper.find('.t-input-adornment').exists()).toBe(true);
      expect(wrapper.classes('t-input-adornment--append')).toBe(true);
      expect(wrapper.find('.t-input-adornment__append').exists()).toBe(true);
      expect(wrapper.find('.t-input-adornment__append .t-input-adornment__text').text()).toBe('.com');
    });

    it(':append[slot/function]', () => {
      // slot
      const wrapper1 = mount(
        <InputAdornment v-slots={{ append: () => '.cn' }}>
          <input />
        </InputAdornment>,
      );
      expect(wrapper1.find('.t-input-adornment__append').exists()).toBe(true);
      expect(wrapper1.find('.t-input-adornment__append .t-input-adornment__text').text()).toBe('.cn');
      wrapper1.unmount();

      // function
      const wrapper2 = mount(
        <InputAdornment append={() => <span class="custom-append">suffix</span>}>
          <input />
        </InputAdornment>,
      );
      expect(wrapper2.find('.t-input-adornment__append').exists()).toBe(true);
      expect(wrapper2.find('.custom-append').exists()).toBe(true);
      expect(wrapper2.find('.custom-append').text()).toBe('suffix');
      wrapper2.unmount();
    });

    it(':append[string] empty string should not render', () => {
      wrapper = mount(
        <InputAdornment append="">
          <input />
        </InputAdornment>,
      ) as VueWrapper<InstanceType<typeof InputAdornment>>;
      expect(wrapper.find('.t-input-adornment').exists()).toBe(false);
    });

    it(':prepend + :append together', () => {
      wrapper = mount(
        <InputAdornment prepend="http://" append=".com">
          <input />
        </InputAdornment>,
      ) as VueWrapper<InstanceType<typeof InputAdornment>>;
      expect(wrapper.classes('t-input-adornment--prepend')).toBe(true);
      expect(wrapper.classes('t-input-adornment--append')).toBe(true);
      expect(wrapper.find('.t-input-adornment__prepend .t-input-adornment__text').text()).toBe('http://');
      expect(wrapper.find('.t-input-adornment__append .t-input-adornment__text').text()).toBe('.com');
    });

    it(':prepend[slot] with non-text VNode should not wrap with __text', () => {
      const wrapper1 = mount(
        <InputAdornment
          v-slots={{
            prepend: () => (
              <div>
                <span>item1</span>
                <span>item2</span>
              </div>
            ),
          }}
        >
          <input />
        </InputAdornment>,
      );
      expect(wrapper1.find('.t-input-adornment__prepend').exists()).toBe(true);
      expect(wrapper1.find('.t-input-adornment__prepend .t-input-adornment__text').exists()).toBe(false);
      wrapper1.unmount();
    });
  });
});
