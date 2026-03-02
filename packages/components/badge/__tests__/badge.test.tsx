import { mount } from '@vue/test-utils';
import { it, expect } from 'vitest';
import Badge from '@tdesign/components/badge';

describe('Badge', () => {
  describe('props', () => {
    it('content[string]', () => {
      const wrapper = mount(() => <Badge content="Tdesign"></Badge>);
      expect(wrapper.text()).toBe('Tdesign');
    });

    it('content[function]', () => {
      const wrapper = mount(() => <Badge content={() => 'Tdesign'}></Badge>);
      expect(wrapper.text()).toBe('Tdesign');
    });

    it('content[slot]', () => {
      const wrapper = mount(Badge, {
        slots: {
          content: <div class="text">Tdesign</div>,
        },
      });
      const text = wrapper.find('.text');
      expect(text.exists()).toBeTruthy();
      expect(text.text()).toBe('Tdesign');
    });

    it('color[string]', () => {
      const wrapper = mount(() => (
        <Badge color="green" count={99}>
          Tdesign
        </Badge>
      ));
      const badge = wrapper.find('.t-badge');
      const circle = badge.find('.t-badge--circle');
      expect(badge.exists()).toBeTruthy();
      expect(circle.exists()).toBeTruthy();
      expect(getComputedStyle(circle.element, null).background).toBe('green');
    });

    it('count[number]', () => {
      const wrapper = mount(<Badge count={2}>Tdesign</Badge>);
      const badge = wrapper.find('.t-badge');
      const circle = badge.find('.t-badge--circle');
      expect(circle.exists()).toBeTruthy();
      expect(circle.text()).toBe('2');
    });

    it('default[string]', () => {
      const wrapper = mount(() => <Badge default="Tdesign"></Badge>);
      expect(wrapper.text()).toBe('Tdesign');
    });

    it('default[function]', () => {
      const wrapper = mount(() => <Badge default={() => 'Tdesign'}></Badge>);
      expect(wrapper.text()).toBe('Tdesign');
    });

    it('default[slot]', () => {
      const wrapper = mount(() => <Badge>Tdesign</Badge>);
      expect(wrapper.text()).toBe('Tdesign');
    });

    it('dot[true]', () => {
      const wrapper = mount(
        <Badge dot count={2}>
          Tdesign
        </Badge>,
      );
      const dot = wrapper.find('.t-badge--dot');
      expect(dot.exists()).toBeTruthy();
    });

    it(':dot[false]', () => {
      const wrapper = mount(
        <Badge dot={false} count={99}>
          Tdesign
        </Badge>,
      );
      const circle = wrapper.find('.t-badge--circle');
      expect(circle.exists()).toBeTruthy();
      expect(circle.text()).toBe('99');
    });

    it('maxCount[number]', () => {
      const wrapper = mount(
        <Badge maxCount={10} count={20}>
          Tdesign
        </Badge>,
      );
      const circle = wrapper.find('.t-badge--circle');
      expect(circle.exists()).toBeTruthy();
      expect(circle.text()).toBe('10+');
    });

    it('size[small]', () => {
      const wrapper = mount(
        <Badge size="small" count={2}>
          Tdesign
        </Badge>,
      );
      const circle = wrapper.find('.t-badge--circle');
      expect(circle.exists()).toBeTruthy();
      expect(circle.classes()).toContain('t-size-s');
    });

    it('shape[circle/round]', () => {
      const wrapper = mount(
        <Badge shape="round" count={2}>
          Tdesign
        </Badge>,
      );
      const round = wrapper.find('.t-badge--round');
      expect(round.exists()).toBeTruthy();

      const wrapper1 = mount(
        <Badge shape="circle" count={2}>
          Tdesign
        </Badge>,
      );
      const circle = wrapper1.find('.t-badge--circle');
      expect(circle.exists()).toBeTruthy();
    });

    it('showZero[true]', () => {
      const wrapper = mount(
        <Badge showZero count={0}>
          Tdesign
        </Badge>,
      );
      const circle = wrapper.find('.t-badge--circle');
      expect(circle.exists()).toBeTruthy();
      expect(circle.text()).toBe('0');
    });

    it('showZero={false}', () => {
      const wrapper = mount(
        <Badge showZero={false} count={0}>
          Tdesign
        </Badge>,
      );
      const badge = wrapper.find('.t-badge');
      const circle = badge.find('.t-badge--circle');
      expect(circle.exists()).toBeFalsy();
    });

    it('offset[number,number]', () => {
      const wrapper = mount(
        <Badge offset={[10, 10]} count={2}>
          Tdesign
        </Badge>,
      );
      const circle = wrapper.find('.t-badge--circle');
      expect(circle.exists()).toBeTruthy();
      expect(getComputedStyle(circle.element, null).top).toBe('10px');
      expect(getComputedStyle(circle.element, null).right).toBe('10px');
    });

    it('offset[string,string]', () => {
      const wrapper = mount(
        <Badge offset={['10px', '20px']} count={2}>
          Tdesign
        </Badge>,
      );
      const circle = wrapper.find('.t-badge--circle');
      expect(circle.exists()).toBeTruthy();
      expect(getComputedStyle(circle.element, null).top).toBe('20px');
      expect(getComputedStyle(circle.element, null).right).toBe('10px');
    });

    it('offset[negative values,negative values]', () => {
      const wrapper = mount(
        <Badge offset={[-10, -20]} count={2}>
          Tdesign
        </Badge>,
      );
      const circle = wrapper.find('.t-badge--circle');
      expect(circle.exists()).toBeTruthy();
      expect(getComputedStyle(circle.element, null).top).toBe('-20px');
      expect(getComputedStyle(circle.element, null).right).toBe('-10px');
    });
  });
});
