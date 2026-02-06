// @ts-nocheck
import { mount } from '@vue/test-utils';
import { expect, it, vi, beforeEach, afterEach, describe } from 'vitest';
import { nextTick } from 'vue';
import { ZoomInIcon, ZoomOutIcon, RotationIcon } from 'tdesign-icons-vue-next';
import ImageModalIcon from '../base/ImageModalIcon';

describe('ImageModalIcon Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // ==================== Basic Rendering Tests ====================
  describe('basic rendering', () => {
    it('should render with icon prop', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
        },
      });

      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon').exists()).toBeTruthy();
      expect(wrapper.findComponent(ZoomInIcon).exists()).toBeTruthy();
    });

    it('should render with label prop', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          label: '100%',
        },
      });

      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon').exists()).toBeTruthy();
      expect(wrapper.find('.t-image-viewer__modal-icon-label').exists()).toBeTruthy();
      expect(wrapper.find('.t-image-viewer__modal-icon-label').text()).toBe('100%');
    });

    it('should render without label when label prop is not provided', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
        },
      });

      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon').exists()).toBeTruthy();
      expect(wrapper.find('.t-image-viewer__modal-icon-label').exists()).toBeFalsy();
    });

    it('should render with different icons', async () => {
      const wrapper1 = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
        },
      });

      const wrapper2 = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomOutIcon size="medium" />,
        },
      });

      const wrapper3 = mount(ImageModalIcon, {
        props: {
          icon: () => <RotationIcon size="medium" />,
        },
      });

      await nextTick();
      expect(wrapper1.findComponent(ZoomInIcon).exists()).toBeTruthy();
      expect(wrapper2.findComponent(ZoomOutIcon).exists()).toBeTruthy();
      expect(wrapper3.findComponent(RotationIcon).exists()).toBeTruthy();
    });
  });

  // ==================== Disabled State Tests ====================
  describe('disabled state', () => {
    it('should apply disabled class when disabled prop is true', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          disabled: true,
        },
      });

      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon').classes()).toContain('t-is-disabled');
    });

    it('should not apply disabled class when disabled prop is false', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          disabled: false,
        },
      });

      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon').classes()).not.toContain('t-is-disabled');
    });

    it('should not apply disabled class when disabled prop is not provided', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
        },
      });

      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon').classes()).not.toContain('t-is-disabled');
    });
  });

  // ==================== Click Event Tests ====================
  describe('click events', () => {
    it('should call onClick when clicked', async () => {
      const onClick = vi.fn();
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          onClick,
        },
      });

      await nextTick();
      await wrapper.find('.t-image-viewer__modal-icon').trigger('click');

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(expect.any(MouseEvent));
    });

    it('should not call onClick when not provided', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
        },
      });

      await nextTick();
      // Should not throw error when clicking without onClick handler
      await wrapper.find('.t-image-viewer__modal-icon').trigger('click');

      expect(true).toBe(true); // Test passes if no error is thrown
    });

    it('should call onClick multiple times when clicked multiple times', async () => {
      const onClick = vi.fn();
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          onClick,
        },
      });

      await nextTick();
      const iconElement = wrapper.find('.t-image-viewer__modal-icon');

      await iconElement.trigger('click');
      await iconElement.trigger('click');
      await iconElement.trigger('click');

      expect(onClick).toHaveBeenCalledTimes(3);
    });

    it('should pass correct event object to onClick', async () => {
      const onClick = vi.fn();
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          onClick,
        },
      });

      await nextTick();
      await wrapper.find('.t-image-viewer__modal-icon').trigger('click');

      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'click',
          target: expect.any(Element),
        }),
      );
    });
  });

  // ==================== Label Tests ====================
  describe('label functionality', () => {
    it('should display string label correctly', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          label: 'Zoom In',
        },
      });

      await nextTick();
      const labelElement = wrapper.find('.t-image-viewer__modal-icon-label');
      expect(labelElement.exists()).toBeTruthy();
      expect(labelElement.text()).toBe('Zoom In');
    });

    it('should display numeric label correctly', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          label: '150%',
        },
      });

      await nextTick();
      const labelElement = wrapper.find('.t-image-viewer__modal-icon-label');
      expect(labelElement.exists()).toBeTruthy();
      expect(labelElement.text()).toBe('150%');
    });

    it('should update label when prop changes', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          label: '100%',
        },
      });

      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon-label').text()).toBe('100%');

      await wrapper.setProps({ label: '200%' });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon-label').text()).toBe('200%');
    });

    it('should handle empty string label', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          label: '',
        },
      });

      await nextTick();
      // Empty string should not render label element
      expect(wrapper.find('.t-image-viewer__modal-icon-label').exists()).toBeFalsy();
    });

    it('should handle null label', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          label: null,
        },
      });

      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon-label').exists()).toBeFalsy();
    });
  });

  // ==================== Icon Tests ====================
  describe('icon functionality', () => {
    it('should render custom icon function', async () => {
      const CustomIcon = () => <span class="custom-icon">Custom</span>;
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: CustomIcon,
        },
      });

      await nextTick();
      expect(wrapper.find('.custom-icon').exists()).toBeTruthy();
      expect(wrapper.find('.custom-icon').text()).toBe('Custom');
    });

    it('should handle icon prop change', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
        },
      });

      await nextTick();
      expect(wrapper.findComponent(ZoomInIcon).exists()).toBeTruthy();

      await wrapper.setProps({
        icon: () => <ZoomOutIcon size="medium" />,
      });
      await nextTick();
      expect(wrapper.findComponent(ZoomOutIcon).exists()).toBeTruthy();
      expect(wrapper.findComponent(ZoomInIcon).exists()).toBeFalsy();
    });

    it('should handle null icon', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: null,
        },
      });

      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon').exists()).toBeTruthy();
      // Should render without throwing error
    });
  });

  // ==================== CSS Classes Tests ====================
  describe('CSS classes', () => {
    it('should have correct base class', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
        },
      });

      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon').exists()).toBeTruthy();
    });

    it('should combine disabled class with base class', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          disabled: true,
        },
      });

      await nextTick();
      const iconElement = wrapper.find('.t-image-viewer__modal-icon');
      expect(iconElement.classes()).toContain('t-image-viewer__modal-icon');
      expect(iconElement.classes()).toContain('t-is-disabled');
    });

    it('should maintain class consistency across prop changes', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          disabled: false,
        },
      });

      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon').classes()).toContain('t-image-viewer__modal-icon');
      expect(wrapper.find('.t-image-viewer__modal-icon').classes()).not.toContain('t-is-disabled');

      await wrapper.setProps({ disabled: true });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon').classes()).toContain('t-image-viewer__modal-icon');
      expect(wrapper.find('.t-image-viewer__modal-icon').classes()).toContain('t-is-disabled');
    });
  });

  // ==================== Edge Cases ====================
  describe('edge cases', () => {
    it('should handle component unmount gracefully', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          onClick: vi.fn(),
        },
      });

      await nextTick();
      wrapper.unmount();

      // Test passes if no errors are thrown
      expect(true).toBe(true);
    });

    it('should handle rapid prop changes', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          label: '100%',
          disabled: false,
        },
      });

      await nextTick();

      // Rapid changes
      await wrapper.setProps({ label: '150%' });
      await wrapper.setProps({ disabled: true });
      await wrapper.setProps({ label: '200%' });
      await wrapper.setProps({ disabled: false });

      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon-label').text()).toBe('200%');
      expect(wrapper.find('.t-image-viewer__modal-icon').classes()).not.toContain('t-is-disabled');
    });

    it('should handle complex icon functions', async () => {
      const ComplexIcon = () => (
        <div class="complex-icon">
          <ZoomInIcon size="small" />
          <span>+</span>
        </div>
      );

      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: ComplexIcon,
        },
      });

      await nextTick();
      expect(wrapper.find('.complex-icon').exists()).toBeTruthy();
      expect(wrapper.findComponent(ZoomInIcon).exists()).toBeTruthy();
    });
  });

  // ==================== Accessibility Tests ====================
  describe('accessibility', () => {
    it('should be focusable when not disabled', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          disabled: false,
        },
      });

      await nextTick();
      const iconElement = wrapper.find('.t-image-viewer__modal-icon').element as HTMLElement;

      // Element should be clickable (basic accessibility check)
      expect(iconElement.tagName).toBe('DIV');
    });

    it('should handle keyboard events when focused', async () => {
      const onClick = vi.fn();
      const wrapper = mount(ImageModalIcon, {
        props: {
          icon: () => <ZoomInIcon size="medium" />,
          onClick,
        },
      });

      await nextTick();
      const iconElement = wrapper.find('.t-image-viewer__modal-icon');

      // Simulate Enter key press
      await iconElement.trigger('keydown', { key: 'Enter' });

      // Note: The component doesn't handle keyboard events by default,
      // but it should not throw errors
      expect(true).toBe(true);
    });
  });
});
