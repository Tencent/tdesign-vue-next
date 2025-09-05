import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { LogoGithubIcon } from 'tdesign-icons-vue-next';
import { Rate } from '@tdesign/components';
import RateProps from '@tdesign/components/rate/props';
import { TdRateProps } from '@tdesign/components/rate/type';
import { sleep } from '@tdesign/internal-utils';

describe('Rate', () => {
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof Rate>> | null = null;
    beforeEach(() => {
      wrapper = mount(<Rate />) as VueWrapper<InstanceType<typeof Rate>>;
    });

    it(':allowHalf[boolean]', async () => {
      const wrapper = mount(<Rate allowHalf={true} value={0.5} />);
      const items = wrapper.findAll('.t-rate__item');
      expect(items[0].classes()).toContain('t-rate__item--half');
      expect(wrapper.element).toMatchSnapshot();

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
      items[0].trigger('mousemove', { clientX: 100 });
      expect(items[0].classes()).toContain('t-rate__item--half');

      await sleep(100);
      items[1].trigger('mousemove', { clientX: 300 });
      expect(items[1].classes()).toContain('t-rate__item');
      expect(items[1].classes().length).toBe(1);
    });

    it(':clearable[boolean]', async () => {
      const wrapper = mount(<Rate defaultValue={4} clearable={true} />);
      const items = wrapper.findAll('.t-rate__item--full');
      expect(items.length).toBe(4);
      expect(wrapper.element).toMatchSnapshot();

      await items[3]?.trigger('click');
      await nextTick();
      const newItems = wrapper.findAll('.t-rate__item--full');
      expect(newItems.length).toBe(0);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':color[string]', () => {
      const wrapper = mount(<Rate value={1} color="red" />);
      const svg = wrapper.find('.t-rate__item--full svg');
      expect(svg.attributes('color')).toBe('red');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':color[array]', () => {
      const wrapper = mount(<Rate value={1} color={['red', 'black']} />);
      const svgs = wrapper.findAll('.t-rate__item svg');
      expect(svgs[0]?.attributes('color')).toBe('red');
      expect(svgs[svgs.length - 1]?.attributes('color')).toBe('black');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':count[number]', () => {
      const wrapper = mount(<Rate value={1} count={10} />);
      const svgs = wrapper.findAll('.t-rate__item');
      expect(svgs.length).toBe(10);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':defaultValue[number]', () => {
      const wrapper = mount(<Rate defaultValue={3} />);
      const items = wrapper.findAll('.t-rate__item--full');
      expect(items.length).toBe(3);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled[boolean]', async () => {
      const wrapper = mount(<Rate value={0} disabled={true} />);
      const rateItems = wrapper.findAll('.t-rate__item');
      await rateItems[rateItems.length - 1].trigger('click');
      await nextTick();
      expect(wrapper.props('value')).toBe(0);
      expect(wrapper.element).toMatchSnapshot();

      // TODO:PAOPAO The following two tests are actually a bit fictitious,
      // because they are not actually measured, but it seems that the coverage rate has increased.
      // Let me optimize it later
      await sleep(100);
      rateItems[0].trigger('mousemove', { clientX: 100 });
      expect(rateItems[0].classes()).toContain('t-rate__item');
      expect(rateItems[0].classes().length).toBe(1);

      await sleep(100);
      const rate = wrapper.find('.t-rate');
      rate.trigger('mouseleave');
      expect(rateItems[0].classes()).toContain('t-rate__item');
      expect(rateItems[0].classes().length).toBe(1);
    });

    it(':gap[number]', () => {
      const wrapper = mount(<Rate gap={5} />);
      const element = wrapper.find('.t-rate__list').element as HTMLElement;
      expect(element.style.gap).toBe('5px');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':icon[slot]', () => {
      const wrapper = mount(<Rate v-slots={{ icon: (e: any) => <LogoGithubIcon {...e} /> }} />);
      expect(wrapper.findComponent(LogoGithubIcon).exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':showText[boolean]', () => {
      [true, false].forEach((showText) => {
        const wrapper = mount(<Rate showText={showText} value={1} />);
        const el = wrapper.find('.t-rate__text');
        expect(el.exists()).toBe(showText);
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    it(':size[string]', () => {
      const wrapper = mount(<Rate size="30px" />);
      const element = wrapper.find('.t-rate__star-top .t-icon').element as HTMLElement;
      expect(element.style['font-size']).toBe('30px');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':texts[array]', () => {
      const texts = ['1分', '2分', '3分', '4分', '5分'];
      for (let i = 0; i < texts.length; i++) {
        const wrapper = mount(<Rate showText={true} texts={texts} value={i + 1} />);
        const textEl = wrapper.find('.t-rate__text');
        expect(textEl.exists()).toBe(true);
        expect(textEl.text()).toBe(texts[i]);
        expect(wrapper.element).toMatchSnapshot();
      }
    });

    it(':value[number]', async () => {
      const wrapper = mount(<Rate value={5} />);
      const rateItems = wrapper.findAll('.t-rate__item');
      await rateItems[rateItems.length - 1].trigger('click');
      await nextTick();
      expect(wrapper.props('value')).toBe(5);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('events', () => {
    it(':onChange', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<Rate value={0.5} allowHalf={true} gap={5} onChange={onChange} />);
      const star = wrapper.findAll('.t-rate__item')[0];
      expect(star.exists()).toBeTruthy();
      await star.trigger('click');
      expect(star.classes()).toContain('t-rate__item--half');
      expect(onChange).toBeCalled();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':mouseleave', async () => {
      const wrapper = mount(<Rate value={0} />);
      const star = wrapper.findAll('.t-rate__item')[0];
      expect(star.exists()).toBeTruthy();
      await star.trigger('mousemove');
      expect(star.classes()).toContain('t-rate__item--full');
      const rate = wrapper.find('.t-rate');
      expect(rate.exists()).toBeTruthy();
      await rate.trigger('mouseleave');
      expect(star.classes()).not.toContain('t-rate__item--full');
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('slots', () => {
    it(':icon', () => {
      const wrapper = mount(<Rate v-slots={{ icon: (e: any) => <LogoGithubIcon {...e} /> }} />);
      expect(wrapper.findComponent(LogoGithubIcon).exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
