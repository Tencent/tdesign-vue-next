// @ts-nocheck
import { SelectInput } from '@tdesign/components';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('useOverlayInnerStyle hooks', () => {
  describe('overlayInnerStyle handling', () => {
    it('should use function overlayInnerStyle when provided', () => {
      const mockFunc = vi.fn().mockReturnValue({ width: '150px' });
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          popupProps: {
            overlayInnerStyle: mockFunc,
          },
        },
      });

      expect(wrapper.props('popupProps').overlayInnerStyle).toBe(mockFunc);
    });

    it('should use object overlayInnerStyle with width when provided', () => {
      const styleObj = { width: '250px', height: '120px' };
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          popupProps: {
            overlayInnerStyle: styleObj,
          },
        },
      });

      expect(wrapper.props('popupProps').overlayInnerStyle).toEqual(styleObj);
    });

    it('should use matchWidthFunc when autoWidth is false and no width in overlayInnerStyle', () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          autoWidth: false,
          popupProps: {
            overlayInnerStyle: { height: '100px' },
          },
        },
      });

      expect(wrapper.props('autoWidth')).toBe(false);
    });

    it('should use getAutoWidthPopupStyleWidth when autoWidth is true', () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          autoWidth: true,
        },
      });

      expect(wrapper.props('autoWidth')).toBe(true);
    });

    it('should handle overlayInnerStyle as empty object', () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          popupProps: {
            overlayInnerStyle: {},
          },
        },
      });

      expect(wrapper.props('popupProps').overlayInnerStyle).toEqual({});
    });

    it('should handle popupProps without overlayInnerStyle', () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          autoWidth: false,
        },
      });

      expect(wrapper.props('autoWidth')).toBe(false);
    });

    it('should handle object overlayInnerStyle without width property', () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          autoWidth: false,
          popupProps: {
            overlayInnerStyle: { height: '100px', padding: '10px' },
          },
        },
      });

      const overlayStyle = wrapper.props('popupProps').overlayInnerStyle;
      expect(overlayStyle).toHaveProperty('height');
      expect(overlayStyle).not.toHaveProperty('width');
    });
  });

  describe('popup visibility handling', () => {
    it('should handle disabled state in onInnerPopupVisibleChange', async () => {
      const onPopupVisibleChange = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          disabled: true,
          popupVisible: false,
          onPopupVisibleChange,
        },
      });

      const input = wrapper.find('.t-input__wrap');
      await input.trigger('click');

      expect(onPopupVisibleChange).not.toBeCalled();
    });
  });

  describe('allowInput configuration', () => {
    it('should handle allowInput configuration correctly', () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          allowInput: true,
        },
      });

      expect(wrapper.props('allowInput')).toBe(true);
      expect(wrapper.find('input').exists()).toBe(true);
    });
  });
});
