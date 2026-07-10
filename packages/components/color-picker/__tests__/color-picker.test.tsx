import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import { ColorPicker } from '@tdesign/components';
import type { ColorObject } from '@tdesign/components/color-picker';
import colorPickerProps from '@tdesign/components/color-picker/props';
import ColorPanel from '@tdesign/components/color-picker/components/panel';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { mountColorPickerAndTriggerPanel } from './mount';
import { clickAtPosition, simulateInputChange, userEvent } from '@tdesign/internal-tests';

describe('ColorPicker', () => {
  describe(':props', () => {
    it(':borderless[boolean]', async () => {
      const wrapper = mount(<ColorPicker borderless={false}></ColorPicker>);
      expect(wrapper.find('.t-input--borderless').exists()).toBe(false);
      await wrapper.setProps({ borderless: true });
      expect(wrapper.find('.t-input--borderless').exists()).toBe(true);
    });

    it(':clearable[boolean]', async () => {
      const wrapper = mount(<ColorPicker value="red" clearable={true} />);
      await wrapper.find('.t-input').trigger('mouseenter');
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      expect(closeIcon.exists()).toBeTruthy();
    });

    it(':colorModes["monochrome", "linear-gradient"]', async () => {
      const value = '#0052d9';
      const { panel: panel1 } = await mountColorPickerAndTriggerPanel({ props: { value } });
      const group1 = panel1.find('.t-radio-group');
      expect(group1.exists()).toBeTruthy();
      const labes = group1.findAll('.t-radio-button__label');
      expect(labes[0].text()).toBe('单色');
      expect(labes[1].text()).toBe('渐变');

      const { panel: panel2 } = await mountColorPickerAndTriggerPanel({
        props: { colorModes: ['monochrome'], value },
      });
      const group2 = panel2.find('.t-radio-group');
      expect(group2.exists()).toBeFalsy();
      const slider = panel2.find('.t-color-picker__sliders-wrapper');
      expect(slider.exists()).toBeTruthy();

      const { panel: panel3 } = await mountColorPickerAndTriggerPanel({
        props: { colorModes: ['linear-gradient'], value },
      });
      const group3 = panel3.find('.t-radio-group');
      expect(group3.exists()).toBeFalsy();
      const degree = panel3.find('.t-color-picker__gradient-degree');
      expect(degree.exists()).toBeTruthy();
    });

    it(':disabled[boolean]', () => {
      const wrapper = mount(<ColorPicker disabled={true} />);
      expect(wrapper.find('.t-input').classes()).toContain('t-is-disabled');
    });

    it(':enableAlpha[boolean]', async () => {
      const value = '#0052d9';
      const { panel: panel1 } = await mountColorPickerAndTriggerPanel({ props: { value } });
      const alpha1 = panel1.find('.t-color-picker__alpha');
      expect(alpha1.exists()).toBeFalsy();

      const { panel: panel2 } = await mountColorPickerAndTriggerPanel({ props: { value, enableAlpha: true } });
      const alpha2 = panel2.find('.t-color-picker__alpha');
      expect(alpha2.exists()).toBeTruthy();
    });

    it(':enableMultipleGradient[boolean]', async () => {
      const value = ref('linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)');

      const { panel: panel1 } = await mountColorPickerAndTriggerPanel({
        props: { value: value.value, colorModes: ['linear-gradient'] },
      });

      const sliderNode1 = panel1.find('.gradient-thumbs');
      sliderNode1.element.dispatchEvent(new MouseEvent('click', { clientX: 10, clientY: 0 }));
      await nextTick();
      expect(sliderNode1.element.children.length).toBe(3);

      sliderNode1.element.dispatchEvent(new MouseEvent('click', { clientX: 20, clientY: 0 }));
      await nextTick();
      expect(sliderNode1.element.children.length).toBe(4);

      const { panel: panel2 } = await mountColorPickerAndTriggerPanel({
        props: { value: value.value, colorModes: ['linear-gradient'], enableMultipleGradient: false },
      });

      const sliderNode2 = panel2.find('.gradient-thumbs');
      sliderNode2.element.dispatchEvent(new MouseEvent('click', { clientX: 10, clientY: 0 }));
      await nextTick();
      expect(sliderNode2.element.children.length).toBe(2);
    });

    describe(':eyeDropper[boolean]', () => {
      const stubEyeDropper = (hex = '#ff6600') => {
        vi.stubGlobal(
          'EyeDropper',
          class {
            // eslint-disable-next-line class-methods-use-this
            open() {
              return Promise.resolve({ sRGBHex: hex });
            }
          },
        );
      };

      afterEach(() => {
        vi.unstubAllGlobals();
        // 清理本组用例挂载的 Popup 浮层，避免残留 DOM 遮挡后续用例的 trigger
        document.body.innerHTML = '';
      });

      it('does not render eyedropper button by default', async () => {
        stubEyeDropper();
        const { panel } = await mountColorPickerAndTriggerPanel({ props: { value: '#0052d9' } });
        expect(panel.find('.t-color-picker__eyedropper').exists()).toBeFalsy();
      });

      it('picks color and emits change with trigger eyedropper', async () => {
        stubEyeDropper('#ff6600');
        const onChange = vi.fn();
        const { panel } = await mountColorPickerAndTriggerPanel({
          props: { value: '#0052d9', eyeDropper: true, onChange },
        });
        const btn = panel.find('.t-color-picker__eyedropper');
        expect(btn.exists()).toBeTruthy();
        expect(btn.classes()).not.toContain('t-is-disabled');
        await btn.trigger('click');
        await nextTick();
        expect(onChange).toHaveBeenCalledTimes(1);
        const [, context] = onChange.mock.calls[0];
        expect(context.trigger).toBe('eyedropper');
        expect(context.color.hex).toBe('#ff6600');
      });

      it('renders disabled button when EyeDropper API is not supported', async () => {
        // jsdom 默认无 EyeDropper 全局对象
        const onChange = vi.fn();
        const { panel } = await mountColorPickerAndTriggerPanel({
          props: { value: '#0052d9', eyeDropper: true, onChange },
        });
        const btn = panel.find('.t-color-picker__eyedropper');
        expect(btn.exists()).toBeTruthy();
        expect(btn.classes()).toContain('t-is-disabled');
        expect((btn.element as HTMLButtonElement).disabled).toBe(true);
        await btn.trigger('click');
        await nextTick();
        expect(onChange).not.toHaveBeenCalled();
      });

      it('keeps current alpha when enableAlpha is true', async () => {
        stubEyeDropper('#ff6600');
        const onChange = vi.fn();
        const { panel } = await mountColorPickerAndTriggerPanel({
          props: { value: 'rgba(0, 82, 217, 0.5)', format: 'RGBA', enableAlpha: true, eyeDropper: true, onChange },
        });
        await panel.find('.t-color-picker__eyedropper').trigger('click');
        await nextTick();
        const [, context] = onChange.mock.calls[0];
        expect(context.color.hex).toBe('#ff6600');
        expect(context.color.alpha).toBe(0.5);
      });

      it('renders button even when only one color mode', async () => {
        stubEyeDropper();
        const { panel } = await mountColorPickerAndTriggerPanel({
          props: { value: '#0052d9', colorModes: ['monochrome'], eyeDropper: true },
        });
        expect(panel.find('.t-radio-group').exists()).toBeFalsy();
        expect(panel.find('.t-color-picker__eyedropper').exists()).toBeTruthy();
      });

      it('does not emit change when user cancels picking', async () => {
        vi.stubGlobal(
          'EyeDropper',
          class {
            // eslint-disable-next-line class-methods-use-this
            open() {
              return Promise.reject(new DOMException('User aborted', 'AbortError'));
            }
          },
        );
        const onChange = vi.fn();
        const { panel } = await mountColorPickerAndTriggerPanel({
          props: { value: '#0052d9', eyeDropper: true, onChange },
        });
        await panel.find('.t-color-picker__eyedropper').trigger('click');
        await nextTick();
        expect(onChange).not.toHaveBeenCalled();
      });

      it('updates only the selected gradient stop in gradient mode', async () => {
        stubEyeDropper('#ff6600');
        const onChange = vi.fn();
        const { panel } = await mountColorPickerAndTriggerPanel({
          props: {
            value: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
            colorModes: ['linear-gradient'],
            eyeDropper: true,
            onChange,
          },
        });
        await panel.find('.t-color-picker__eyedropper').trigger('click');
        await nextTick();
        const [value, context] = onChange.mock.calls[0];
        expect(context.trigger).toBe('eyedropper');
        // 仍为渐变值，仅更新选中的渐变节点，而非把整体颜色替换为单色
        expect(value).toContain('linear-gradient');
        expect(value).toContain('255, 102, 0');
      });
    });

    describe(':format[HEX/HEX8/RGB/RGBA/HSL/HSLA/HSV/HSVA/CMYK/CSS]', async () => {
      // ps: enableAlpha true: HEX8/RGBA/HSLA/HSVA
      it('format:validator', () => {
        const validator = colorPickerProps.format.validator;
        expect(validator(undefined)).toBe(true);
      });

      const color = ref('red');
      const resultWithNoAlpha = {
        HEX: '#ff0000',
        RGB: '255,0,0',
        HSL: '0,100,50',
        HSV: '0,100,100',
        CMYK: '0,100,100,0',
        CSS: 'rgba(255, 0, 0, 1)',
      } as const;
      const resultWithAlpha = {
        HEX8: '#ff0000ff,100%',
        RGBA: '255,0,0,100%',
        HSLA: '0,100,50,100%',
        HSVA: '0,100,100,100%',
      } as const;

      Object.keys(resultWithNoAlpha).forEach((key: keyof typeof resultWithNoAlpha) => {
        it(`format: ${key}`, async () => {
          const { panel } = await mountColorPickerAndTriggerPanel({
            props: { value: color.value, format: key, colorModes: ['monochrome'] },
          });
          const inputs = panel.find('.input-group').findAll('input');
          await nextTick();
          const data = inputs.reduce((pre, curr) => pre + curr.element.value.trim() + ',', '');
          expect(data.slice(0, -1)).toBe(resultWithNoAlpha[key]);
        });
      });

      Object.keys(resultWithAlpha).forEach((key: keyof typeof resultWithAlpha) => {
        it(`format: ${key}`, async () => {
          const { panel } = await mountColorPickerAndTriggerPanel({
            props: { value: color.value, format: key, colorModes: ['monochrome'], enableAlpha: true },
          });
          const inputs = panel.find('.input-group').findAll('input');
          await nextTick();
          const data = inputs.reduce((pre, curr) => pre + curr.element.value.trim() + ',', '');
          expect(data.slice(0, -1)).toBe(resultWithAlpha[key]);
        });
      });
    });

    it(':recentColors[array<string>]', async () => {
      const recentColors = ['red', 'yellow', 'blue'];
      const { panel } = await mountColorPickerAndTriggerPanel({
        props: { value: '0052d9', recentColors },
      });
      const items = await panel.find('.t-color-picker__swatches--items').findAll('.t-color-picker__swatches--item');
      expect(items.length).toBe(recentColors.length);
      const getItemsBgColor = (index: number) =>
        getComputedStyle(items[index].find('.t-color-picker__swatches--inner').element).backgroundColor;
      expect(getItemsBgColor(0)).toBe(recentColors[0]);
      expect(getItemsBgColor(1)).toBe(recentColors[1]);
      expect(getItemsBgColor(2)).toBe(recentColors[2]);
    });

    it(':defaultRecentColors[array<string>]', async () => {
      const recentColors = ['red', 'yellow', 'blue'];
      const { panel } = await mountColorPickerAndTriggerPanel({
        props: { value: '0052d9', defaultRecentColors: recentColors },
      });
      const items = await panel.find('.t-color-picker__swatches--items').findAll('.t-color-picker__swatches--item');
      expect(items.length).toBe(recentColors.length);
      const getItemsBgColor = (index: number) =>
        getComputedStyle(items[index].find('.t-color-picker__swatches--inner').element).backgroundColor;
      expect(getItemsBgColor(0)).toBe(recentColors[0]);
      expect(getItemsBgColor(1)).toBe(recentColors[1]);
      expect(getItemsBgColor(2)).toBe(recentColors[2]);
    });

    it(':selectInputProps[object]', async () => {
      const { panel } = await mountColorPickerAndTriggerPanel({
        props: { value: '0052d9', selectInputProps: { disabled: true } },
      });
      const selectInput = panel.find('.t-color-picker__format').find('.t-input');
      expect(selectInput.classes()).toContain('t-is-disabled');
    });

    it(':showPrimaryColorPreview[boolean]', async () => {
      const { panel: panel1 } = await mountColorPickerAndTriggerPanel({
        props: { value: '0052d9' },
      });
      expect(panel1.find('.t-color-picker__sliders-preview').exists()).toBeTruthy();

      const { panel: panel2 } = await mountColorPickerAndTriggerPanel({
        props: { value: '0052d9', showPrimaryColorPreview: false },
      });
      expect(panel2.find('.t-color-picker__sliders-preview').exists()).toBeFalsy();
    });

    it(':size[small/medium/large]', async () => {
      const validator = colorPickerProps.size.validator;
      expect(validator(undefined)).toBe(true);

      const wrapper = mount(<ColorPicker size={'small'} />);
      expect(wrapper.find('.t-input').classes()).toContain('t-size-s');

      await wrapper.setProps({ size: 'large' });
      expect(wrapper.find('.t-input').classes()).toContain('t-size-l');
    });

    it(':swatchColors[array<string>]', async () => {
      const swatchColors = ['red', 'green', 'yellow'];
      const { panel } = await mountColorPickerAndTriggerPanel({
        props: { value: '0052d9', swatchColors },
      });

      const swatchs = panel.findAll('.t-color-picker__swatches--items');
      expect(swatchs[1].element.children.length).toBe(swatchColors.length);

      const items = await panel
        .findAll('.t-color-picker__swatches--items')[1]
        .findAll('.t-color-picker__swatches--item');
      const getItemsBgColor = (index: number) =>
        getComputedStyle(items[index].find('.t-color-picker__swatches--inner').element).backgroundColor;
      expect(getItemsBgColor(0)).toBe(swatchColors[0]);
      expect(getItemsBgColor(1)).toBe(swatchColors[1]);
      expect(getItemsBgColor(2)).toBe(swatchColors[2]);
    });
  });

  describe(':events', () => {
    it('change', async () => {
      const data = ref('rgb(0, 82, 217)');
      const fn = vi.fn();
      const wrapper = mount(<ColorPicker v-model={data.value} onChange={fn} />);
      const input = wrapper.find('.t-input__wrap').find('input');
      const color = 'rgb(255, 255, 255)';
      simulateInputChange(input.element, color);
      expect(fn).toBeCalled();
      expect(data.value).toBe(color);
    });

    it('clear', async () => {
      const value = ref('#0052d9');
      const fn = vi.fn();
      const wrapper = mount(<ColorPicker v-model={value.value} clearable={true} onClear={fn} />);
      await wrapper.find('.t-input').trigger('mouseenter');
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      await closeIcon.trigger('click');
      expect(fn).toBeCalled();
      expect(value.value).toBe('');
      wrapper.unmount();
    });

    it('palette-bar-change', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const handlePaletteBarChange = vi.fn((context: { color: ColorObject }) => {});
      const wrapper = mount(<ColorPicker onPaletteBarChange={handlePaletteBarChange} />);
      const trigger = wrapper.find('.t-color-picker__trigger');
      await userEvent.click(trigger.element);
      const panel = wrapper.findComponent(ColorPanel);
      const railEle = panel.find('.t-color-picker__slider').element as HTMLElement;
      await clickAtPosition({ target: railEle, offsetX: 10, offsetY: 10 });
      expect(handlePaletteBarChange).toBeCalled();
      // TODO: need test the color
      // expect(trigger.find('input')).toBe('')
    });

    it('recent-colors-change', async () => {
      const color = '#0052d9';
      const recentColors = ref([]);
      const handleRecentColorsChange = vi.fn((value: string[]) => {
        recentColors.value = value;
      });
      const wrapper = mount(
        <ColorPicker value={color} recentColors={recentColors.value} onRecentColorsChange={handleRecentColorsChange} />,
      );
      const trigger = wrapper.find('.t-color-picker__trigger');
      await userEvent.click(trigger.element);
      const panel = wrapper.findComponent(ColorPanel);
      await panel.find('.t-color-picker__swatches').find('.t-color-picker__icon').trigger('click');
      expect(handleRecentColorsChange).toBeCalled();
      expect(recentColors.value).toEqual(['rgba(0, 31, 151, 1)']);
    });
  });
});
