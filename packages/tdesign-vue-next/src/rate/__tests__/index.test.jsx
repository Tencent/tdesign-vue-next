import { mount } from '@vue/test-utils';
import { Rate } from 'tdesign-vue-next';
import { expect } from 'vitest';
import { LogoGithubIcon } from 'tdesign-icons-vue-next';

// every component needs four parts: props/events/slots/functions.
describe('rate', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Rate></Rate>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':value', async () => {
      const wrapper = mount(Rate, {
        props: {
          'value': 0,
          'onUpdate:value': (e) => {
            wrapper.setProps({ value: e });
          },
        },
      });
      const rateItems = wrapper.findAll('.t-rate__item');
      await rateItems[rateItems.length - 1].trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.props('value')).toBe(5);
    });
    it(':allowHalf', async () => {
      const wrapper = mount(Rate, {
        props: {
          value: 0.5,
          allowHalf: true,
        },
      });
      const item = wrapper.find('.t-rate__item');
      expect(item.classes()).contains('t-rate__item--half');
    });
    it(':color String', async () => {
      const wrapper = mount(Rate, {
        props: {
          value: 1,
          color: 'red',
        },
      });
      const svg = wrapper.find('.t-rate__item--full svg');
      expect(svg.attributes('color')).toBe('red');
    });
    it(':color Array', async () => {
      const wrapper = mount(Rate, {
        props: {
          value: 1,
          color: ['red', 'black'],
        },
      });
      const svgs = wrapper.findAll('.t-rate__item svg');
      expect(svgs[0].attributes('color')).toBe('red');
      expect(svgs[svgs.length - 1].attributes('color')).toBe('black');
    });
    it(':count', async () => {
      const wrapper = mount(Rate, {
        props: {
          value: 1,
          count: 10,
        },
      });
      const svgs = wrapper.findAll('.t-rate__item');
      expect(svgs.length).toBe(10);
    });
    it(':disabled', async () => {
      const wrapper = mount(Rate, {
        props: {
          'value': 0,
          'disabled': true,
          'onUpdate:value': (e) => {
            wrapper.setProps({ value: e });
          },
        },
      });
      const rateItems = wrapper.findAll('.t-rate__item');
      await rateItems[rateItems.length - 1].trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.props('value')).toBe(0);
    });
    it(':gap', () => {
      const wrapper = mount(Rate, {
        props: { gap: 5 },
      });

      expect(wrapper.find('.t-rate__list').element.style.gap).toBe('5px');
    });
    it(':showText', () => {
      [true, false].forEach((showText) => {
        const wrapper = mount(Rate, {
          props: { showText, value: 1 },
        });
        const el = wrapper.find('.t-rate__text');
        expect(el.exists()).toBe(showText);
      });
    });
    it(':size', () => {
      const wrapper = mount(Rate, {
        props: { size: '30px' },
      });
      expect(wrapper.find('.t-rate__star-top .t-icon').element.style['font-size']).toBe('30px');
    });
    it(':texts', async () => {
      const texts = ['1分', '2分', '3分', '4分', '5分'];
      for (let i = 0; i < texts.length; i++) {
        const wrapper = mount(Rate, {
          props: { showText: true, texts, value: i + 1 },
        });
        const textEl = wrapper.find('.t-rate__text');
        expect(textEl.exists()).toBe(true);
        expect(textEl.text()).toBe(texts[i]);
      }
    });
    it(':defaultValue', () => {
      const wrapper = mount(Rate, {
        props: { defaultValue: 3 },
      });
      const items = wrapper.findAll('.t-rate__item--full');
      expect(items.length).toBe(3);
    });
  });
  describe(':event', () => {
    it(':onChange', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Rate, {
        props: {
          value: 0,
          onChange,
        },
      });
      await wrapper.find('.t-rate__item').trigger('click');
      expect(onChange).toBeCalled();
    });
  });
  describe(':slot', () => {
    it(':icon', async () => {
      const wrapper = mount(Rate, {
        slots: {
          icon: e => <LogoGithubIcon {...e} />,
        },
      });
      expect(wrapper.findComponent(LogoGithubIcon).exists()).toBe(true);
    });
  });
});
