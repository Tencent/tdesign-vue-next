import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import Jumper from '@/src/jumper/index.ts';

describe('Jumper', () => {
  describe(':props', () => {
    it(':disabled, default', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Jumper onChange={fn} />;
        },
      });
      wrapper.find('button').trigger('click');
      expect(fn).toHaveBeenCalledOnce();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled, false', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Jumper disabled onChange={fn} />;
        },
      });
      wrapper.find('button').trigger('click');
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled:prev, prev false', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Jumper disabled={{ prev: true }} onChange={fn} />;
        },
      });
      wrapper.find('.t-jumper__prev').trigger('click');
      expect(fn).not.toHaveBeenCalled();
      wrapper.find('.t-jumper__current').trigger('click');
      expect(fn).toBeCalledTimes(1);
      wrapper.find('.t-jumper__next').trigger('click');
      expect(fn).toBeCalledTimes(2);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled:current, current false', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Jumper disabled={{ current: true }} onChange={fn} />;
        },
      });
      wrapper.find('.t-jumper__current').trigger('click');
      expect(fn).not.toHaveBeenCalled();
      wrapper.find('.t-jumper__prev').trigger('click');
      expect(fn).toBeCalledTimes(1);
      wrapper.find('.t-jumper__next').trigger('click');
      expect(fn).toBeCalledTimes(2);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled:next, next false', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Jumper disabled={{ next: true }} onChange={fn} />;
        },
      });
      wrapper.find('.t-jumper__next').trigger('click');
      expect(fn).not.toHaveBeenCalled();
      wrapper.find('.t-jumper__prev').trigger('click');
      expect(fn).toBeCalledTimes(1);
      wrapper.find('.t-jumper__current').trigger('click');
      expect(fn).toBeCalledTimes(2);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':showCurrent:true, default', () => {
      const wrapper = mount(Jumper);
      const currentButton = wrapper.find('.t-jumper__current');
      expect(currentButton.exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':showCurrent:false', () => {
      const wrapper = mount({
        render() {
          return <Jumper showCurrent={false} />;
        },
      });
      const currentButton = wrapper.find('.t-jumper__current');
      expect(currentButton.exists()).toBeFalsy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':size:small', () => {
      const wrapper = mount({
        render() {
          return <Jumper size="small" />;
        },
      });
      const children = wrapper.findAll('.t-size-s');
      expect(children.length).toBe(3);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':size:medium, default', () => {
      const wrapper = mount(Jumper);
      const children = wrapper.findAll('.t-size-m');
      expect(children.length).toBe(3);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':size:large', () => {
      const wrapper = mount({
        render() {
          return <Jumper size="large" />;
        },
      });
      const children = wrapper.findAll('.t-size-l');
      expect(children.length).toBe(3);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':variant, default', () => {
      const wrapper = mount(Jumper);
      const children = wrapper.findAll('.t-button--variant-text');
      expect(children.length).toBe(3);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':variant:outline', () => {
      const wrapper = mount({
        render() {
          return <Jumper variant="outline" />;
        },
      });
      const children = wrapper.findAll('.t-button--variant-outline');
      expect(children.length).toBe(3);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':layout:horizontal, default', () => {
      const wrapper = mount(Jumper);
      const left = wrapper.find('.t-icon-chevron-left');
      const right = wrapper.find('.t-icon-chevron-right');
      expect(left.exists()).toBeTruthy();
      expect(right.exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':layout:vertical', () => {
      const wrapper = mount({
        render() {
          return <Jumper layout="vertical" />;
        },
      });
      const up = wrapper.find('.t-icon-chevron-up');
      const down = wrapper.find('.t-icon-chevron-down');
      expect(up.exists()).toBeTruthy();
      expect(down.exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':tips, default', () => {
      const wrapper = mount(Jumper);
      const prevButton = wrapper.find('.t-jumper__prev');
      const currentButton = wrapper.find('.t-jumper__current');
      const nextButton = wrapper.find('.t-jumper__next');
      expect(prevButton.attributes('title')).toBeUndefined();
      expect(currentButton.attributes('title')).toBeUndefined();
      expect(nextButton.attributes('title')).toBeUndefined();
    });

    it(':tips', () => {
      const tips = { prev: 'Prev Tips', current: 'Current Tips', next: 'Next Tips' };
      const wrapper = mount({
        render() {
          return <Jumper tips={tips} />;
        },
      });
      const prevButton = wrapper.find('.t-jumper__prev');
      const currentButton = wrapper.find('.t-jumper__current');
      const nextButton = wrapper.find('.t-jumper__next');
      expect(prevButton.attributes('title')).toBe(tips.prev);
      expect(currentButton.attributes('title')).toBe(tips.current);
      expect(nextButton.attributes('title')).toBe(tips.next);
    });
  });

  describe('@event', () => {
    it('@change', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Jumper onChange={fn} />;
        },
      });
      // Jumper component onChange props exist
      const jumperWrapper = wrapper.findComponent(Jumper);
      expect(jumperWrapper.props('onChange')).toBeTruthy();

      const prevButton = wrapper.find('.t-jumper__prev');
      const currentButton = wrapper.find('.t-jumper__current');
      const nextButton = wrapper.find('.t-jumper__next');
      prevButton.trigger('click');
      expect(fn).toBeCalledTimes(1);
      currentButton.trigger('click');
      expect(fn).toBeCalledTimes(2);
      nextButton.trigger('click');
      expect(fn).toBeCalledTimes(3);
    });
  });
});
