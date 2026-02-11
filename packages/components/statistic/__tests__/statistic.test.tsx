import { nextTick } from 'vue';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { Statistic } from '@tdesign/components';
import componentProps from '@tdesign/components/statistic/props';
import { COLOR_MAP } from '@tdesign/common-js/statistic/utils';

describe('Statistic', () => {
  describe('props', () => {
    let wrapper!: VueWrapper<InstanceType<typeof Statistic>>;

    beforeEach(() => {
      wrapper = mount(<Statistic title="Total Assets" value={82.76} />) as VueWrapper<InstanceType<typeof Statistic>>;
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it(':value[number]', async () => {
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('82.76');
      await wrapper.setProps({ value: 1000 });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('1,000');
      await wrapper.setProps({ value: 0 });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('0');
    });

    it(':title[string]', async () => {
      expect(wrapper.find('.t-statistic-title').exists()).toBe(true);
      expect(wrapper.find('.t-statistic-title').text()).toBe('Total Assets');
      await wrapper.setProps({ title: undefined });
      expect(wrapper.find('.t-statistic-title').exists()).toBe(false);
    });

    it(':title[slot/function]', () => {
      const fnWrapper = mount(<Statistic value={100} title={() => <span class="fn-title">Fn Title</span>} />);
      expect(fnWrapper.find('.fn-title').text()).toBe('Fn Title');
      fnWrapper.unmount();

      const slotWrapper = mount(
        <Statistic value={100} v-slots={{ title: () => <span class="slot-title">Slot Title</span> }} />,
      );
      expect(slotWrapper.find('.slot-title').text()).toBe('Slot Title');
      slotWrapper.unmount();
    });

    it(':unit[string]', async () => {
      expect(wrapper.find('.t-statistic-content-unit').exists()).toBe(false);
      await wrapper.setProps({ unit: 'pcs' });
      expect(wrapper.find('.t-statistic-content-unit').text()).toBe('pcs');
    });

    it(':unit[slot/function]', () => {
      const fnWrapper = mount(<Statistic value={100} unit={() => <span class="fn-unit">%</span>} />);
      expect(fnWrapper.find('.fn-unit').exists()).toBe(true);
      fnWrapper.unmount();

      const slotWrapper = mount(<Statistic value={100} v-slots={{ unit: () => <span class="slot-unit">元</span> }} />);
      expect(slotWrapper.find('.slot-unit').exists()).toBe(true);
      slotWrapper.unmount();
    });

    it(':prefix[string]', async () => {
      expect(wrapper.find('.t-statistic-content-prefix').exists()).toBe(false);
      await wrapper.setProps({ prefix: '$' });
      expect(wrapper.find('.t-statistic-content-prefix').text()).toBe('$');
    });

    it(':prefix[slot/function]', () => {
      const fnWrapper = mount(<Statistic value={100} prefix={() => <span class="fn-prefix">¥</span>} />);
      expect(fnWrapper.find('.fn-prefix').exists()).toBe(true);
      fnWrapper.unmount();

      const slotWrapper = mount(
        <Statistic value={100} v-slots={{ prefix: () => <span class="slot-prefix">→</span> }} />,
      );
      expect(slotWrapper.find('.slot-prefix').exists()).toBe(true);
      slotWrapper.unmount();
    });

    it(':prefix has higher priority than trend', async () => {
      await wrapper.setProps({ prefix: 'Custom', trend: 'increase' });
      expect(wrapper.find('.t-statistic-content-prefix').text()).toBe('Custom');
    });

    it(':suffix[string]', async () => {
      expect(wrapper.find('.t-statistic-content-suffix').exists()).toBe(false);
      await wrapper.setProps({ suffix: 'K' });
      expect(wrapper.find('.t-statistic-content-suffix').text()).toBe('K');
    });

    it(':suffix[slot/function]', () => {
      const fnWrapper = mount(<Statistic value={100} suffix={() => <span class="fn-suffix">万</span>} />);
      expect(fnWrapper.find('.fn-suffix').exists()).toBe(true);
      fnWrapper.unmount();

      const slotWrapper = mount(
        <Statistic value={100} v-slots={{ suffix: () => <span class="slot-suffix">+</span> }} />,
      );
      expect(slotWrapper.find('.slot-suffix').exists()).toBe(true);
      slotWrapper.unmount();
    });

    it(':suffix has higher priority than trend', async () => {
      await wrapper.setProps({ suffix: 'Custom', trend: 'increase', trendPlacement: 'right' });
      expect(wrapper.find('.t-statistic-content-suffix').text()).toBe('Custom');
    });

    it(':extra[string]', async () => {
      expect(wrapper.find('.t-statistic-extra').exists()).toBe(false);
      await wrapper.setProps({ extra: 'Extra Info' });
      expect(wrapper.find('.t-statistic-extra').text()).toBe('Extra Info');
    });

    it(':extra[slot/function]', () => {
      const fnWrapper = mount(<Statistic value={100} extra={() => <div class="fn-extra">Fn Extra</div>} />);
      expect(fnWrapper.find('.fn-extra').exists()).toBe(true);
      fnWrapper.unmount();

      const slotWrapper = mount(
        <Statistic value={100} v-slots={{ extra: () => <div class="slot-extra">Slot Extra</div> }} />,
      );
      expect(slotWrapper.find('.slot-extra').exists()).toBe(true);
      slotWrapper.unmount();
    });

    it(':loading[boolean]', async () => {
      expect(wrapper.find('.t-skeleton').exists()).toBe(false);
      await wrapper.setProps({ loading: true });
      expect(wrapper.find('.t-skeleton').exists()).toBe(true);
    });

    it(':trend[increase/decrease]', async () => {
      const validator = componentProps.trend.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('increase')).toBe(true);
      expect(validator('decrease')).toBe(true);
      // @ts-expect-error test invalid value
      expect(validator('other')).toBe(false);

      await wrapper.setProps({ trend: 'increase' });
      expect(wrapper.find('.t-icon-arrow-triangle-up-filled').exists()).toBe(true);

      await wrapper.setProps({ trend: 'decrease' });
      expect(wrapper.find('.t-icon-arrow-triangle-down-filled').exists()).toBe(true);
    });

    it(':trendPlacement[left/right]', async () => {
      const validator = componentProps.trendPlacement.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('left')).toBe(true);
      expect(validator('right')).toBe(true);
      // @ts-expect-error test invalid value
      expect(validator('center')).toBe(false);

      await wrapper.setProps({ trend: 'increase', trendPlacement: 'left' });
      expect(wrapper.find('.t-statistic-content-prefix').exists()).toBe(true);
      expect(wrapper.find('.t-statistic-content-suffix').exists()).toBe(false);

      await wrapper.setProps({ trendPlacement: 'right' });
      expect(wrapper.find('.t-statistic-content-suffix').exists()).toBe(true);
      expect(wrapper.find('.t-statistic-content-prefix').exists()).toBe(false);
    });

    it(':color[string] preset colors', () => {
      for (const key of Object.keys(COLOR_MAP)) {
        const w = mount(<Statistic value={100} color={key} />);
        const expected = COLOR_MAP[key as keyof typeof COLOR_MAP];
        expect(w.vm.$.exposed?.contentStyle.value).toEqual({ color: expected });
        w.unmount();
      }
    });

    it(':color[string] custom', async () => {
      await wrapper.setProps({ color: '#ff0000' });
      expect(wrapper.find('.t-statistic-content').attributes('style')).toContain('color: rgb(255, 0, 0)');
      await wrapper.setProps({ color: 'yellow' });
      expect(wrapper.find('.t-statistic-content').attributes('style')).toContain('color: yellow');
    });

    it(':separator[string]', async () => {
      await wrapper.setProps({ value: 1234567 });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('1,234,567');
      await wrapper.setProps({ separator: '.' });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('1.234.567');
    });

    it(':decimalPlaces[number]', async () => {
      await wrapper.setProps({ value: 123.45678, decimalPlaces: 3 });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('123.457');
    });

    it(':format[function]', async () => {
      await wrapper.setProps({ format: (value: number) => value * 100, value: 0.85 });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('85');
    });

    it(':animation[object] + :animationStart[boolean]', () => {
      const w = mount(<Statistic value={100} animation={{ duration: 100, valueFrom: 0 }} animationStart={false} />);
      expect(w.find('.t-statistic-content-value').text()).toBe('0');
      w.unmount();
    });
  });

  describe('animation', () => {
    it('animates on mount when animationStart is true', async () => {
      const wrapper = mount(<Statistic value={100} animation={{ duration: 100, valueFrom: 0 }} animationStart />);
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('100');
      wrapper.unmount();
    });

    it('does not animate when animationStart is false', async () => {
      const wrapper = mount(
        <Statistic value={100} animation={{ duration: 100, valueFrom: 0 }} animationStart={false} />,
      );
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('0');
      wrapper.unmount();
    });

    it('starts when animationStart changes to true', async () => {
      const wrapper = mount(
        <Statistic value={100} animation={{ duration: 100, valueFrom: 0 }} animationStart={false} />,
      );
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('0');
      await wrapper.setProps({ animationStart: true });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('100');
      wrapper.unmount();
    });

    it('does not re-trigger if tween already exists', async () => {
      const wrapper = mount(<Statistic value={100} animation={{ duration: 100, valueFrom: 0 }} animationStart />);
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 200));
      await wrapper.setProps({ animationStart: false });
      await wrapper.setProps({ animationStart: true });
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('100');
      wrapper.unmount();
    });

    it('does not animate when from equals to', async () => {
      const wrapper = mount(<Statistic value={0} animation={{ duration: 100, valueFrom: 0 }} animationStart />);
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('0');
      wrapper.unmount();
    });

    it('stops and restarts on value change', async () => {
      const wrapper = mount(<Statistic value={100} animation={{ duration: 100, valueFrom: 0 }} animationStart />);
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();
      await wrapper.setProps({ value: 200 });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('200');
      wrapper.unmount();
    });

    it('updates value directly without animationStart', async () => {
      const wrapper = mount(
        <Statistic value={100} animation={{ duration: 100, valueFrom: 0 }} animationStart={false} />,
      );
      await wrapper.setProps({ value: 200 });
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('200');
      wrapper.unmount();
    });

    it('handles animation without valueFrom', async () => {
      const wrapper = mount(
        // @ts-expect-error testing animation without valueFrom
        <Statistic value={50} animation={{ duration: 100 }} animationStart />,
      );
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('50');
      wrapper.unmount();
    });
  });

  describe('instanceFunctions', () => {
    it('start', async () => {
      const wrapper = mount(
        <Statistic value={100} animation={{ duration: 100, valueFrom: 0 }} animationStart={false} />,
      );
      await nextTick();
      wrapper.vm.$.exposed?.start();
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('100');
      wrapper.unmount();
    });

    it('start with custom from/to', async () => {
      const wrapper = mount(
        <Statistic value={100} animation={{ duration: 100, valueFrom: 0 }} animationStart={false} />,
      );
      await nextTick();
      wrapper.vm.$.exposed?.start(10, 50);
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('50');
      wrapper.unmount();
    });

    it('contentStyle', () => {
      const wrapper = mount(<Statistic value={100} color="red" />);
      expect(wrapper.vm.$.exposed?.contentStyle.value).toEqual({ color: 'var(--td-error-color)' });
      wrapper.unmount();
    });
  });
});
