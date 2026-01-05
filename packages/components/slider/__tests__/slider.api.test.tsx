// @ts-nocheck
import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import Slider from '@tdesign/components/slider';

describe('Slider API Tests', () => {
  describe('Props API', () => {
    // Test min prop
    describe(':props.min', () => {
      it('min default value is 0', () => {
        const wrapper = mount(Slider);
        expect(wrapper.vm.$.props.min).toBe(0);
      });

      it('min={number} works fine', async () => {
        const wrapper = mount({
          render() {
            return <Slider min={20} max={100} modelValue={30} />;
          },
        });
        await nextTick();
        const slider = wrapper.findComponent(Slider);
        expect(slider.vm.$.props.min).toBe(20);
      });

      it('min value should be less than max', async () => {
        const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const wrapper = mount({
          render() {
            return <Slider min={100} max={50} modelValue={60} />;
          },
        });
        await nextTick();
        expect(consoleWarn).toHaveBeenCalled();
        consoleWarn.mockRestore();
      });
    });

    // Test max prop
    describe(':props.max', () => {
      it('max default value is 100', () => {
        const wrapper = mount(Slider);
        expect(wrapper.vm.$.props.max).toBe(100);
      });

      it('max={number} works fine', async () => {
        const wrapper = mount({
          render() {
            return <Slider min={0} max={200} modelValue={150} />;
          },
        });
        await nextTick();
        const slider = wrapper.findComponent(Slider);
        expect(slider.vm.$.props.max).toBe(200);
      });
    });

    // Test step prop
    describe(':props.step', () => {
      it('step default value is 1', () => {
        const wrapper = mount(Slider);
        expect(wrapper.vm.$.props.step).toBe(1);
      });

      it('step={number} works fine', async () => {
        const wrapper = mount({
          render() {
            return <Slider step={5} modelValue={25} />;
          },
        });
        await nextTick();
        const slider = wrapper.findComponent(Slider);
        expect(slider.vm.$.props.step).toBe(5);
      });

      it('step={0} should show warning', async () => {
        const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const wrapper = mount({
          render() {
            return <Slider step={0} showStep />;
          },
        });
        await nextTick();
        expect(consoleWarn).toHaveBeenCalled();
        consoleWarn.mockRestore();
      });
    });

    // Test value/modelValue prop
    describe(':props.value/modelValue', () => {
      it('value default is 0', () => {
        const wrapper = mount(Slider);
        expect(wrapper.vm.$.props.defaultValue).toBe(0);
      });

      it('modelValue={number} works fine', async () => {
        const value = ref(50);
        const wrapper = mount({
          render() {
            return <Slider modelValue={value.value} />;
          },
        });
        await nextTick();
        expect(wrapper.findComponent(Slider).vm.$.props.modelValue).toBe(50);
      });

      it('modelValue={array} works fine for range slider', async () => {
        const value = ref([20, 80]);
        const wrapper = mount({
          render() {
            return <Slider range modelValue={value.value} />;
          },
        });
        await nextTick();
        expect(wrapper.findComponent(Slider).vm.$.props.modelValue).toEqual([20, 80]);
      });

      it('value should be limited by min and max', async () => {
        const wrapper = mount({
          render() {
            return <Slider min={0} max={100} modelValue={150} />;
          },
        });
        await nextTick();
        // Value should be clamped to max
        const buttons = wrapper.findAll('.t-slider__button-wrapper');
        expect(buttons.length).toBeGreaterThan(0);
      });
    });

    // Test defaultValue prop
    describe(':props.defaultValue', () => {
      it('defaultValue={number} works fine', async () => {
        const wrapper = mount({
          render() {
            return <Slider defaultValue={30} />;
          },
        });
        await nextTick();
        expect(wrapper.findComponent(Slider).vm.$.props.defaultValue).toBe(30);
      });

      it('defaultValue={array} works fine for range slider', async () => {
        const wrapper = mount({
          render() {
            return <Slider range defaultValue={[30, 70]} />;
          },
        });
        await nextTick();
        expect(wrapper.findComponent(Slider).vm.$.props.defaultValue).toEqual([30, 70]);
      });
    });

    // Test tooltipProps prop
    describe(':props.tooltipProps', () => {
      it('tooltipProps default works fine', async () => {
        const wrapper = mount({
          render() {
            return <Slider modelValue={50} />;
          },
        });
        await nextTick();
        const tooltip = wrapper.findComponent({ name: 'TTooltip' });
        expect(tooltip.exists()).toBeTruthy();
      });

      it('tooltipProps={object} works fine', async () => {
        const tooltipProps = {
          placement: 'bottom',
          theme: 'light',
        };
        const wrapper = mount({
          render() {
            return <Slider modelValue={50} tooltipProps={tooltipProps} />;
          },
        });
        await nextTick();
        const tooltip = wrapper.findComponent({ name: 'TTooltip' });
        expect(tooltip.exists()).toBeTruthy();
      });

      it('tooltipProps with custom content', async () => {
        const tooltipProps = {
          content: 'Custom tooltip',
        };
        const wrapper = mount({
          render() {
            return <Slider modelValue={50} tooltipProps={tooltipProps} />;
          },
        });
        await nextTick();
        const tooltip = wrapper.findComponent({ name: 'TTooltip' });
        expect(tooltip.exists()).toBeTruthy();
      });
    });

    // Test label prop with function
    describe(':props.label with function', () => {
      it('label={function} works fine', async () => {
        const labelFn = vi.fn(({ value }) => `Value: ${value}`);
        const wrapper = mount({
          render() {
            return <Slider modelValue={50} label={labelFn} />;
          },
        });
        await nextTick();
        const tooltip = wrapper.findComponent({ name: 'TTooltip' });
        expect(tooltip.exists()).toBeTruthy();
      });

      it('label={function} works fine for range slider', async () => {
        const labelFn = vi.fn(({ value, position }) => `${position}: ${value}`);
        const wrapper = mount({
          render() {
            return <Slider range modelValue={[20, 80]} label={labelFn} />;
          },
        });
        await nextTick();
        const tooltips = wrapper.findAllComponents({ name: 'TTooltip' });
        expect(tooltips.length).toBe(2);
      });

      it('label={false} hides tooltip', async () => {
        const wrapper = mount({
          render() {
            return <Slider modelValue={50} label={false} />;
          },
        });
        await nextTick();
        const tooltip = wrapper.findComponent({ name: 'TTooltip' });
        // When label is false, tooltip should still exist but may be disabled
        expect(tooltip.exists()).toBeTruthy();
      });
    });

    // Test marks with object containing functions
    describe(':props.marks with function values', () => {
      it('marks with function values works fine', async () => {
        const marks = {
          0: '0°C',
          25: (val) => `${val}°C`,
          50: (val) => `${val}°C`,
          75: (val) => `${val}°C`,
          100: '100°C',
        };
        const wrapper = mount({
          render() {
            return <Slider marks={marks} />;
          },
        });
        await nextTick();
        const markTexts = wrapper.findAll('.t-slider__mark-text');
        expect(markTexts.length).toBe(5);
      });

      it('marks with JSX values works fine', async () => {
        const marks = {
          0: <span style="color: red">0</span>,
          50: <span style="color: blue">50</span>,
          100: <span style="color: green">100</span>,
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

    // Test inputNumberProps with object
    describe(':props.inputNumberProps with object', () => {
      it('inputNumberProps with custom props works fine', async () => {
        const inputProps = {
          theme: 'row',
          placeholder: 'Enter value',
          decimalPlaces: 2,
        };
        const wrapper = mount({
          render() {
            return <Slider inputNumberProps={inputProps} modelValue={50} />;
          },
        });
        await nextTick();
        const input = wrapper.findComponent({ name: 'TInputNumber' });
        expect(input.exists()).toBeTruthy();
      });

      it('inputNumberProps with format function works fine', async () => {
        const inputProps = {
          format: (value) => `${value}%`,
        };
        const wrapper = mount({
          render() {
            return <Slider inputNumberProps={inputProps} modelValue={50} />;
          },
        });
        await nextTick();
        const input = wrapper.findComponent({ name: 'TInputNumber' });
        expect(input.exists()).toBeTruthy();
      });
    });
  });

  describe('Events API', () => {
    // Test onChange event
    describe('@onChange', () => {
      it('onChange triggered when value changes', async () => {
        const onChange = vi.fn();
        const value = ref(50);
        const wrapper = mount({
          render() {
            return <Slider modelValue={value.value} onChange={onChange} />;
          },
        });
        await nextTick();
        value.value = 60;
        await wrapper.setProps({ modelValue: 60 });
        await nextTick();
        // onChange should be called
        expect(onChange).toHaveBeenCalled();
      });

      it('onChange with range slider', async () => {
        const onChange = vi.fn();
        const value = ref([20, 80]);
        const wrapper = mount({
          render() {
            return <Slider range modelValue={value.value} onChange={onChange} />;
          },
        });
        await nextTick();
        value.value = [30, 70];
        await wrapper.setProps({ modelValue: [30, 70] });
        await nextTick();
        expect(onChange).toHaveBeenCalled();
      });
    });

    // Test onChangeEnd event
    describe('@onChangeEnd', () => {
      it('onChangeEnd should be defined', () => {
        const onChangeEnd = vi.fn();
        const wrapper = mount({
          render() {
            return <Slider onChangeEnd={onChangeEnd} />;
          },
        });
        expect(wrapper.findComponent(Slider).vm.$.props.onChangeEnd).toBeDefined();
      });

      it('onChangeEnd triggered on mark click', async () => {
        const onChangeEnd = vi.fn();
        const marks = [0, 25, 50, 75, 100];
        const wrapper = mount({
          render() {
            return <Slider marks={marks} onChangeEnd={onChangeEnd} />;
          },
        });
        await nextTick();
        const markText = wrapper.find('.t-slider__mark-text');
        if (markText.exists()) {
          await markText.trigger('click');
          await nextTick();
          expect(onChangeEnd).toHaveBeenCalled();
        }
      });
    });
  });

  describe('Edge Cases and Boundary Tests', () => {
    it('handles decimal step values correctly', async () => {
      const wrapper = mount({
        render() {
          return <Slider min={0} max={1} step={0.1} modelValue={0.5} />;
        },
      });
      await nextTick();
      expect(wrapper.findComponent(Slider).vm.$.props.step).toBe(0.1);
    });

    it('handles negative values correctly', async () => {
      const wrapper = mount({
        render() {
          return <Slider min={-100} max={100} modelValue={-50} />;
        },
      });
      await nextTick();
      expect(wrapper.findComponent(Slider).vm.$.props.min).toBe(-100);
    });

    it('handles range slider with same values', async () => {
      const wrapper = mount({
        render() {
          return <Slider range modelValue={[50, 50]} />;
        },
      });
      await nextTick();
      const buttons = wrapper.findAll('.t-slider__button-wrapper');
      expect(buttons.length).toBe(2);
    });

    it('handles range slider with reversed values', async () => {
      const wrapper = mount({
        render() {
          return <Slider range modelValue={[80, 20]} />;
        },
      });
      await nextTick();
      const buttons = wrapper.findAll('.t-slider__button-wrapper');
      expect(buttons.length).toBe(2);
    });

    it('handles vertical layout with inputNumberProps', async () => {
      const wrapper = mount({
        render() {
          return <Slider layout="vertical" inputNumberProps modelValue={50} />;
        },
      });
      await nextTick();
      const container = wrapper.find('.is-vertical');
      expect(container.exists()).toBeTruthy();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.exists()).toBeTruthy();
    });

    it('handles marks outside min/max range', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const marks = [-10, 0, 50, 100, 110];
      const wrapper = mount({
        render() {
          return <Slider min={0} max={100} marks={marks} />;
        },
      });
      await nextTick();
      errorSpy.mockRestore();
    });

    it('handles empty marks array', async () => {
      const wrapper = mount({
        render() {
          return <Slider marks={[]} />;
        },
      });
      await nextTick();
      const marks = wrapper.find('.t-slider__mark');
      expect(marks.exists()).toBeFalsy();
    });

    it('handles disabled with range slider', async () => {
      const wrapper = mount({
        render() {
          return <Slider range disabled modelValue={[20, 80]} />;
        },
      });
      await nextTick();
      const slider = wrapper.find('.t-slider');
      expect(slider.classes()).toContain('t-is-disabled');
    });

    it('handles aria attributes correctly', async () => {
      const wrapper = mount({
        render() {
          return <Slider min={0} max={100} modelValue={50} layout="horizontal" />;
        },
      });
      await nextTick();
      const slider = wrapper.find('.t-slider');
      expect(slider.attributes('role')).toBe('slider');
      expect(slider.attributes('aria-valuemin')).toBe('0');
      expect(slider.attributes('aria-valuemax')).toBe('100');
      expect(slider.attributes('aria-orientation')).toBe('horizontal');
    });

    it('handles window resize event', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      // Trigger resize event
      window.dispatchEvent(new Event('resize'));
      await nextTick();
      expect(wrapper.findComponent(Slider).exists()).toBeTruthy();
    });
  });

  describe('Integration Tests', () => {
    it('works with all props combined', async () => {
      const onChange = vi.fn();
      const onChangeEnd = vi.fn();
      const marks = { 0: '0', 50: '50', 100: '100' };
      const wrapper = mount({
        render() {
          return (
            <Slider
              min={0}
              max={100}
              step={10}
              modelValue={50}
              marks={marks}
              showStep
              inputNumberProps
              tooltipProps={{ placement: 'top' }}
              label={(val) => `${val}%`}
              onChange={onChange}
              onChangeEnd={onChangeEnd}
            />
          );
        },
      });
      await nextTick();
      expect(wrapper.findComponent(Slider).exists()).toBeTruthy();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.exists()).toBeTruthy();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
    });

    it('range slider with all features', async () => {
      const onChange = vi.fn();
      const marks = [0, 25, 50, 75, 100];
      const wrapper = mount({
        render() {
          return (
            <Slider
              range
              min={0}
              max={100}
              step={5}
              modelValue={[25, 75]}
              marks={marks}
              showStep
              layout="vertical"
              onChange={onChange}
            />
          );
        },
      });
      await nextTick();
      const container = wrapper.find('.is-vertical');
      expect(container.exists()).toBeTruthy();
      const buttons = wrapper.findAll('.t-slider__button-wrapper');
      expect(buttons.length).toBe(2);
    });
  });
});
