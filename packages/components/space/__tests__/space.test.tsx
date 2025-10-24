import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, describe, it, beforeEach } from 'vitest';
import { Space, Button } from '@tdesign/components';

describe('Space', () => {
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof Space>> | null = null;

    beforeEach(() => {
      wrapper = mount(
        <Space>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Space>,
      ) as VueWrapper<InstanceType<typeof Space>>;
    });

    it(':align', async () => {
      expect(wrapper.find('.t-space').classes()).not.toContain('t-space-align-start');

      await wrapper.setProps({ align: 'start' });
      expect(wrapper.find('.t-space').classes()).toContain('t-space-align-start');

      await wrapper.setProps({ align: 'end' });
      expect(wrapper.find('.t-space').classes()).toContain('t-space-align-end');

      await wrapper.setProps({ align: 'center' });
      expect(wrapper.find('.t-space').classes()).toContain('t-space-align-center');

      await wrapper.setProps({ align: 'baseline' });
      expect(wrapper.find('.t-space').classes()).toContain('t-space-align-baseline');
    });

    it(':breakLine', async () => {
      expect(wrapper.find('.t-space').classes()).not.toContain('t-space--break-line');

      await wrapper.setProps({ breakLine: true });
      expect(wrapper.find('.t-space').classes()).toContain('t-space--break-line');

      await wrapper.setProps({ breakLine: false });
      expect(wrapper.find('.t-space').classes()).not.toContain('t-space--break-line');
    });

    it(':direction', async () => {
      expect(wrapper.find('.t-space').classes()).toContain('t-space-horizontal');

      await wrapper.setProps({ direction: 'vertical' });
      expect(wrapper.find('.t-space').classes()).toContain('t-space-vertical');

      await wrapper.setProps({ direction: 'horizontal' });
      expect(wrapper.find('.t-space').classes()).toContain('t-space-horizontal');
    });

    it(':separator[string]', async () => {
      expect(wrapper.findAll('.t-space-item-separator').length).toBe(0);

      await wrapper.setProps({ separator: '|' });
      const separators = wrapper.findAll('.t-space-item-separator');
      expect(separators.length).toBe(1);
      expect(separators[0].text()).toBe('|');
    });

    it(':separator[function]', async () => {
      const separatorFn = () => <span class="custom-separator">-</span>;
      await wrapper.setProps({ separator: separatorFn });

      const separators = wrapper.findAll('.t-space-item-separator');
      expect(separators.length).toBe(1);
      expect(wrapper.find('.custom-separator').exists()).toBe(true);
    });

    it(':size[string:small]', async () => {
      await wrapper.setProps({ size: 'small' });
      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.gap).toBe('8px');
    });

    it(':size[string:medium]', async () => {
      await wrapper.setProps({ size: 'medium' });
      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.gap).toBe('16px');
    });

    it(':size[string:large]', async () => {
      await wrapper.setProps({ size: 'large' });
      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.gap).toBe('24px');
    });

    it(':size[string:custom]', async () => {
      await wrapper.setProps({ size: '32px' });
      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.gap).toBe('32px');
    });

    it(':size[number]', async () => {
      await wrapper.setProps({ size: 20 });
      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.gap).toBe('20px');
    });

    it(':size[array]', async () => {
      await wrapper.setProps({ size: ['10px', '20px'] });
      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.gap).toBe('10px 20px');
    });

    it(':size[array with number]', async () => {
      await wrapper.setProps({ size: [10, 20] });
      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.gap).toBe('10px 20px');
    });

    it(':size[array with size enum]', async () => {
      await wrapper.setProps({ size: ['small', 'large'] });
      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.gap).toBe('8px 24px');
    });

    it(':forceFlexGapPolyfill', async () => {
      expect(wrapper.find('.t-space').classes()).not.toContain('t-space--polyfill');

      await wrapper.setProps({ forceFlexGapPolyfill: true });
      expect(wrapper.find('.t-space').classes()).toContain('t-space--polyfill');
    });
  });

  describe('slots', () => {
    it('default slot', async () => {
      const wrapper = mount(
        <Space>
          <div class="custom-item-1">Item 1</div>
          <div class="custom-item-2">Item 2</div>
          <div class="custom-item-3">Item 3</div>
        </Space>,
      );

      expect(wrapper.findAll('.t-space-item').length).toBe(3);
      expect(wrapper.find('.custom-item-1').exists()).toBe(true);
      expect(wrapper.find('.custom-item-2').exists()).toBe(true);
      expect(wrapper.find('.custom-item-3').exists()).toBe(true);
    });

    it('separator slot', async () => {
      const wrapper = mount(Space, {
        slots: {
          default: () => (
            <>
              <Button>Button 1</Button>
              <Button>Button 2</Button>
              <Button>Button 3</Button>
            </>
          ),
          separator: () => <span class="custom-separator">|</span>,
        },
      });

      const separators = wrapper.findAll('.t-space-item-separator');
      expect(separators.length).toBe(2);
      expect(wrapper.findAll('.custom-separator').length).toBe(2);
    });
  });

  describe('functionality', () => {
    it('should render correct number of items', async () => {
      const wrapper = mount(
        <Space>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          <Button>Button 4</Button>
        </Space>,
      );

      expect(wrapper.findAll('.t-space-item').length).toBe(4);
    });

    it('should not render separator for last item', async () => {
      const wrapper = mount(
        <Space separator="|">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </Space>,
      );

      const items = wrapper.findAll('.t-space-item');
      const separators = wrapper.findAll('.t-space-item-separator');

      expect(items.length).toBe(3);
      expect(separators.length).toBe(2);
    });

    it('should apply align class correctly', async () => {
      const wrapper = mount(
        <Space align="center">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Space>,
      );

      expect(wrapper.find('.t-space-align-center').exists()).toBe(true);
    });

    it('should apply direction class correctly', async () => {
      const wrapper = mount(
        <Space direction="vertical">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Space>,
      );

      expect(wrapper.find('.t-space-vertical').exists()).toBe(true);
    });

    it('should apply breakLine class when breakLine is true', async () => {
      const wrapper = mount(
        <Space breakLine>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Space>,
      );

      expect(wrapper.find('.t-space--break-line').exists()).toBe(true);
    });

    it('should handle empty children', async () => {
      const wrapper = mount(Space, {
        slots: {
          default: () => null,
        },
      });

      expect(wrapper.find('.t-space').exists()).toBe(true);
      expect(wrapper.findAll('.t-space-item').length).toBe(0);
    });

    it('should handle single child', async () => {
      const wrapper = mount(
        <Space separator="|">
          <Button>Button 1</Button>
        </Space>,
      );

      expect(wrapper.findAll('.t-space-item').length).toBe(1);
      expect(wrapper.findAll('.t-space-item-separator').length).toBe(0);
    });

    it('should handle nested components', async () => {
      const wrapper = mount(
        <Space>
          <Space>
            <Button>Nested 1</Button>
            <Button>Nested 2</Button>
          </Space>
          <Button>Button 1</Button>
        </Space>,
      );

      expect(wrapper.findAll('.t-space').length).toBe(2);
    });

    it('should apply polyfill class when forceFlexGapPolyfill is true', async () => {
      const wrapper = mount(
        <Space forceFlexGapPolyfill size="medium">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Space>,
      );

      expect(wrapper.find('.t-space--polyfill').exists()).toBe(true);
      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.getPropertyValue('--td-space-column-gap')).toBe('16px');
      expect(spaceElement.style.getPropertyValue('--td-space-row-gap')).toBe('16px');
    });

    it('should handle array size with polyfill', async () => {
      const wrapper = mount(
        <Space forceFlexGapPolyfill size={['10px', '20px']}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Space>,
      );

      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.getPropertyValue('--td-space-column-gap')).toBe('10px');
      expect(spaceElement.style.getPropertyValue('--td-space-row-gap')).toBe('20px');
    });
  });

  describe('internal logic', () => {
    it('should calculate gap correctly for string size', async () => {
      const sizeMap = {
        small: '8px',
        medium: '16px',
        large: '24px',
      };

      for (const [size, expectedGap] of Object.entries(sizeMap)) {
        const wrapper = mount(
          <Space size={size as any}>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </Space>,
        );

        const spaceElement = wrapper.find('.t-space').element as HTMLElement;
        expect(spaceElement.style.gap).toBe(expectedGap);
      }
    });

    it('should calculate gap correctly for number size', async () => {
      const sizes = [10, 20, 30, 40];

      for (const size of sizes) {
        const wrapper = mount(
          <Space size={size}>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </Space>,
        );

        const spaceElement = wrapper.find('.t-space').element as HTMLElement;
        expect(spaceElement.style.gap).toBe(`${size}px`);
      }
    });

    it('should calculate gap correctly for array size', async () => {
      const wrapper = mount(
        <Space size={[15, 25]}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Space>,
      );

      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.gap).toBe('15px 25px');
    });

    it('should handle mixed array size types', async () => {
      const wrapper = mount(
        <Space size={['small', 20, 'large'] as any}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Space>,
      );

      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.gap).toBe('8px 20px 24px');
    });

    it('should render separator between items correctly', async () => {
      const wrapper = mount(
        <Space separator="-">
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </Space>,
      );

      const items = wrapper.findAll('.t-space-item');
      const separators = wrapper.findAll('.t-space-item-separator');

      expect(items.length).toBe(3);
      expect(separators.length).toBe(2);

      const allChildren = wrapper.find('.t-space').element.children;
      expect(allChildren[0].classList.contains('t-space-item')).toBe(true);
      expect(allChildren[1].classList.contains('t-space-item-separator')).toBe(true);
      expect(allChildren[2].classList.contains('t-space-item')).toBe(true);
      expect(allChildren[3].classList.contains('t-space-item-separator')).toBe(true);
      expect(allChildren[4].classList.contains('t-space-item')).toBe(true);
    });

    it('should apply CSS variables for polyfill mode', async () => {
      const wrapper = mount(
        <Space forceFlexGapPolyfill size={[12, 18]}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Space>,
      );

      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.getPropertyValue('--td-space-column-gap')).toBe('12px');
      expect(spaceElement.style.getPropertyValue('--td-space-row-gap')).toBe('18px');
    });

    it('should combine multiple classes correctly', async () => {
      const wrapper = mount(
        <Space direction="vertical" align="center" breakLine>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Space>,
      );

      const spaceClasses = wrapper.find('.t-space').classes();
      expect(spaceClasses).toContain('t-space');
      expect(spaceClasses).toContain('t-space-vertical');
      expect(spaceClasses).toContain('t-space-align-center');
      expect(spaceClasses).toContain('t-space--break-line');
    });

    it('should handle size conversion for enum values', async () => {
      const wrapper = mount(
        <Space size={['small', 'medium', 'large'] as any}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Space>,
      );

      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.gap).toBe('8px 16px 24px');
    });

    it('should handle custom string size', async () => {
      const wrapper = mount(
        <Space size="50px">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Space>,
      );

      const spaceElement = wrapper.find('.t-space').element as HTMLElement;
      expect(spaceElement.style.gap).toBe('50px');
    });
  });
});
