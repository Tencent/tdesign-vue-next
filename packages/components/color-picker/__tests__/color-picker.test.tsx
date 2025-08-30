import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { ref, nextTick, render, reactive } from 'vue';
import { ColorPicker, Input, Popup } from '@tdesign/components';
import ColorPanel from '@tdesign/components/color-picker/components/panel';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { sleep } from '@tdesign/internal-utils';
import { mountColorPickerAndTriggerPanel } from './mount';
import { simulateInputChange } from '@tdesign/internal-tests';

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

      const { wrapper: wrapper2, panel: panel2 } = await mountColorPickerAndTriggerPanel({
        props: { colorModes: ['monochrome'], value },
      });
      await wrapper2.setProps({ colorModes: ['monochrome'] });
      const group2 = panel2.find('.t-radio-group');
      expect(group2.exists()).toBeFalsy();
      const slider = panel2.find('.t-color-picker__sliders-wrapper');
      expect(slider.exists()).toBeTruthy();

      const { wrapper: wrapper3, panel: panel3 } = await mountColorPickerAndTriggerPanel({
        props: { colorModes: ['linear-gradient'], value },
      });
      await wrapper3.setProps({ colorModes: ['linear-gradient'] });
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

    describe(':format[HEX/HEX8/RGB/RGBA/HSL/HSLA/HSV/HSVA/CMYK/CSS]', async () => {
      // ps: enableAlpha true: HEX8/RGBA/HSLA/HSVA
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
      const value = ref('#0052d9');
      const result = ref<string>('');
      const handlePaletteBarChange = vi.fn();

      await nextTick();
      const popupVisible = reactive({ visible: false });
      const wrapper = mount(
        <ColorPicker v-model={value.value} onPaletteBarChange={handlePaletteBarChange} popupProps={popupVisible} />,
      );
      popupVisible.visible = true;
      await nextTick();
      const pp = wrapper.getComponent(ColorPanel);
      // expect(pp).toMatchInlineSnapshot();
      // const panel = document.body.querySelector('.t-color-picker__panel')
      // const slider = panel.querySelector('.t-color-picker__rail');
      // expect(handlePaletteBarChange).toBeCalled()
    });

    it('recent-colors-change', async () => {
      const recentColors = ref(['red']);
      const handleRecentColorsChange = vi.fn();

      const props = reactive({
        value: '0052d9',
        recentColors: ['red'],
        onRecentColorsChange: handleRecentColorsChange,
      });
      const { panel, getPanel } = await mountColorPickerAndTriggerPanel({
        props,
      });

      const swatch = panel.find('.t-color-picker__swatches');
      const item = swatch.find('.t-color-picker__icon');
      await nextTick();
      props.recentColors = ['yellow'];
      await nextTick();
      // expect(handleRecentColorsChange).toBeCalled();
      await nextTick();

      // expect(result.value).toEqual(['rgba(0, 82, 217, 1)', 'red']);
    });
  });
});
