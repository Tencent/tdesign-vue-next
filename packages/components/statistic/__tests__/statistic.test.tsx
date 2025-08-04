import { mount } from '@vue/test-utils';
import Statistic from '@tdesign/components/statistic';
import { COLOR_MAP } from '@tdesign/common-js/statistic/utils';

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

    it('color', () => {
      const wrapper = mount(Statistic, {
        propsData: {
          title: 'Total Sales',
          value: 1000,
          color: '#ff0000',
        },
      });

      const contentElement = wrapper.find('.t-statistic-content');
      expect(contentElement.exists()).toBe(true);
      expect(contentElement.attributes('style')).toContain('color: rgb(255, 0, 0)');
    });

    it('should handle all TDesign preset colors', async () => {
      expect(COLOR_MAP).toBeDefined();
      expect(COLOR_MAP.black).toBe('var(--td-text-color-primary)');

      const wrapper = mount(Statistic, {
        propsData: {
          value: 1000,
          color: 'black',
        },
      });

      const contentStyle = wrapper.vm.contentStyle;
      expect(contentStyle).toBeDefined();
      expect(contentStyle.color).toBe('var(--td-text-color-primary)');

      for (const color of Object.keys(COLOR_MAP)) {
        await wrapper.setProps({ color });
        await wrapper.vm.$nextTick();
        const updatedContentStyle = wrapper.vm.contentStyle;
        const actualColor = updatedContentStyle ? updatedContentStyle.color : undefined;
        expect(actualColor).toBe(COLOR_MAP[color as keyof typeof COLOR_MAP]);
      }
    });
  });
});
