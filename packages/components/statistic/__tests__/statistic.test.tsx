import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Statistic } from '@tdesign/components/statistic';
import statisticProps from '@tdesign/components/statistic/props';

describe('Statistic', () => {
  describe('props', () => {
    it(':value[number]', () => {
      // 整数
      const wrapper1 = mount(<Statistic value={1234} />);
      expect(wrapper1.find('.t-statistic-content-value').text()).toBe('1,234');
      wrapper1.unmount();

      // 小数
      const wrapper2 = mount(<Statistic value={3.14} />);
      expect(wrapper2.find('.t-statistic-content-value').text()).toBe('3.14');
      wrapper2.unmount();

      // 0
      const wrapper3 = mount(<Statistic value={0} />);
      expect(wrapper3.find('.t-statistic-content-value').text()).toBe('0');
      wrapper3.unmount();

      // 负数
      const wrapper4 = mount(<Statistic value={-999} />);
      expect(wrapper4.find('.t-statistic-content-value').text()).toBe('-999');
      wrapper4.unmount();
    });

    it(':title[string]', () => {
      const wrapper = mount(<Statistic value={100} title="总收入" />);
      expect(wrapper.find('.t-statistic-title').exists()).toBe(true);
      expect(wrapper.find('.t-statistic-title').text()).toBe('总收入');
      wrapper.unmount();
    });

    it(':title[slot/function]', () => {
      const wrapper = mount(Statistic, {
        props: { value: 100 },
        slots: { title: () => <span class="custom-title">自定义标题</span> },
      });
      expect(wrapper.find('.custom-title').exists()).toBe(true);
      expect(wrapper.find('.custom-title').text()).toBe('自定义标题');
      wrapper.unmount();
    });

    it(':extra[string]', () => {
      const wrapper = mount(<Statistic value={100} extra="较昨日" />);
      expect(wrapper.find('.t-statistic-extra').exists()).toBe(true);
      expect(wrapper.find('.t-statistic-extra').text()).toBe('较昨日');
      wrapper.unmount();
    });

    it(':extra[slot/function]', () => {
      const wrapper = mount(Statistic, {
        props: { value: 100 },
        slots: { extra: () => <span class="custom-extra">额外信息</span> },
      });
      expect(wrapper.find('.custom-extra').exists()).toBe(true);
      expect(wrapper.find('.custom-extra').text()).toBe('额外信息');
      wrapper.unmount();
    });

    it(':prefix[string]', () => {
      const wrapper = mount(<Statistic value={100} prefix="¥" />);
      expect(wrapper.find('.t-statistic-content-prefix').exists()).toBe(true);
      expect(wrapper.find('.t-statistic-content-prefix').text()).toBe('¥');
      wrapper.unmount();
    });

    it(':prefix[slot/function]', () => {
      const wrapper = mount(Statistic, {
        props: { value: 100 },
        slots: { prefix: () => <span class="custom-prefix">$</span> },
      });
      expect(wrapper.find('.custom-prefix').exists()).toBe(true);
      expect(wrapper.find('.custom-prefix').text()).toBe('$');
      wrapper.unmount();
    });

    it(':suffix[string]', () => {
      const wrapper = mount(<Statistic value={100} suffix="%" />);
      expect(wrapper.find('.t-statistic-content-suffix').exists()).toBe(true);
      expect(wrapper.find('.t-statistic-content-suffix').text()).toBe('%');
      wrapper.unmount();
    });

    it(':suffix[slot/function]', () => {
      const wrapper = mount(Statistic, {
        props: { value: 100 },
        slots: { suffix: () => <span class="custom-suffix">元</span> },
      });
      expect(wrapper.find('.custom-suffix').exists()).toBe(true);
      expect(wrapper.find('.custom-suffix').text()).toBe('元');
      wrapper.unmount();
    });

    it(':unit[string]', () => {
      const wrapper = mount(<Statistic value={100} unit="GB" />);
      expect(wrapper.find('.t-statistic-content-unit').exists()).toBe(true);
      expect(wrapper.find('.t-statistic-content-unit').text()).toBe('GB');
      wrapper.unmount();
    });

    it(':unit[slot/function]', () => {
      const wrapper = mount(Statistic, {
        props: { value: 100 },
        slots: { unit: () => <span class="custom-unit">台</span> },
      });
      expect(wrapper.find('.custom-unit').exists()).toBe(true);
      expect(wrapper.find('.custom-unit').text()).toBe('台');
      wrapper.unmount();
    });

    it(':color[string]', () => {
      // jsdom 不支持 CSS 变量的 inline style，通过 exposed contentStyle 验证颜色映射
      // 预设颜色
      const wrapper1 = mount(<Statistic value={100} color="blue" />);
      expect((wrapper1.vm as any).contentStyle.color).toBe('var(--td-brand-color)');
      wrapper1.unmount();

      const wrapper2 = mount(<Statistic value={100} color="red" />);
      expect((wrapper2.vm as any).contentStyle.color).toBe('var(--td-error-color)');
      wrapper2.unmount();

      const wrapper3 = mount(<Statistic value={100} color="orange" />);
      expect((wrapper3.vm as any).contentStyle.color).toBe('var(--td-warning-color)');
      wrapper3.unmount();

      const wrapper4 = mount(<Statistic value={100} color="green" />);
      expect((wrapper4.vm as any).contentStyle.color).toBe('var(--td-success-color)');
      wrapper4.unmount();

      const wrapper5 = mount(<Statistic value={100} color="black" />);
      expect((wrapper5.vm as any).contentStyle.color).toBe('var(--td-text-color-primary)');
      wrapper5.unmount();

      // 自定义颜色
      const wrapper6 = mount(<Statistic value={100} color="#ff0000" />);
      expect((wrapper6.vm as any).contentStyle.color).toBe('#ff0000');
      wrapper6.unmount();
    });

    it(':separator[string]', () => {
      // 默认千位分隔符 ','
      const wrapper1 = mount(<Statistic value={1234567} />);
      expect(wrapper1.find('.t-statistic-content-value').text()).toBe('1,234,567');
      wrapper1.unmount();

      // 自定义分隔符
      const wrapper2 = mount(<Statistic value={1234567} separator="." />);
      expect(wrapper2.find('.t-statistic-content-value').text()).toBe('1.234.567');
      wrapper2.unmount();

      // 空格分隔符
      const wrapper3 = mount(<Statistic value={1234567} separator=" " />);
      expect(wrapper3.find('.t-statistic-content-value').text()).toBe('1 234 567');
      wrapper3.unmount();
    });

    it(':decimalPlaces[number]', () => {
      // 保留 2 位小数
      const wrapper1 = mount(<Statistic value={3.1} decimalPlaces={2} />);
      expect(wrapper1.find('.t-statistic-content-value').text()).toBe('3.10');
      wrapper1.unmount();

      // 保留 0 位小数
      const wrapper2 = mount(<Statistic value={3.14} decimalPlaces={0} />);
      expect(wrapper2.find('.t-statistic-content-value').text()).toBe('3');
      wrapper2.unmount();

      // 未设置 decimalPlaces 时保留原始精度
      const wrapper3 = mount(<Statistic value={3.14159} />);
      expect(wrapper3.find('.t-statistic-content-value').text()).toBe('3.14159');
      wrapper3.unmount();
    });

    it(':format[function]', () => {
      const wrapper = mount(<Statistic value={1234} format={(v: number) => v * 2} />);
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('2468');
      wrapper.unmount();
    });

    it(':loading[boolean]', () => {
      // loading=true: 显示 Skeleton
      const wrapper1 = mount(<Statistic value={100} loading />);
      expect(wrapper1.findComponent({ name: 'TSkeleton' }).exists()).toBe(true);
      expect(wrapper1.findComponent({ name: 'TSkeleton' }).props('loading')).toBe(true);
      wrapper1.unmount();

      // loading=false: 显示数值
      const wrapper2 = mount(<Statistic value={100} loading={false} />);
      expect(wrapper2.findComponent({ name: 'TSkeleton' }).props('loading')).toBe(false);
      expect(wrapper2.find('.t-statistic-content-value').text()).toBe('100');
      wrapper2.unmount();
    });

    it(':trend[increase/decrease]', () => {
      const validator = statisticProps.trend.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('increase')).toBe(true);
      expect(validator('decrease')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      // increase: 渲染上升图标到 prefix 位置（默认 trendPlacement=left）
      const wrapper1 = mount(<Statistic value={100} trend="increase" />);
      expect(wrapper1.find('.t-statistic-content-prefix').exists()).toBe(true);
      expect(wrapper1.find('.t-statistic-content-prefix svg').exists()).toBe(true);
      wrapper1.unmount();

      // decrease: 渲染下降图标
      const wrapper2 = mount(<Statistic value={100} trend="decrease" />);
      expect(wrapper2.find('.t-statistic-content-prefix').exists()).toBe(true);
      expect(wrapper2.find('.t-statistic-content-prefix svg').exists()).toBe(true);
      wrapper2.unmount();

      // 无 trend: 不渲染 prefix/suffix 图标
      const wrapper3 = mount(<Statistic value={100} />);
      expect(wrapper3.find('.t-statistic-content-prefix').exists()).toBe(false);
      expect(wrapper3.find('.t-statistic-content-suffix').exists()).toBe(false);
      wrapper3.unmount();
    });

    it(':trendPlacement[left/right]', () => {
      const validator = statisticProps.trendPlacement.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('left')).toBe(true);
      expect(validator('right')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      // left: trend 图标在 prefix 位置
      const wrapper1 = mount(<Statistic value={100} trend="increase" trendPlacement="left" />);
      expect(wrapper1.find('.t-statistic-content-prefix svg').exists()).toBe(true);
      expect(wrapper1.find('.t-statistic-content-suffix').exists()).toBe(false);
      wrapper1.unmount();

      // right: trend 图标在 suffix 位置
      const wrapper2 = mount(<Statistic value={100} trend="increase" trendPlacement="right" />);
      expect(wrapper2.find('.t-statistic-content-suffix svg').exists()).toBe(true);
      expect(wrapper2.find('.t-statistic-content-prefix').exists()).toBe(false);
      wrapper2.unmount();
    });

    it(':prefix overrides trend icon', () => {
      // 自定义 prefix 优先于 trend 图标
      const wrapper = mount(<Statistic value={100} trend="increase" prefix="¥" />);
      expect(wrapper.find('.t-statistic-content-prefix').text()).toBe('¥');
      expect(wrapper.find('.t-statistic-content-prefix svg').exists()).toBe(false);
      wrapper.unmount();
    });

    it(':suffix overrides trend icon (trendPlacement=right)', () => {
      const wrapper = mount(<Statistic value={100} trend="increase" trendPlacement="right" suffix="%" />);
      expect(wrapper.find('.t-statistic-content-suffix').text()).toBe('%');
      expect(wrapper.find('.t-statistic-content-suffix svg').exists()).toBe(false);
      wrapper.unmount();
    });

    it('no title renders no title element', () => {
      const wrapper = mount(<Statistic value={100} />);
      expect(wrapper.find('.t-statistic-title').exists()).toBe(false);
      wrapper.unmount();
    });

    it('no extra renders no extra element', () => {
      const wrapper = mount(<Statistic value={100} />);
      expect(wrapper.find('.t-statistic-extra').exists()).toBe(false);
      wrapper.unmount();
    });
  });

  describe('animation', () => {
    beforeEach(() => {
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
        return setTimeout(cb, 16) as unknown as number;
      });
      vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
        clearTimeout(id);
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it(':animation + :animationStart on mount', async () => {
      const wrapper = mount(<Statistic value={1000} animation={{ duration: 100, valueFrom: 0 }} animationStart />);
      // 初始值应该从 valueFrom 开始
      expect(wrapper.find('.t-statistic-content-value').exists()).toBe(true);

      // 等待动画完成
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('1,000');
      wrapper.unmount();
    });

    it(':animationStart=false does not start animation', async () => {
      const wrapper = mount(
        <Statistic value={1000} animation={{ duration: 100, valueFrom: 0 }} animationStart={false} />,
      );
      await nextTick();
      // animationStart=false 时不执行动画，直接显示 valueFrom
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('0');
      wrapper.unmount();
    });

    it(':animationStart watch triggers animation', async () => {
      const wrapper = mount(Statistic, {
        props: { value: 1000, animation: { duration: 100, valueFrom: 0 }, animationStart: false },
      });
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('0');

      await wrapper.setProps({ animationStart: true });
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('1,000');
      wrapper.unmount();
    });

    it('value change restarts animation', async () => {
      const wrapper = mount(Statistic, {
        props: { value: 100, animation: { duration: 100, valueFrom: 0 }, animationStart: true },
      });
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('100');

      await wrapper.setProps({ value: 200 });
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('200');
      wrapper.unmount();
    });
  });

  describe('instanceFunctions', () => {
    it('start()', async () => {
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
        return setTimeout(cb, 16) as unknown as number;
      });
      vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
        clearTimeout(id);
      });

      const wrapper = mount(Statistic, {
        props: { value: 500, animation: { duration: 100, valueFrom: 0 }, animationStart: false },
      });
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('0');

      // 手动调用 start
      (wrapper.vm as any).start();
      await new Promise((resolve) => setTimeout(resolve, 200));
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('500');

      vi.restoreAllMocks();
      wrapper.unmount();
    });
  });

  describe('edge cases', () => {
    it('renders root .t-statistic class', () => {
      const wrapper = mount(<Statistic value={0} />);
      expect(wrapper.find('.t-statistic').exists()).toBe(true);
      wrapper.unmount();
    });

    it('large number with separator', () => {
      const wrapper = mount(<Statistic value={1234567890} />);
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('1,234,567,890');
      wrapper.unmount();
    });

    it('value change without animation updates immediately', async () => {
      const wrapper = mount(Statistic, { props: { value: 100 } });
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('100');

      await wrapper.setProps({ value: 200 });
      await nextTick();
      expect(wrapper.find('.t-statistic-content-value').text()).toBe('200');
      wrapper.unmount();
    });
  });
});
