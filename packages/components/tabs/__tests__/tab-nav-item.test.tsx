import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import TTabNavItem from '../tab-nav-item';

const defaultProps = () => ({
  index: 0,
  label: 'Tab label',
  onClick: vi.fn(),
  onTabRemove: vi.fn(),
  value: 'tab',
});

describe('TabNavItem', () => {
  describe('props', () => {
    it(':active[boolean] + :draggable[boolean] + :label[string]', () => {
      const wrapper = mount(TTabNavItem, {
        props: { ...defaultProps(), active: true, draggable: true },
      });

      expect(wrapper.classes()).toContain('t-tabs__nav-item');
      expect(wrapper.classes()).toContain('t-is-active');
      expect(wrapper.attributes('draggable')).toBe('true');
      expect(wrapper.find('.t-tabs__nav-item-wrapper').classes()).toContain('t-is-active');
      expect(wrapper.find('.t-tabs__nav-item-text-wrapper').text()).toBe('Tab label');
    });

    it(':theme[card]', () => {
      const wrapper = mount(TTabNavItem, {
        props: { ...defaultProps(), theme: 'card' },
      });

      expect(wrapper.classes()).toContain('t-tabs__nav--card');
      expect(wrapper.find('.t-tabs__nav-item-wrapper').exists()).toBe(false);
      expect(wrapper.find('.t-tabs__nav-item-text-wrapper').text()).toBe('Tab label');
    });

    it.each([
      [{ placement: 'left' as const }, 't-is-left'],
      [{ placement: 'right' as const }, 't-is-right'],
      [{ size: 'medium' as const }, 't-size-m'],
      [{ size: 'large' as const }, 't-size-l'],
    ])(':placement/:size %o', (props, expectedClass) => {
      const wrapper = mount(TTabNavItem, { props: { ...defaultProps(), ...props } });

      expect(wrapper.classes()).toContain(expectedClass);
    });

    it.each([
      { removable: false, disabled: false },
      { removable: true, disabled: true },
    ])(':removable[boolean] + :disabled[boolean] %o', (state) => {
      const wrapper = mount(TTabNavItem, { props: { ...defaultProps(), ...state } });

      expect(wrapper.find('.remove-btn').exists()).toBe(false);
    });
  });

  describe('events', () => {
    it('click', async () => {
      const props = defaultProps();
      const wrapper = mount(TTabNavItem, { props });

      await wrapper.trigger('click');

      expect(props.onClick).toHaveBeenCalledOnce();
      expect(props.onClick).toHaveBeenCalledWith(expect.any(MouseEvent));
    });

    it('click (disabled)', async () => {
      const props = defaultProps();
      const wrapper = mount(TTabNavItem, { props: { ...props, active: true, disabled: true } });

      await wrapper.trigger('click');

      expect(props.onClick).not.toHaveBeenCalled();
      expect(wrapper.classes()).toContain('t-is-disabled');
      expect(wrapper.find('.t-tabs__nav-item-wrapper').classes()).toContain('t-is-disabled');
    });

    it('remove', async () => {
      const props = defaultProps();
      const onTabPanelRemove = vi.fn();
      const wrapper = mount(TTabNavItem, {
        props: { ...props, index: 2, removable: true, onTabPanelRemove, value: 10 },
      });

      await wrapper.find('.remove-btn').trigger('click');

      expect(props.onClick).not.toHaveBeenCalled();
      expect(props.onTabRemove).toHaveBeenCalledWith({ e: expect.any(MouseEvent), value: 10, index: 2 });
      expect(onTabPanelRemove).toHaveBeenCalledWith({ e: expect.any(MouseEvent), value: 10 });
    });

    it('remove (without panel callback)', async () => {
      const props = defaultProps();
      const wrapper = mount(TTabNavItem, { props: { ...props, removable: true } });

      await wrapper.find('.remove-btn').trigger('click');

      expect(props.onTabRemove).toHaveBeenCalledOnce();
    });
  });
});
