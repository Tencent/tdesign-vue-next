import { mount } from '@vue/test-utils';
import Statistic from '@tdesign/components/statistic';
import props from '../props';

describe('Statistic', () => {
  describe(':props', () => {
    it('title', () => {
      const wrapper = mount({
        render() {
          return <Statistic title="Total Assets" value={82.76} />;
        },
      });
      expect(wrapper.find('.t-statistic-title').exists()).toBe(true);
      expect(wrapper.find('.t-statistic-title').text()).toBe('Total Assets');
    });

    it('value', () => {
      const wrapper = mount({
        render() {
          return <Statistic title="Total Assets" value={82.76} unit="%" trend="increase" />;
        },
      });
      expect(wrapper.find('.t-statistic-content-value').exists()).toBe(true);
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('82.76');
    });

    it('unit', () => {
      const wrapper = mount(Statistic, {
        propsData: {
          title: 'Total Sales',
          value: 1000,
          unit: 'pcs',
        },
      });

      expect(wrapper.find('.t-statistic-content-unit').text()).toBe('pcs');
    });

    it('decimalPlaces', () => {
      const wrapper = mount({
        render() {
          return <Statistic title="Total Assets" value={123.45678} decimalPlaces={3} />;
        },
      });
      expect(wrapper.find('.t-statistic-content-value').exists()).toBe(true);
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('123.457');
    });

    it('prefix', () => {
      const wrapper = mount(Statistic, {
        propsData: {
          title: 'Total Sales',
          value: 1000,
          prefix: '$',
        },
      });

      expect(wrapper.find('.t-statistic-content-prefix').text()).toBe('$');
    });

    it('suffix', () => {
      const wrapper = mount(Statistic, {
        propsData: {
          title: 'Total Sales',
          value: 1000,
          suffix: 'K',
        },
      });

      expect(wrapper.find('.t-statistic-content-suffix').text()).toBe('K');
    });

    it('loading', async () => {
      const wrapper = mount(Statistic, {
        propsData: {
          title: 'Downloads',
          value: 1000,
          loading: true,
        },
      });

      expect(wrapper.find('.t-statistic-title').text()).toBe('Downloads');
      expect(wrapper.find('.t-skeleton').exists()).toBe(true);
      expect(wrapper.find('.t-skeleton__row').exists()).toBe(true);
    });

    it('trend="increase"', () => {
      const wrapper = mount(Statistic, {
        propsData: {
          title: 'Total Sales',
          value: 1000,
          trend: 'increase',
        },
      });

      const trendIconElement = wrapper.find('.t-icon.t-icon-arrow-triangle-up-filled');
      expect(trendIconElement.exists()).toBe(true);
      expect(trendIconElement.element.tagName).toBe('svg');
    });

    it('trend="decrease"', () => {
      const wrapper = mount(Statistic, {
        propsData: {
          title: 'Total Sales',
          value: 1000,
          trend: 'decrease',
        },
      });

      const trendIconElement = wrapper.find('.t-icon.t-icon-arrow-triangle-down-filled');
      expect(trendIconElement.exists()).toBe(true);
      expect(trendIconElement.element.tagName).toBe('svg');
    });
  });

  it('should return true for predefined colors', () => {
    const predefinedColors = ['black', 'blue', 'red', 'orange', 'green'] as const;
    predefinedColors.forEach((colorValue) => {
      expect(props.color.validator(colorValue)).toBe(true);
    });
  });

  it('should return true for valid CSS color values', () => {
    const validColors = [
      '#fff',
      '#ffffff',
      'rgb(255, 255, 255)',
      'rgba(255, 255, 255, 0.5)',
      'hsl(0, 100%, 50%)',
      'hsla(0, 100%, 50%, 0.5)',
      'currentColor',
      'transparent',
    ];
    validColors.forEach((colorValue) => {
      expect(props.color.validator(colorValue as any)).toBe(true);
    });
  });

  // it('should return false for invalid CSS color values', () => {
  //   const invalidColors = [
  //     'invalid-color',
  //     'rgb(300, 300, 300)',
  //     'rgba(255, 255, 255, 2)',
  //     'hsl(0, 110%, 50%)',
  //     'hsla(0, 100%, 50%, 1.5)',
  //   ];
  //   invalidColors.forEach((colorValue) => {
  //     expect(props.color.validator(colorValue as any)).toBe(false);
  //   });
  // });

  it('should handle server-side environment', () => {
    // 模拟服务端环境（document 不存在）
    const originalDocument = global.document;
    global.document = undefined as any;

    // 测试服务端逻辑
    expect(props.color.validator('#fff')).toBe(true);
    expect(props.color.validator('invalid-color' as any)).toBe(false);

    // 恢复全局对象
    global.document = originalDocument;
  });
});
