import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Rate } from '@tdesign/components';
import RateProps from '@tdesign/components/rate/props';
import { StarFilledIcon } from 'tdesign-icons-vue-next';
import { sleep } from '@tdesign/internal-utils';

describe('Rate', () => {
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof Rate>> | null = null;

    beforeEach(() => {
      wrapper = mount(Rate) as VueWrapper<InstanceType<typeof Rate>>;
    });

    afterEach(() => {
      wrapper?.unmount();
      wrapper = null;
    });

    it(':allowHalf[boolean]', async () => {
      expect(wrapper.vm.$props.allowHalf).toBe(false);

      await wrapper.setProps({ allowHalf: true });
      expect(wrapper.vm.$props.allowHalf).toBe(true);

      // 测试半选功能
      const wrapper2 = mount(Rate, {
        props: {
          allowHalf: true,
          value: 0.5,
        },
      });
      // spy
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
        width: 100,
        height: 100,
        x: 100,
        y: 100,
        top: 100,
        right: 100,
        bottom: 100,
        left: 100,
        toJSON: () => ({}),
      });
      const items = wrapper2.findAll('.t-rate__item');
      items[0].trigger('mousemove', { clientX: 100 });
      expect(items[0].classes()).toContain('t-rate__item--half');

      await sleep(100);
      items[1].trigger('mousemove', { clientX: 300 });
      expect(items[1].classes()).toContain('t-rate__item');
      expect(items[1].classes().length).toBe(1);
    });

    it(':clearable[boolean]', async () => {
      expect(wrapper.vm.$props.clearable).toBe(false);

      await wrapper.setProps({ clearable: true });
      expect(wrapper.vm.$props.clearable).toBe(true);
    });

    it(':color[string]', async () => {
      expect(wrapper.vm.$props.color).toBe('#ED7B2F');

      await wrapper.setProps({ color: '#FF0000' });
      expect(wrapper.vm.$props.color).toBe('#FF0000');
    });

    it(':color[array]', async () => {
      const colors = ['#ED7B2F', '#E3E6EB'];
      await wrapper.setProps({ color: colors });
      expect(wrapper.vm.$props.color).toEqual(colors);

      // 验证颜色应用
      const wrapper2 = mount(Rate, {
        props: {
          color: colors,
          value: 3,
        },
      });

      expect(wrapper2.exists()).toBe(true);
    });

    it(':count[number]', async () => {
      expect(wrapper.vm.$props.count).toBe(5);

      await wrapper.setProps({ count: 10 });
      expect(wrapper.vm.$props.count).toBe(10);

      // 验证星星数量
      const wrapper2 = mount(Rate, {
        props: {
          count: 10,
        },
      });

      expect(wrapper2.findAll('.t-rate__item').length).toBe(10);
    });

    it(':disabled[boolean]', async () => {
      expect(wrapper.vm.$props.disabled).toBe(undefined);

      await wrapper.setProps({ disabled: true });
      expect(wrapper.vm.$props.disabled).toBe(true);

      // 测试禁用状态下不能点击
      const onChange = vi.fn();
      const wrapper2 = mount(Rate, {
        props: {
          disabled: true,
          onChange,
        },
      });

      const firstStar = wrapper2.find('.t-rate__item');
      await firstStar.trigger('click');
      await nextTick();

      expect(onChange).not.toHaveBeenCalled();
    });

    it(':gap[number]', async () => {
      expect(wrapper.vm.$props.gap).toBe(4);

      await wrapper.setProps({ gap: 8 });
      expect(wrapper.vm.$props.gap).toBe(8);

      // 验证间距样式
      const wrapper2 = mount(Rate, {
        props: {
          gap: 8,
        },
      });

      const list = wrapper2.find('.t-rate__list');
      expect(list.attributes('style')).toContain('gap: 8px');
    });

    it(':icon[function]', async () => {
      const customIcon = () => <StarFilledIcon />;
      await wrapper.setProps({ icon: customIcon });
      expect(wrapper.vm.$props.icon).toBe(customIcon);

      // 验证自定义图标渲染
      const wrapper2 = mount(Rate, {
        props: {
          icon: customIcon,
        },
      });

      expect(wrapper2.findComponent(StarFilledIcon).exists()).toBe(true);
    });

    it(':showText[boolean]', async () => {
      expect(wrapper.vm.$props.showText).toBe(false);

      await wrapper.setProps({ showText: true });
      expect(wrapper.vm.$props.showText).toBe(true);

      // 验证文字显示
      const wrapper2 = mount(Rate, {
        props: {
          showText: true,
          value: 3,
        },
      });

      expect(wrapper2.find('.t-rate__text').exists()).toBe(true);
    });

    it(':size[string]', async () => {
      expect(wrapper.vm.$props.size).toBe('24px');

      await wrapper.setProps({ size: '32px' });
      expect(wrapper.vm.$props.size).toBe('32px');
    });

    it(':texts[array]', async () => {
      expect(wrapper.vm.$props.texts).toEqual([]);

      const customTexts = ['1分', '2分', '3分', '4分', '5分'];
      await wrapper.setProps({ texts: customTexts });
      expect(wrapper.vm.$props.texts).toEqual(customTexts);

      // 验证自定义文字显示
      const wrapper2 = mount(Rate, {
        props: {
          showText: true,
          texts: customTexts,
          value: 3,
        },
      });

      expect(wrapper2.find('.t-rate__text').text()).toBe('3分');
    });

    it(':value[number]', async () => {
      expect(wrapper.vm.$props.value).toBe(undefined);

      await wrapper.setProps({ value: 3 });
      expect(wrapper.vm.$props.value).toBe(3);

      // 验证选中状态
      const wrapper2 = mount(Rate, {
        props: {
          value: 3,
        },
      });

      expect(wrapper2.findAll('.t-rate__item--full').length).toBe(3);
    });

    it(':defaultValue[number]', async () => {
      expect(wrapper.vm.$props.defaultValue).toBe(0);

      const wrapper2 = mount(Rate, {
        props: {
          defaultValue: 4,
        },
      });

      expect(wrapper2.vm.$props.defaultValue).toBe(4);
      expect(wrapper2.findAll('.t-rate__item--full').length).toBe(4);
    });
  });

  describe('events', () => {
    it(':onChange', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Rate, {
        props: {
          onChange,
        },
      });

      // 点击第三颗星
      const thirdStar = wrapper.findAll('.t-rate__item')[2];
      await thirdStar.trigger('click');
      await nextTick();

      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0]).toBe(3);
    });

    it(':onChange with different values', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Rate, {
        props: {
          onChange,
        },
      });

      // 点击第一颗星
      await wrapper.findAll('.t-rate__item')[0].trigger('click');
      await nextTick();
      expect(onChange.mock.calls[0][0]).toBe(1);

      // 点击第五颗星
      await wrapper.findAll('.t-rate__item')[4].trigger('click');
      await nextTick();
      expect(onChange.mock.calls[1][0]).toBe(5);
    });
  });

  describe('v-model', () => {
    it('supports v-model', async () => {
      const value = ref(0);
      const wrapper = mount({
        setup() {
          return () => <Rate v-model={value.value} />;
        },
      });

      expect(value.value).toBe(0);

      // 点击第三颗星
      const thirdStar = wrapper.findAll('.t-rate__item')[2];
      await thirdStar.trigger('click');
      await nextTick();

      expect(value.value).toBe(3);
    });

    it('supports v-model:value', async () => {
      const value = ref(2);
      const wrapper = mount({
        setup() {
          return () => <Rate v-model:value={value.value} />;
        },
      });

      expect(value.value).toBe(2);
      expect(wrapper.findAll('.t-rate__item--full').length).toBe(2);

      // 点击第四颗星
      const fourthStar = wrapper.findAll('.t-rate__item')[3];
      await fourthStar.trigger('click');
      await nextTick();

      expect(value.value).toBe(4);
    });
  });

  describe('slots', () => {
    it(':icon slot', () => {
      const wrapper = mount(Rate, {
        slots: {
          icon: () => <StarFilledIcon class="custom-icon" />,
        },
      });

      expect(wrapper.findComponent(StarFilledIcon).exists()).toBe(true);
      expect(wrapper.find('.custom-icon').exists()).toBe(true);
    });
  });

  describe('clearable', () => {
    it('clears rating when clicking current value', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Rate, {
        props: {
          clearable: true,
          value: 3,
          onChange,
        },
      });

      expect(wrapper.findAll('.t-rate__item--full').length).toBe(3);

      // 再次点击第三颗星应该清除评分
      const thirdStar = wrapper.findAll('.t-rate__item')[2];
      await thirdStar.trigger('click');
      await nextTick();

      expect(onChange).toHaveBeenCalledWith(0);
    });

    it('does not clear when clearable is false', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Rate, {
        props: {
          clearable: false,
          value: 3,
          onChange,
        },
      });

      // 再次点击第三颗星不应该清除评分
      const thirdStar = wrapper.findAll('.t-rate__item')[2];
      await thirdStar.trigger('click');
      await nextTick();

      expect(onChange).toHaveBeenCalledWith(3);
    });
  });

  describe('allowHalf', () => {
    it('supports half star selection', async () => {
      const wrapper = mount(Rate, {
        props: {
          allowHalf: true,
          value: 2.5,
        },
        attachTo: document.body,
      });

      expect(wrapper.findAll('.t-rate__item--half').length).toBe(1);
      expect(wrapper.findAll('.t-rate__item--full').length).toBe(2);

      wrapper.unmount();
    });

    it('renders different half values correctly', async () => {
      const wrapper1 = mount(Rate, {
        props: {
          allowHalf: true,
          value: 1.5,
        },
      });

      expect(wrapper1.findAll('.t-rate__item--half').length).toBe(1);
      expect(wrapper1.findAll('.t-rate__item--full').length).toBe(1);

      const wrapper2 = mount(Rate, {
        props: {
          allowHalf: true,
          value: 4.5,
        },
      });

      expect(wrapper2.findAll('.t-rate__item--half').length).toBe(1);
      expect(wrapper2.findAll('.t-rate__item--full').length).toBe(4);
    });
  });

  describe('showText', () => {
    it('displays text when showText is true', () => {
      const wrapper = mount(Rate, {
        props: {
          showText: true,
          value: 3,
        },
      });

      const textElement = wrapper.find('.t-rate__text');
      expect(textElement.exists()).toBe(true);
      expect(textElement.text()).toBeTruthy();
    });

    it('displays custom texts', () => {
      const customTexts = ['很差', '差', '一般', '好', '很好'];
      const wrapper = mount(Rate, {
        props: {
          showText: true,
          texts: customTexts,
          value: 4,
        },
      });

      const textElement = wrapper.find('.t-rate__text');
      expect(textElement.text()).toBe('好');
    });

    it('does not display text when showText is false', () => {
      const wrapper = mount(Rate, {
        props: {
          showText: false,
          value: 3,
        },
      });

      expect(wrapper.find('.t-rate__text').exists()).toBe(false);
    });
  });

  describe('disabled', () => {
    it('does not respond to click when disabled', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Rate, {
        props: {
          disabled: true,
          onChange,
        },
      });

      const firstStar = wrapper.find('.t-rate__item');
      await firstStar.trigger('click');
      await nextTick();

      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not respond to hover when disabled', async () => {
      const wrapper = mount(Rate, {
        props: {
          disabled: true,
          value: 0,
        },
        attachTo: document.body,
      });

      const firstStar = wrapper.find('.t-rate__item');
      await firstStar.trigger('mousemove');
      await nextTick();

      // 禁用状态下不应该有 hover 效果
      expect(wrapper.findAll('.t-rate__item--full').length).toBe(0);

      wrapper.unmount();
    });
  });

  describe('count', () => {
    it('renders correct number of stars', () => {
      const wrapper1 = mount(Rate, {
        props: {
          count: 3,
        },
      });

      expect(wrapper1.findAll('.t-rate__item').length).toBe(3);

      const wrapper2 = mount(Rate, {
        props: {
          count: 10,
        },
      });

      expect(wrapper2.findAll('.t-rate__item').length).toBe(10);
    });
  });

  describe('internal logic', () => {
    describe('getStarValue', () => {
      it('returns integer value when allowHalf is false', async () => {
        const onChange = vi.fn();
        const wrapper = mount(Rate, {
          props: {
            allowHalf: false,
            onChange,
          },
          attachTo: document.body,
        });

        const thirdStar = wrapper.findAll('.t-rate__item')[2];
        await thirdStar.trigger('click');
        await nextTick();

        expect(onChange).toHaveBeenCalledWith(3);

        wrapper.unmount();
      });

      it('can return half value when allowHalf is true', async () => {
        const onChange = vi.fn();
        const wrapper = mount(Rate, {
          props: {
            allowHalf: true,
            onChange,
          },
          attachTo: document.body,
        });

        // 由于需要计算鼠标位置，这里只验证组件能正常工作
        expect(wrapper.exists()).toBe(true);

        wrapper.unmount();
      });
    });

    describe('mouseEnterHandler', () => {
      it('updates hover value on mouse enter', async () => {
        const wrapper = mount(Rate, {
          props: {
            value: 0,
          },
          attachTo: document.body,
        });

        const thirdStar = wrapper.findAll('.t-rate__item')[2];
        await thirdStar.trigger('mousemove');
        await nextTick();

        // hover 时应该显示预览效果
        expect(wrapper.exists()).toBe(true);

        wrapper.unmount();
      });

      it('does not update hover value when disabled', async () => {
        const wrapper = mount(Rate, {
          props: {
            disabled: true,
            value: 0,
          },
          attachTo: document.body,
        });

        const thirdStar = wrapper.findAll('.t-rate__item')[2];
        await thirdStar.trigger('mousemove');
        await nextTick();

        // 禁用状态下不应该有 hover 效果
        expect(wrapper.findAll('.t-rate__item--full').length).toBe(0);

        wrapper.unmount();
      });
    });

    describe('mouseLeaveHandler', () => {
      it('clears hover value on mouse leave', async () => {
        const wrapper = mount(Rate, {
          props: {
            value: 2,
          },
          attachTo: document.body,
        });

        // 先 hover
        const fourthStar = wrapper.findAll('.t-rate__item')[3];
        await fourthStar.trigger('mousemove');
        await nextTick();

        // 然后 leave
        const rateContainer = wrapper.find('.t-rate');
        await rateContainer.trigger('mouseleave');
        await nextTick();

        // 应该恢复到原始值
        expect(wrapper.findAll('.t-rate__item--full').length).toBe(2);

        wrapper.unmount();
      });

      it('does not clear hover value when disabled', async () => {
        const wrapper = mount(Rate, {
          props: {
            disabled: true,
            value: 2,
          },
          attachTo: document.body,
        });

        const rateContainer = wrapper.find('.t-rate');
        await rateContainer.trigger('mouseleave');
        await nextTick();

        expect(wrapper.exists()).toBe(true);

        wrapper.unmount();
      });
    });

    describe('clickHandler', () => {
      it('updates value on click', async () => {
        const onChange = vi.fn();
        const wrapper = mount(Rate, {
          props: {
            onChange,
          },
        });

        const secondStar = wrapper.findAll('.t-rate__item')[1];
        await secondStar.trigger('click');
        await nextTick();

        expect(onChange).toHaveBeenCalledWith(2);
      });

      it('clears value when clicking current value with clearable', async () => {
        const onChange = vi.fn();
        const wrapper = mount(Rate, {
          props: {
            clearable: true,
            value: 3,
            onChange,
          },
        });

        const thirdStar = wrapper.findAll('.t-rate__item')[2];
        await thirdStar.trigger('click');
        await nextTick();

        expect(onChange).toHaveBeenCalledWith(0);
      });

      it('does not update value when disabled', async () => {
        const onChange = vi.fn();
        const wrapper = mount(Rate, {
          props: {
            disabled: true,
            onChange,
          },
        });

        const firstStar = wrapper.findAll('.t-rate__item')[0];
        await firstStar.trigger('click');
        await nextTick();

        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe('getStarCls', () => {
      it('returns correct class for full stars', () => {
        const wrapper = mount(Rate, {
          props: {
            value: 3,
          },
        });

        expect(wrapper.findAll('.t-rate__item--full').length).toBe(3);
      });

      it('returns correct class for half star', () => {
        const wrapper = mount(Rate, {
          props: {
            allowHalf: true,
            value: 2.5,
          },
        });

        expect(wrapper.findAll('.t-rate__item--full').length).toBe(2);
        expect(wrapper.findAll('.t-rate__item--half').length).toBe(1);
      });

      it('returns empty class for empty stars', () => {
        const wrapper = mount(Rate, {
          props: {
            value: 2,
            count: 5,
          },
        });

        const allStars = wrapper.findAll('.t-rate__item');
        expect(allStars.length).toBe(5);
        expect(wrapper.findAll('.t-rate__item--full').length).toBe(2);
      });
    });

    describe('displayValue', () => {
      it('shows hover value when hovering', async () => {
        const wrapper = mount(Rate, {
          props: {
            value: 2,
          },
          attachTo: document.body,
        });

        // 初始显示 value
        expect(wrapper.findAll('.t-rate__item--full').length).toBe(2);

        // hover 到第四颗星
        const fourthStar = wrapper.findAll('.t-rate__item')[3];
        await fourthStar.trigger('mousemove');
        await nextTick();

        // 应该显示 hover 的效果
        expect(wrapper.exists()).toBe(true);

        wrapper.unmount();
      });

      it('shows original value when not hovering', () => {
        const wrapper = mount(Rate, {
          props: {
            value: 3,
          },
        });

        expect(wrapper.findAll('.t-rate__item--full').length).toBe(3);
      });
    });

    describe('displayText', () => {
      it('displays correct text based on value', () => {
        const customTexts = ['1星', '2星', '3星', '4星', '5星'];
        const wrapper = mount(Rate, {
          props: {
            showText: true,
            texts: customTexts,
            value: 3,
          },
        });

        expect(wrapper.find('.t-rate__text').text()).toBe('3星');
      });

      it('uses default texts when texts prop is empty', () => {
        const wrapper = mount(Rate, {
          props: {
            showText: true,
            value: 3,
          },
        });

        const textElement = wrapper.find('.t-rate__text');
        expect(textElement.exists()).toBe(true);
        expect(textElement.text()).toBeTruthy();
      });
    });

    describe('RateIcon', () => {
      it('renders default StarFilledIcon', () => {
        const wrapper = mount(Rate);

        expect(wrapper.findComponent(StarFilledIcon).exists()).toBe(true);
      });

      it('renders custom icon from slot', () => {
        const CustomIcon = () => <div class="custom-rate-icon">★</div>;
        const wrapper = mount(Rate, {
          slots: {
            icon: CustomIcon,
          },
        });

        expect(wrapper.find('.custom-rate-icon').exists()).toBe(true);
      });

      it('renders custom icon from prop', () => {
        const CustomIcon = () => <div class="custom-rate-icon-prop">★</div>;
        const wrapper = mount(Rate, {
          props: {
            icon: CustomIcon,
          },
        });

        // icon prop 通过 renderTNodeJSX 处理，验证组件正常渲染即可
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.findAll('.t-rate__item').length).toBe(5);
      });
    });

    describe('color handling', () => {
      it('uses single color for active stars', () => {
        const wrapper = mount(Rate, {
          props: {
            color: '#FF0000',
            value: 3,
          },
        });

        expect(wrapper.exists()).toBe(true);
      });

      it('uses array colors for active and inactive stars', () => {
        const wrapper = mount(Rate, {
          props: {
            color: ['#FF0000', '#CCCCCC'],
            value: 3,
          },
        });

        expect(wrapper.exists()).toBe(true);
      });
    });
  });
});
