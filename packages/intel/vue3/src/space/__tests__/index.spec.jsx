import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { Button, Divider, Space } from 'tdesign-vue-next';

describe('space', () => {
  describe(':props', () => {
    it('', () => {
      const wrapper = mount(() => (
        <Space>
          <Button>按钮</Button>
          <Button>按钮</Button>
          <Button>按钮</Button>
        </Space>
      ));
      expect(wrapper.find('.t-space').exists()).toBeTruthy();
      expect(wrapper.findAll('.t-space-item').length).toBe(3);
    });
    it(':align', () => {
      const alignList = ['start', 'end', 'center', 'baseline'];
      alignList.forEach((align) => {
        const wrapper = mount(() => (
          <Space align={align}>
            <Button>按钮</Button>
            <Button>按钮</Button>
            <Button>按钮</Button>
          </Space>
        ));
        const space = wrapper.find('.t-space');
        expect(space.classes()).toContain(`t-space-align-${align}`);
      });
    });

    it(':direction', () => {
      const directionList = ['vertical', 'horizontal'];
      directionList.forEach((direction) => {
        const wrapper = mount(() => (
          <Space direction={direction}>
            <Button>按钮</Button>
            <Button>按钮</Button>
            <Button>按钮</Button>
          </Space>
        ));
        const space = wrapper.find('.t-space');
        expect(space.classes()).toContain(`t-space-${direction}`);
      });
    });

    it(':breakLine', () => {
      const wrapper = mount(() => (
        <Space breakLine>
          <Button>按钮</Button>
          <Button>按钮</Button>
          <Button>按钮</Button>
        </Space>
      ));
      const space = wrapper.find('.t-space');
      expect(space.element.classList.contains('t-space--break-line')).toBeTruthy();
    });
  });

  it(':size', () => {
    const sizeList = ['small', 'medium', 'large', '50'];
    sizeList.forEach((size, index) => {
      const wrapper = mount(() => (
        <Space size={size}>
          <Button>按钮</Button>
          <Button>按钮</Button>
          <Button>按钮</Button>
        </Space>
      ));
      const space = wrapper.find('.t-space');
      if (index === 0) {
        expect(getComputedStyle(space.element, null).gap).toBe('8px');
      }
      if (index === 1) {
        expect(getComputedStyle(space.element, null).gap).toBe('16px');
      }
      if (index === 2) {
        expect(getComputedStyle(space.element, null).gap).toBe('24px');
      }
      if (index === 3) {
        expect(getComputedStyle(space.element, null).gap).toBe('50');
      }
    });
  });

  it(':separator', () => {
    const slots = {
      separator: () => <Divider layout="vertical" />,
    };
    const wrapper = mount(() => (
      <Space v-slots={slots}>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
      </Space>
    ));
    const space = wrapper.find('.t-space');
    const separators = space.findAll('.t-space-item-separator');
    expect(separators.length).toBe(2);
    expect(separators[0].findComponent(Divider).exists()).toBeTruthy();
    expect(separators[1].findComponent(Divider).exists()).toBeTruthy();
  });
});
