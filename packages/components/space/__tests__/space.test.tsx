// @ts-nocheck
import { getSpaceDefaultMount } from './mount';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { Space, Button, Divider } from '@tdesign/components';

describe('Space Component', () => {
  ['start', 'end', 'center', 'baseline'].forEach((item) => {
    it(`props.align is equal to ${item}`, () => {
      const wrapper = getSpaceDefaultMount({ align: item });
      expect(wrapper.classes(`t-space-align-${item}`)).toBeTruthy();
    });
  });

  it('props.breakLine works fine', () => {
    // breakLine default value is false
    const wrapper1 = getSpaceDefaultMount();
    expect(wrapper1.classes('t-space--break-line')).toBeFalsy();
    // breakLine = true
    const wrapper2 = getSpaceDefaultMount({ breakLine: true });
    expect(wrapper2.classes('t-space--break-line')).toBeTruthy();
    // breakLine = false
    const wrapper3 = getSpaceDefaultMount({ breakLine: false });
    expect(wrapper3.classes('t-space--break-line')).toBeFalsy();
  });

  ['vertical', 'horizontal'].forEach((item) => {
    it(`props.direction is equal to ${item}`, () => {
      const wrapper = getSpaceDefaultMount({ direction: item });
      expect(wrapper.classes(`t-space-${item}`)).toBeTruthy();
    });
  });

  it('props.separator works fine', () => {
    const wrapper = getSpaceDefaultMount({ separator: () => <span class="custom-node">TNode</span> });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.separator works fine', () => {
    const wrapper = getSpaceDefaultMount({
      'v-slots': { separator: () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it(`props.size is equal to 'small'`, () => {
    const wrapper = getSpaceDefaultMount({ size: 'small' });
    const domWrapper = wrapper.findComponent(Space);
    expect(domWrapper.element.style.gap).toBe('8px');
  });
  it(`props.size is equal to 'large'`, () => {
    const wrapper = getSpaceDefaultMount({ size: 'large' });
    const domWrapper = wrapper.findComponent(Space);
    expect(domWrapper.element.style.gap).toBe('24px');
  });
  it(`props.size is equal to '38px'`, () => {
    const wrapper = getSpaceDefaultMount({ size: '38px' });
    const domWrapper = wrapper.findComponent(Space);
    expect(domWrapper.element.style.gap).toBe('38px');
  });
  it(`props.size is equal to ['20px', '80px']`, () => {
    const wrapper = getSpaceDefaultMount({ size: ['20px', '80px'] });
    const domWrapper = wrapper.findComponent(Space);
    expect(domWrapper.element.style.gap).toBe('20px 80px');
  });
});

describe('Space', () => {
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
