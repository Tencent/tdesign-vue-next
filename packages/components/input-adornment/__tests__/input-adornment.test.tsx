import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { InputAdornment } from '@tdesign/components/input-adornment';

describe('InputAdornment', () => {
  it('render: no prepend/append -> return default slot only (no wrapper)', () => {
    const wrapper = mount(() => (
      <InputAdornment>
        <span class="content">content</span>
      </InputAdornment>
    ));

    expect(wrapper.find('.content').exists()).toBe(true);
    expect(wrapper.find('.t-input-adornment').exists()).toBe(false);
  });

  describe('props', () => {
    it('props.prepend[string] works fine', () => {
      const wrapper = mount(() => (
        <InputAdornment prepend="pre">
          <span class="content">content</span>
        </InputAdornment>
      ));

      expect(wrapper.find('.t-input-adornment').exists()).toBe(true);
      expect(wrapper.find('.t-input-adornment--prepend').exists()).toBe(true);

      const node = wrapper.find('.t-input-adornment__prepend');
      expect(node.exists()).toBe(true);
      expect(node.find('.t-input-adornment__text').text()).toBe('pre');
    });

    it('props.append[string] works fine', () => {
      const wrapper = mount(() => (
        <InputAdornment append="123">
          <span class="content">content</span>
        </InputAdornment>
      ));

      expect(wrapper.find('.t-input-adornment').exists()).toBe(true);
      expect(wrapper.find('.t-input-adornment--append').exists()).toBe(true);

      const node = wrapper.find('.t-input-adornment__append');
      expect(node.exists()).toBe(true);
      expect(node.find('.t-input-adornment__text').text()).toBe('123');
    });

    it('props.append[empty string] should not render append', () => {
      const wrapper = mount(() => (
        <InputAdornment append="">
          <span class="content">content</span>
        </InputAdornment>
      ));

      expect(wrapper.find('.t-input-adornment__append').exists()).toBe(false);
      expect(wrapper.find('.t-input-adornment--append').exists()).toBe(false);
      // still no prepend either
      expect(wrapper.find('.t-input-adornment--prepend').exists()).toBe(false);
    });

    it('props.prepend[function] works fine', () => {
      const wrapper = mount(() => (
        <InputAdornment prepend={() => <span class="custom-prepend">P</span>}>
          <span class="content">content</span>
        </InputAdornment>
      ));

      expect(wrapper.find('.t-input-adornment__prepend').exists()).toBe(true);
      expect(wrapper.find('.custom-prepend').exists()).toBe(true);
      expect(wrapper.find('.t-input-adornment--prepend').exists()).toBe(true);
    });

    it('props.append[function] works fine', () => {
      const wrapper = mount(() => (
        <InputAdornment append={() => <span class="custom-append">A</span>}>
          <span class="content">content</span>
        </InputAdornment>
      ));

      expect(wrapper.find('.t-input-adornment__append').exists()).toBe(true);
      expect(wrapper.find('.custom-append').exists()).toBe(true);
      expect(wrapper.find('.t-input-adornment--append').exists()).toBe(true);
    });

    it('render: no default slot should fallback to null (still render wrapper when prepend/append exists)', () => {
      const wrapper = mount(() => <InputAdornment prepend="pre" />);

      expect(wrapper.find('.t-input-adornment').exists()).toBe(true);
      expect(wrapper.find('.t-input-adornment--prepend').exists()).toBe(true);
      expect(wrapper.find('.t-input-adornment__prepend').exists()).toBe(true);
    });
  });

  describe('slots', () => {
    it('slots.prepend[text node] should be wrapped with __text', () => {
      const wrapper = mount(InputAdornment, {
        slots: {
          default: () => <span class="content">content</span>,
          prepend: () => 'slot-pre',
        },
      });

      const node = wrapper.find('.t-input-adornment__prepend');
      expect(node.exists()).toBe(true);
      expect(node.find('.t-input-adornment__text').text()).toBe('slot-pre');
    });

    it('slots.append[complex node] should render as-is (no forced __text wrapping)', () => {
      const wrapper = mount(InputAdornment, {
        slots: {
          default: () => <span class="content">content</span>,
          append: () => <span class="complex">X</span>,
        },
      });

      const node = wrapper.find('.t-input-adornment__append');
      expect(node.exists()).toBe(true);
      expect(node.find('.complex').exists()).toBe(true);
      // complex slot should not be auto wrapped into __text
      expect(node.find('.t-input-adornment__text').exists()).toBe(false);
    });

    it('slots.append should override props.append(empty string) and render append', () => {
      const wrapper = mount(InputAdornment, {
        props: { append: '' },
        slots: {
          default: () => <span class="content">content</span>,
          append: () => 'slot-append',
        },
      });

      const node = wrapper.find('.t-input-adornment__append');
      expect(node.exists()).toBe(true);
      expect(node.find('.t-input-adornment__text').text()).toBe('slot-append');
      expect(wrapper.find('.t-input-adornment--append').exists()).toBe(true);
    });

    it('slots.prepend[complex node array] should render as-is', () => {
      const wrapper = mount(InputAdornment, {
        slots: {
          default: () => <span class="content">content</span>,
          prepend: () => [h('span', { class: 'n1' }, '1'), h('span', { class: 'n2' }, '2')],
        },
      });

      const node = wrapper.find('.t-input-adornment__prepend');
      expect(node.exists()).toBe(true);
      expect(node.find('.n1').exists()).toBe(true);
      expect(node.find('.n2').exists()).toBe(true);
      expect(node.find('.t-input-adornment__text').exists()).toBe(false);
    });
  });
});
