import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { Progress } from 'tdesign-vue-next';

describe('progress', () => {
  describe(':props', () => {
    it('', () => {
      const wrapper = mount(() => <Progress percentage={30} />);
      const progress = wrapper.find('.t-progress');
      expect(progress.exists()).toBeTruthy();
    });

    it(':percentage', () => {
      const wrapper = mount(() => <Progress percentage={30} />);
      const inner = wrapper.find('.t-progress__inner');
      const info = wrapper.find('.t-progress__info');
      expect(inner.exists()).toBeTruthy();
      expect(getComputedStyle(inner.element, null).width).toBe('30%');
      expect(info.exists()).toBeTruthy();
      expect(info.text()).toBe('30%');
    });

    it(':color', () => {
      const wrapper = mount(() => <Progress color="red" percentage={30} />);
      const inner = wrapper.find('.t-progress__inner');
      expect(inner.exists()).toBeTruthy();
      expect(getComputedStyle(inner.element, null).width).toBe('30%');
      expect(getComputedStyle(inner.element, null).background).toBe('red');
    });

    it(':label', () => {
      const wrapper = mount(() => <Progress percentage={30} label="label" />);
      const info = wrapper.find('.t-progress__info');
      expect(info.exists()).toBeTruthy();
      expect(info.text()).toBe('label');
    });

    it(':trackColor', () => {
      const wrapper = mount(() => <Progress percentage={30} trackColor="red" />);
      const bar = wrapper.find('.t-progress__bar');
      expect(getComputedStyle(bar.element, null).background).toBe('red');
    });

    it(':status', () => {
      const statusList = ['success', 'error', 'warning', 'active'];
      statusList.forEach((status) => {
        const wrapper = mount(() => <Progress percentage={30} status={status} />);
        const thin = wrapper.find('.t-progress--thin');
        expect(thin.classes()).toContain(`t-progress--status--${status}`);
      });
    });

    it(':theme', () => {
      const wrapper1 = mount(() => <Progress percentage={30} theme="line" />);
      const thin = wrapper1.find('.t-progress--thin');
      expect(thin.exists()).toBeTruthy();
      const wrapper2 = mount(() => <Progress percentage={30} theme="plump" />);
      const bar = wrapper2.find('.t-progress__bar');
      expect(bar.exists()).toBeTruthy();
      expect(bar.classes()).toContain('t-progress--plump');
      const wrapper3 = mount(() => <Progress percentage={30} theme="circle" />);
      const circle = wrapper3.find('.t-progress--circle');
      const svg = wrapper3.find('.t-progress--circle svg');
      expect(circle.exists()).toBeTruthy();
      expect(svg.exists()).toBeTruthy();
    });

    it(':size', () => {
      const wrapper1 = mount(() => <Progress percentage={30} theme="circle" size="small" />);
      const circle1 = wrapper1.find('.t-progress--circle');
      expect(getComputedStyle(circle1.element, null).width).toBe('72px');
      expect(getComputedStyle(circle1.element, null).height).toBe('72px');
      const wrapper2 = mount(() => <Progress percentage={30} theme="circle" />);
      const circle2 = wrapper2.find('.t-progress--circle');
      expect(getComputedStyle(circle2.element, null).width).toBe('112px');
      expect(getComputedStyle(circle2.element, null).height).toBe('112px');
      const wrapper3 = mount(() => <Progress percentage={30} theme="circle" size="large" />);
      const circle3 = wrapper3.find('.t-progress--circle');
      expect(getComputedStyle(circle3.element, null).width).toBe('160px');
      expect(getComputedStyle(circle3.element, null).height).toBe('160px');
      const wrapper4 = mount(() => <Progress percentage={30} theme="circle" size="50" />);
      const circle4 = wrapper4.find('.t-progress--circle');
      expect(getComputedStyle(circle4.element, null).width).toBe('50px');
      expect(getComputedStyle(circle4.element, null).height).toBe('50px');
    });
  });
});
