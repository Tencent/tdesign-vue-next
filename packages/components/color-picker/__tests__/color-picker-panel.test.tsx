import { ColorObject, ColorPickerPanel } from '@tdesign/components/color-picker';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick, ref } from 'vue';

// every component needs four parts: props/events/slots/functions.
describe('ColorPickerPanel', () => {
  describe(':props', () => {
    it(':colorModes', () => {
      const modes = ref(['monochrome']);
      const wrapper = mount(() => <ColorPickerPanel color-modes={modes.value} />);
      // 单模式不生成mode dom
      expect(wrapper.find('.t-color-picker__mode').exists()).toBe(false);
    });

    it(':disabled', () => {
      const disabled = ref(true);
      const wrapper = mount(() => <ColorPickerPanel disabled={disabled.value} />);
      expect(wrapper.classes()).toContain('t-is-disabled');
    });

    it(':enableAlpha', () => {
      const enableAlpha = ref(true);
      const wrapper = mount(() => <ColorPickerPanel enable-alpha={enableAlpha.value} />);
      expect(wrapper.find('.t-color-picker__alpha').exists()).toBe(true);
    });

    it(':enableMultipleGradient', async () => {
      const testColor = ref('linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)');

      const wrapper = mount(
        <ColorPickerPanel v-model={testColor.value} color-modes={['linear-gradient']} enableMultipleGradient={true} />,
      );
      const sliderNode = wrapper.find('.gradient-thumbs').element;

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        clientX: 10,
        clientY: 0,
      });

      sliderNode.dispatchEvent(clickEvent);
      await nextTick();
      expect(sliderNode.children.length).toBe(3);
    });

    it(':format', () => {
      const color = ref('red');

      const wrapper = mount(() => <ColorPickerPanel v-model={color.value} format={'HEX'} />);

      const input = wrapper.find('.t-input__inner');
      expect(input.exists()).toBeTruthy();
      expect((input.element as HTMLInputElement).value).toBe('HEX');
      wrapper.unmount();
    });

    it(':recentColors', () => {
      const recentColors = ref(['red', 'yellow', 'blue']);
      const wrapper = mount(() => <ColorPickerPanel recent-colors={recentColors.value} />);
      const swatch = wrapper.find('.t-color-picker__swatches');
      const items = swatch.findAll('.t-color-picker__swatches--item');
      expect(items.length).toBe(recentColors.value.length);
    });

    it(':defaultRecentColors', () => {
      const recentColors = ref(['red', 'yellow', 'blue']);
      const wrapper = mount(() => <ColorPickerPanel defaultRecentColors={recentColors.value} />);
      const swatch = wrapper.find('.t-color-picker__swatches');
      const items = swatch.findAll('.t-color-picker__swatches--item');
      expect(items.length).toBe(recentColors.value.length);
    });

    it(':showPrimaryColorPreview', () => {
      const wrapper = mount(() => <ColorPickerPanel show-primary-color-preview />);
      expect(wrapper.find('.t-color-picker__sliders-preview').exists()).toBe(true);
    });

    it(':swatchColors', () => {
      const wrapper = mount(() => <ColorPickerPanel recent-colors={null} swatch-colors={null} />);
      const swatches = wrapper.findAll('.t-color-picker__swatches');
      expect(swatches.length).toBe(0);
    });

    it(':value', async () => {
      const value = '#0052d9';
      const wrapper = mount(() => <ColorPickerPanel v-model={value} format={'HEX'} />);
      const input = wrapper.findAll('.t-input__inner')[1];
      expect((input.element as HTMLInputElement).value).toBe('#0052d9');
    });

    it(':defaultValue', async () => {
      const wrapper = mount(() => <ColorPickerPanel defaultValue="#0052d9" format={'HEX'} />);
      const input = wrapper.findAll('.t-input__inner')[1];
      expect((input.element as HTMLInputElement).value).toBe('#0052d9');
    });
  });

  describe(':events', () => {
    it('change', async () => {
      const value = ref('#0052d9');
      const handleChange = (val: string) => {
        value.value = val;
      };
      const recentColors = ref(['red']);

      const wrapper = mount(() => (
        <ColorPickerPanel recent-colors={recentColors.value} v-model={value.value} onChange={handleChange} />
      ));
      const swatch = wrapper.find('.t-color-picker__swatches');
      const item = swatch.find('.t-color-picker__swatches--item');
      item.trigger('click');
      await nextTick();
      expect(value.value).toBe('rgb(255, 0, 0)');
    });
    // it('palette-bar-change', async () => {
    //   const value = ref('#0052d9');
    //   const result = ref<ColorObject>();

    //   const handlePaletteBarChange = (context: { color: ColorObject }) => {
    //     result.value = context.color;
    //   };

    //   const wrapper = mount(() => (
    //     <ColorPickerPanel v-model={value.value} onPaletteBarChange={handlePaletteBarChange} />
    //   ));
    //   await nextTick();

    //   const slider = wrapper.find('.t-color-picker__rail');

    //   const clickEvent = new MouseEvent('click', {
    //     bubbles: true,
    //     cancelable: true,
    //     clientX: 20,
    //   });

    //   slider.element.dispatchEvent(clickEvent);
    //   await nextTick();
    //   expect(result.value).toMatchSnapshot();
    // });
    it('recent-colors-change', async () => {
      const value = ref('#0052d9');
      const recentColors = ['red'];
      const result = ref<Array<string>>([]);
      const handleRecentColorsChange = (value: Array<string>) => {
        result.value = value;
      };

      const wrapper = mount(() => (
        <ColorPickerPanel
          recent-colors={recentColors}
          v-model={value.value}
          onRecentColorsChange={handleRecentColorsChange}
        />
      ));

      const swatch = wrapper.find('.t-color-picker__swatches');
      const items = swatch.findAll('.t-color-picker__icon');
      items[0].trigger('click');
      await nextTick();

      expect(result.value).toEqual(['rgba(0, 82, 217, 1)', 'red']);
    });
  });
});
