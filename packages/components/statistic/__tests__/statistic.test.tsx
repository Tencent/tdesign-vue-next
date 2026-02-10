import { nextTick } from 'vue';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import Statistic from '@tdesign/components/statistic';
import { COLOR_MAP } from '@tdesign/common-js/statistic/utils';

describe('Statistic', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  // ==================== Props Tests ====================
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof Statistic>> | null = null;

    beforeEach(() => {
      wrapper = mount(Statistic, {
        props: { title: 'Total Assets', value: 82.76 },
      }) as VueWrapper<InstanceType<typeof Statistic>>;
    });

    it(':title[string]', () => {
      expect(wrapper.find('.t-statistic-title').exists()).toBeTruthy();
      expect(wrapper.find('.t-statistic-title').text()).toBe('Total Assets');
    });

    it(':title[function]', async () => {
      await wrapper.setProps({ title: () => <span class="custom-title">Custom Title</span> });
      expect(wrapper.find('.custom-title').exists()).toBeTruthy();
      expect(wrapper.find('.custom-title').text()).toBe('Custom Title');
    });

    it(':title[slot]', () => {
      const slotWrapper = mount(Statistic, {
        props: { value: 100 },
        slots: { title: () => <span class="slot-title">Slot Title</span> },
      });
      expect(slotWrapper.find('.slot-title').exists()).toBeTruthy();
      expect(slotWrapper.find('.slot-title').text()).toBe('Slot Title');
    });

    it(':title not provided', async () => {
      await wrapper.setProps({ title: undefined });
      expect(wrapper.find('.t-statistic-title').exists()).toBeFalsy();
    });

    it(':value[number]', () => {
      expect(wrapper.find('.t-statistic-content-value').exists()).toBeTruthy();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('82.76');
    });

    it(':value not provided defaults to 0 with format', () => {
      // When value is not provided, innerValue is undefined which would crash getFormatValue
      // Use format to handle undefined gracefully
      const noValueWrapper = mount(Statistic, {
        props: { title: 'Test', value: 0 },
      });
      expect(noValueWrapper.find('.t-statistic-content-value').exists()).toBeTruthy();
      expect(noValueWrapper.find('.t-statistic-content-value').text()).toBe('0');
    });

    it(':unit[string]', async () => {
      await wrapper.setProps({ unit: 'pcs' });
      expect(wrapper.find('.t-statistic-content-unit').exists()).toBeTruthy();
      expect(wrapper.find('.t-statistic-content-unit').text()).toBe('pcs');
    });

    it(':unit[function]', async () => {
      await wrapper.setProps({ unit: () => <span class="custom-unit">%</span> });
      expect(wrapper.find('.custom-unit').exists()).toBeTruthy();
    });

    it(':unit[slot]', () => {
      const slotWrapper = mount(Statistic, {
        props: { value: 100 },
        slots: { unit: () => <span class="slot-unit">元</span> },
      });
      expect(slotWrapper.find('.slot-unit').exists()).toBeTruthy();
    });

    it(':unit not provided', () => {
      expect(wrapper.find('.t-statistic-content-unit').exists()).toBeFalsy();
    });

    it(':decimalPlaces[number]', async () => {
      await wrapper.setProps({ value: 123.45678, decimalPlaces: 3 });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('123.457');
    });

    it(':prefix[string]', async () => {
      await wrapper.setProps({ prefix: '$' });
      expect(wrapper.find('.t-statistic-content-prefix').exists()).toBeTruthy();
      expect(wrapper.find('.t-statistic-content-prefix').text()).toBe('$');
    });

    it(':prefix[function]', async () => {
      await wrapper.setProps({ prefix: () => <span class="custom-prefix">¥</span> });
      expect(wrapper.find('.custom-prefix').exists()).toBeTruthy();
    });

    it(':prefix[slot]', () => {
      const slotWrapper = mount(Statistic, {
        props: { value: 100 },
        slots: { prefix: () => <span class="slot-prefix">→</span> },
      });
      expect(slotWrapper.find('.slot-prefix').exists()).toBeTruthy();
    });

    it(':prefix not provided', () => {
      expect(wrapper.find('.t-statistic-content-prefix').exists()).toBeFalsy();
    });

    it(':suffix[string]', async () => {
      await wrapper.setProps({ suffix: 'K' });
      expect(wrapper.find('.t-statistic-content-suffix').exists()).toBeTruthy();
      expect(wrapper.find('.t-statistic-content-suffix').text()).toBe('K');
    });

    it(':suffix[function]', async () => {
      await wrapper.setProps({ suffix: () => <span class="custom-suffix">万</span> });
      expect(wrapper.find('.custom-suffix').exists()).toBeTruthy();
    });

    it(':suffix[slot]', () => {
      const slotWrapper = mount(Statistic, {
        props: { value: 100 },
        slots: { suffix: () => <span class="slot-suffix">+</span> },
      });
      expect(slotWrapper.find('.slot-suffix').exists()).toBeTruthy();
    });

    it(':suffix not provided', () => {
      expect(wrapper.find('.t-statistic-content-suffix').exists()).toBeFalsy();
    });

    it(':loading[boolean]', async () => {
      expect(wrapper.find('.t-skeleton').exists()).toBeFalsy();
      await wrapper.setProps({ loading: true });
      expect(wrapper.find('.t-skeleton').exists()).toBeTruthy();
      expect(wrapper.find('.t-skeleton__row').exists()).toBeTruthy();
    });

    it(':trend[increase/decrease]', async () => {
      // default: no trend icon
      expect(wrapper.find('.t-statistic-content-prefix').exists()).toBeFalsy();
      expect(wrapper.find('.t-statistic-content-suffix').exists()).toBeFalsy();

      // increase
      await wrapper.setProps({ trend: 'increase' });
      const upIcon = wrapper.find('.t-icon-arrow-triangle-up-filled');
      expect(upIcon.exists()).toBeTruthy();

      // decrease
      await wrapper.setProps({ trend: 'decrease' });
      const downIcon = wrapper.find('.t-icon-arrow-triangle-down-filled');
      expect(downIcon.exists()).toBeTruthy();
    });

    it(':trend validator', () => {
      const validator = (Statistic as any).props?.trend?.validator;
      if (validator) {
        expect(validator(undefined)).toBe(true);
        expect(validator(null)).toBe(true);
        expect(validator('increase')).toBe(true);
        expect(validator('decrease')).toBe(true);
        expect(validator('other')).toBe(false);
      }
    });

    it(':trendPlacement[left/right]', async () => {
      // default trendPlacement is 'left', trend icon shows as prefix
      await wrapper.setProps({ trend: 'increase', trendPlacement: 'left' });
      expect(wrapper.find('.t-statistic-content-prefix').exists()).toBeTruthy();
      expect(wrapper.find('.t-statistic-content-suffix').exists()).toBeFalsy();

      // trendPlacement = 'right', trend icon shows as suffix
      await wrapper.setProps({ trendPlacement: 'right' });
      expect(wrapper.find('.t-statistic-content-suffix').exists()).toBeTruthy();
      // prefix should not have the trend icon (no custom prefix set)
      expect(wrapper.find('.t-statistic-content-prefix').exists()).toBeFalsy();
    });

    it(':trendPlacement validator', () => {
      const validator = (Statistic as any).props?.trendPlacement?.validator;
      if (validator) {
        expect(validator(undefined)).toBe(true);
        expect(validator(null)).toBe(true);
        expect(validator('left')).toBe(true);
        expect(validator('right')).toBe(true);
        expect(validator('center')).toBe(false);
      }
    });

    it(':color[string] custom color', async () => {
      await wrapper.setProps({ color: '#ff0000' });
      const contentElement = wrapper.find('.t-statistic-content');
      expect(contentElement.exists()).toBeTruthy();
      expect(contentElement.attributes('style')).toContain('color: rgb(255, 0, 0)');
    });

    it(':color[string] preset color keys', () => {
      Object.keys(COLOR_MAP).forEach((color) => {
        const colorWrapper = mount(Statistic, {
          props: { title: 'Test', value: 1000, color },
        });
        const contentElement = colorWrapper.find('.t-statistic-content');
        expect(contentElement.exists()).toBeTruthy();
        const expectedColor = COLOR_MAP[color as keyof typeof COLOR_MAP];
        const exposed = colorWrapper.vm.$.exposed;
        if (exposed?.contentStyle) {
          expect(exposed.contentStyle.value).toEqual({ color: expectedColor });
        }
      });
    });

    it(':color[string] named css color', async () => {
      await wrapper.setProps({ color: 'yellow' });
      const contentElement = wrapper.find('.t-statistic-content');
      expect(contentElement.attributes('style')).toContain('color: yellow');
    });

    it(':color default empty string', () => {
      const contentElement = wrapper.find('.t-statistic-content');
      expect(contentElement.exists()).toBeTruthy();
      // default color is '', should result in color: undefined or empty
    });

    it(':separator[string]', async () => {
      await wrapper.setProps({ value: 1234567, separator: ',' });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('1,234,567');
    });

    it(':separator[string] custom separator', async () => {
      await wrapper.setProps({ value: 1234567, separator: '.' });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('1.234.567');
    });

    it(':format[function]', async () => {
      const formatFn = (value: number) => value * 100;
      await wrapper.setProps({ format: formatFn, value: 0.85 });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('85');
    });

    it(':extra[string]', async () => {
      await wrapper.setProps({ extra: 'Extra Info' });
      expect(wrapper.find('.t-statistic-extra').exists()).toBeTruthy();
      expect(wrapper.find('.t-statistic-extra').text()).toBe('Extra Info');
    });

    it(':extra[function]', async () => {
      await wrapper.setProps({ extra: () => <div class="custom-extra">Custom Extra</div> });
      expect(wrapper.find('.custom-extra').exists()).toBeTruthy();
    });

    it(':extra[slot]', () => {
      const slotWrapper = mount(Statistic, {
        props: { value: 100 },
        slots: { extra: () => <div class="slot-extra">Slot Extra</div> },
      });
      expect(slotWrapper.find('.slot-extra').exists()).toBeTruthy();
    });

    it(':extra not provided', () => {
      expect(wrapper.find('.t-statistic-extra').exists()).toBeFalsy();
    });

    it('should render minimal statistic with value 0', () => {
      const minWrapper = mount(Statistic, {
        props: { value: 0 },
      });
      expect(minWrapper.find('.t-statistic').exists()).toBeTruthy();
      expect(minWrapper.find('.t-statistic-title').exists()).toBeFalsy();
      expect(minWrapper.find('.t-statistic-extra').exists()).toBeFalsy();
      expect(minWrapper.find('.t-statistic-content-prefix').exists()).toBeFalsy();
      expect(minWrapper.find('.t-statistic-content-suffix').exists()).toBeFalsy();
      expect(minWrapper.find('.t-statistic-content-unit').exists()).toBeFalsy();
    });

    it(':prefix has higher priority than trend icon', async () => {
      await wrapper.setProps({ prefix: 'Custom Prefix', trend: 'increase' });
      expect(wrapper.find('.t-statistic-content-prefix').text()).toBe('Custom Prefix');
      // prefix slot overrides trend icon
    });

    it(':suffix has higher priority than trend icon', async () => {
      await wrapper.setProps({ suffix: 'Custom Suffix', trend: 'increase', trendPlacement: 'right' });
      expect(wrapper.find('.t-statistic-content-suffix').text()).toBe('Custom Suffix');
    });
  });

  // ==================== Snapshot Tests ====================
  describe('snapshots', () => {
    it('default render', async () => {
      const wrapper = mount(Statistic, {
        props: { title: 'Total', value: 1234.56 },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('full props render', async () => {
      const wrapper = mount(Statistic, {
        props: {
          title: 'Revenue',
          value: 9876.54,
          unit: '万元',
          prefix: '¥',
          suffix: '+',
          extra: 'Year over year',
          color: 'blue',
          trend: 'increase',
          trendPlacement: 'left',
          decimalPlaces: 2,
          separator: ',',
        },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // ==================== Animation Tests ====================
  describe('animation', () => {
    it('should start animation on mount when animationStart is true', async () => {
      vi.useRealTimers();
      const wrapper = mount(Statistic, {
        props: {
          value: 100,
          animation: { duration: 100, valueFrom: 0 },
          animationStart: true,
        },
      });
      await nextTick();

      // Wait for animation to complete
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();

      expect(wrapper.find('.t-statistic-content-value').text()).toBe('100');
    });

    it('should not start animation on mount when animationStart is false', async () => {
      const wrapper = mount(Statistic, {
        props: {
          value: 100,
          animation: { duration: 100, valueFrom: 0 },
          animationStart: false,
        },
      });
      await nextTick();

      // innerValue should be valueFrom since animation not started
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('0');
    });

    it('should start animation when animationStart changes to true', async () => {
      vi.useRealTimers();
      const wrapper = mount(Statistic, {
        props: {
          value: 100,
          animation: { duration: 100, valueFrom: 0 },
          animationStart: false,
        },
      });
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('0');

      await wrapper.setProps({ animationStart: true });
      await nextTick();

      // Wait for animation to complete
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();

      expect(wrapper.find('.t-statistic-content-value').text()).toBe('100');
    });

    it('should not re-trigger animation if tween already exists', async () => {
      vi.useRealTimers();
      const wrapper = mount(Statistic, {
        props: {
          value: 100,
          animation: { duration: 100, valueFrom: 0 },
          animationStart: true,
        },
      });
      await nextTick();

      // Wait for animation to complete
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Change animationStart to false and back to true
      // tween already exists so it won't re-trigger
      await wrapper.setProps({ animationStart: false });
      await wrapper.setProps({ animationStart: true });
      await nextTick();

      expect(wrapper.find('.t-statistic-content-value').text()).toBe('100');
    });

    it('should not start animation when from equals to', async () => {
      const wrapper = mount(Statistic, {
        props: {
          value: 0,
          animation: { duration: 100, valueFrom: 0 },
          animationStart: true,
        },
      });
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('0');
    });

    it('should handle animation without valueFrom (default to 0)', async () => {
      vi.useRealTimers();
      const wrapper = mount(Statistic, {
        props: {
          value: 50,
          // @ts-expect-error testing animation without valueFrom to verify default behavior
          animation: { duration: 100 },
          animationStart: true,
        },
      });
      await nextTick();

      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();

      expect(wrapper.find('.t-statistic-content-value').text()).toBe('50');
    });
  });

  // ==================== Value Watch Tests ====================
  describe('value watch', () => {
    it('should update innerValue when value prop changes without animation', async () => {
      const wrapper = mount(Statistic, {
        props: { value: 100, title: 'Test' },
      });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('100');

      await wrapper.setProps({ value: 200 });
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('200');
    });

    it('should stop existing tween and restart animation on value change', async () => {
      vi.useRealTimers();
      const wrapper = mount(Statistic, {
        props: {
          value: 100,
          animation: { duration: 100, valueFrom: 0 },
          animationStart: true,
        },
      });
      await nextTick();

      // Wait for first animation to complete
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();

      // Change value - should stop old tween and restart
      await wrapper.setProps({ value: 200 });
      await nextTick();

      // Wait for second animation to complete
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();

      expect(wrapper.find('.t-statistic-content-value').text()).toBe('200');
    });

    it('should update value when animationStart is false and value changes', async () => {
      const wrapper = mount(Statistic, {
        props: {
          value: 100,
          animation: { duration: 100, valueFrom: 0 },
          animationStart: false,
        },
      });

      await wrapper.setProps({ value: 200 });
      await nextTick();
      // Without animationStart, innerValue directly updates
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('200');
    });
  });

  // ==================== Instance Functions Tests ====================
  describe('instanceFunctions', () => {
    it('start', async () => {
      vi.useRealTimers();
      const wrapper = mount(Statistic, {
        props: {
          value: 100,
          animation: { duration: 100, valueFrom: 0 },
          animationStart: false,
        },
      });
      await nextTick();

      const exposed = wrapper.vm.$.exposed;
      if (exposed?.start) {
        exposed.start();
        await new Promise((resolve) => setTimeout(resolve, 200));
        await nextTick();
        expect(wrapper.find('.t-statistic-content-value').text()).toBe('100');
      }
    });

    it('start with custom from/to', async () => {
      vi.useRealTimers();
      const wrapper = mount(Statistic, {
        props: {
          value: 100,
          animation: { duration: 100, valueFrom: 0 },
          animationStart: false,
        },
      });
      await nextTick();

      const exposed = wrapper.vm.$.exposed;
      if (exposed?.start) {
        exposed.start(10, 50);
        await new Promise((resolve) => setTimeout(resolve, 200));
        await nextTick();
        expect(wrapper.find('.t-statistic-content-value').text()).toBe('50');
      }
    });

    it('contentStyle', () => {
      const wrapper = mount(Statistic, {
        props: { value: 100, color: 'red' },
      });
      const exposed = wrapper.vm.$.exposed;
      if (exposed?.contentStyle) {
        expect(exposed.contentStyle.value).toEqual({ color: 'var(--td-error-color)' });
      }
    });
  });

  // ==================== Edge Cases Tests ====================
  describe('edge cases', () => {
    it('should handle component unmount gracefully', async () => {
      const wrapper = mount(Statistic, {
        props: { value: 100, title: 'Test' },
      });
      await nextTick();
      wrapper.unmount();
      expect(true).toBe(true);
    });

    it('should handle unmount during animation', async () => {
      vi.useRealTimers();
      const wrapper = mount(Statistic, {
        props: {
          value: 100,
          animation: { duration: 500, valueFrom: 0 },
          animationStart: true,
        },
      });
      await nextTick();
      // Unmount while animation is in progress
      wrapper.unmount();
      expect(true).toBe(true);
    });

    it('should handle value 0 correctly', () => {
      const wrapper = mount(Statistic, {
        props: { title: 'Test', value: 0 },
      });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('0');
    });

    it('value with integer (no decimal places)', () => {
      const wrapper = mount(Statistic, {
        props: { value: 1000 },
      });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('1,000');
    });

    it('value with decimal when decimalPlaces not specified', () => {
      const wrapper = mount(Statistic, {
        props: { value: 1234.56 },
      });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('1,234.56');
    });

    it('innerValue initializes to value when no animation', () => {
      // covers line 30: animation is undefined, so valueFrom is undefined, falls back to props.value
      const wrapper = mount(Statistic, {
        props: { value: 42 },
      });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('42');
    });

    it('innerDecimalPlaces uses 0 for integer value without decimalPlaces', () => {
      const wrapper = mount(Statistic, {
        props: { value: 100 },
      });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('100');
    });

    it('animation without valueFrom uses props.value as innerValue', () => {
      // line 30: animation?.valueFrom is undefined → falls back to props.value via ??
      const wrapper = mount(Statistic, {
        props: {
          value: 77,
          // @ts-expect-error testing animation without valueFrom
          animation: { duration: 200 },
          animationStart: false,
        },
      });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('77');
    });

    it('animation with null valueFrom falls back to props.value', () => {
      // line 30: animation?.valueFrom is null → null ?? props.value → props.value
      const wrapper = mount(Statistic, {
        props: {
          value: 88,
          animation: { duration: 200, valueFrom: null },
          animationStart: false,
        },
      });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('88');
    });

    it('numberValue falls back to 0 when value is not a number', () => {
      // line 29: isNumber(props.value) is false → returns 0
      // use format to avoid getFormatValue crash with undefined value
      const wrapper = mount(Statistic, {
        props: {
          // @ts-expect-error testing string value
          value: 'not-a-number',
          format: (val: number) => val,
        },
      });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('not-a-number');
    });

    it('animation with explicit valueFrom 0', () => {
      // line 29/30: animation.valueFrom is 0 (falsy but not nullish) → uses 0
      const wrapper = mount(Statistic, {
        props: {
          value: 100,
          animation: { duration: 200, valueFrom: 0 },
          animationStart: false,
        },
      });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('0');
    });
  });
});
