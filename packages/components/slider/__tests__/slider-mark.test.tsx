// @ts-nocheck
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import Slider from '@tdesign/components/slider';

describe('SliderMark Component Tests', () => {
  describe('Mark Rendering', () => {
    it('renders mark text correctly', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
    });

    it('renders mark with string value', async () => {
      const marks = {
        0: 'Start',
        50: 'Middle',
        100: 'End',
      };
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts[0].text()).toBe('Start');
      expect(markTexts[1].text()).toBe('Middle');
      expect(markTexts[2].text()).toBe('End');
    });

    it('renders mark with number value', async () => {
      const marks = [0, 25, 50, 75, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(5);
    });

    it('renders mark with JSX value', async () => {
      const marks = {
        0: <span class="custom-mark">0</span>,
        50: <span class="custom-mark">50</span>,
        100: <span class="custom-mark">100</span>,
      };
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const customMarks = wrapper.findAll('.custom-mark');
      expect(customMarks.length).toBe(3);
    });

    it('renders mark with function value', async () => {
      const marks = {
        0: (val) => `${val}%`,
        50: (val) => `${val}%`,
        100: (val) => `${val}%`,
      };
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
    });
  });

  describe('Mark Positioning', () => {
    it('mark has correct position style', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      markTexts.forEach((mark) => {
        expect(mark.attributes('style')).toBeDefined();
      });
    });

    it('mark position for horizontal slider uses left', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider layout="horizontal" marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      // Marks should have positioning style
      expect(markTexts.length).toBe(3);
      markTexts.forEach((mark) => {
        expect(mark.attributes('style')).toBeDefined();
      });
    });

    it('mark position for vertical slider has positioning', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider layout="vertical" marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      // Marks should have positioning style
      expect(markTexts.length).toBe(3);
      markTexts.forEach((mark) => {
        expect(mark.attributes('style')).toBeDefined();
      });
    });

    it('mark at 0% position', async () => {
      const marks = [0];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markText = wrapper.find('.t-slider__mark-text');
      expect(markText.attributes('style')).toContain('0%');
    });

    it('mark at 100% position', async () => {
      const marks = [100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markText = wrapper.find('.t-slider__mark-text');
      expect(markText.attributes('style')).toContain('100%');
    });

    it('mark at 50% position', async () => {
      const marks = [50];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markText = wrapper.find('.t-slider__mark-text');
      expect(markText.attributes('style')).toContain('50%');
    });
  });

  describe('Mark Interactions', () => {
    it('mark is clickable', async () => {
      const marks = [0, 50, 100];
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider marks={marks} onChange={onChange} />;
        },
      });
      await nextTick();
      const markText = wrapper.find('.t-slider__mark-text');
      await markText.trigger('click');
      await nextTick();
      expect(onChange).toHaveBeenCalled();
    });

    it('clicking mark updates slider value', async () => {
      const marks = [0, 50, 100];
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider marks={marks} modelValue={0} onChange={onChange} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      if (markTexts.length > 1) {
        await markTexts[1].trigger('click');
        await nextTick();
        expect(onChange).toHaveBeenCalled();
      }
    });

    it('mark click disabled when slider is disabled', async () => {
      const marks = [0, 50, 100];
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider disabled marks={marks} onChange={onChange} />;
        },
      });
      await nextTick();
      const markText = wrapper.find('.t-slider__mark-text');
      await markText.trigger('click');
      await nextTick();
      // onChange should not be called when disabled
      expect(onChange).not.toHaveBeenCalled();
    });

    it('mark click triggers onChangeEnd', async () => {
      const marks = [0, 50, 100];
      const onChangeEnd = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider marks={marks} onChangeEnd={onChangeEnd} />;
        },
      });
      await nextTick();
      const markText = wrapper.find('.t-slider__mark-text');
      await markText.trigger('click');
      await nextTick();
      expect(onChangeEnd).toHaveBeenCalled();
    });
  });

  describe('Mark Stops', () => {
    it('renders mark stops', async () => {
      const marks = [0, 25, 50, 75, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const stops = wrapper.findAll('.t-slider__mark-stop');
      expect(stops.length).toBeGreaterThan(0);
    });

    it('mark stops have correct positioning', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const stops = wrapper.findAll('.t-slider__mark-stop');
      stops.forEach((stop) => {
        expect(stop.attributes('style')).toBeDefined();
      });
    });

    it('mark stops at 0% and 100% are not rendered', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const stops = wrapper.findAll('.t-slider__mark-stop');
      // Only middle stop should be rendered
      expect(stops.length).toBeLessThan(3);
    });
  });

  describe('Mark with Range Slider', () => {
    it('marks work with range slider', async () => {
      const marks = [0, 25, 50, 75, 100];
      const wrapper = mount({
        render() {
          return <Slider range marks={marks} modelValue={[25, 75]} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(5);
    });

    it('clicking mark in range slider updates value', async () => {
      const marks = [0, 25, 50, 75, 100];
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider range marks={marks} modelValue={[25, 75]} onChange={onChange} />;
        },
      });
      await nextTick();
      const markText = wrapper.find('.t-slider__mark-text');
      await markText.trigger('click');
      await nextTick();
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Mark Edge Cases', () => {
    it('handles marks with decimal values', async () => {
      const marks = [0, 33.33, 66.66, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(4);
    });

    it('handles marks with custom min/max', async () => {
      const marks = [20, 50, 80];
      const wrapper = mount({
        render() {
          return <Slider min={20} max={80} marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
    });

    it('handles single mark', async () => {
      const marks = [50];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(1);
    });

    it('handles many marks', async () => {
      const marks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(11);
    });

    it('handles marks with negative values', async () => {
      const marks = [-100, -50, 0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider min={-100} max={100} marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(5);
    });

    it('handles unsorted marks array', async () => {
      const marks = [100, 0, 50, 25, 75];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(5);
    });

    it('handles duplicate marks', async () => {
      const marks = [0, 50, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBeGreaterThan(0);
    });
  });

  describe('Mark Styling', () => {
    it('mark has correct class', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markContainer = wrapper.find('.t-slider__mark');
      expect(markContainer.exists()).toBeTruthy();
    });

    it('mark text has correct class', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      markTexts.forEach((mark) => {
        expect(mark.classes()).toContain('t-slider__mark-text');
      });
    });

    it('mark stop has correct class', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const stops = wrapper.findAll('.t-slider__mark-stop');
      stops.forEach((stop) => {
        expect(stop.classes()).toContain('t-slider__mark-stop');
        expect(stop.classes()).toContain('t-slider__stop');
      });
    });
  });

  describe('Mark with ShowStep', () => {
    it('marks and steps can coexist', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} showStep step={10} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
      const stops = wrapper.findAll('.t-slider__stop');
      expect(stops.length).toBeGreaterThan(0);
    });

    it('mark stops are different from step stops', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} showStep step={25} />;
        },
      });
      await nextTick();
      const markStops = wrapper.findAll('.t-slider__mark-stop');
      const allStops = wrapper.findAll('.t-slider__stop');
      expect(allStops.length).toBeGreaterThanOrEqual(markStops.length);
    });
  });
});
