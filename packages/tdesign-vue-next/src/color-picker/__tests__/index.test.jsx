import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick, ref } from '@td/adapter-vue';
import { ColorPicker, ColorPickerPanel } from 'tdesign-vue-next';

// every component needs four parts: props/events/slots/functions.
describe('colorPickerPanel', () => {
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

    it(':recentColors', () => {
      const recentColors = ref(['red', 'yellow', 'blue']);
      const wrapper = mount(() => <ColorPickerPanel recent-colors={recentColors.value} />);
      const swatch = wrapper.find('.t-color-picker__swatches');
      const items = swatch.findAll('.t-color-picker__swatches--item');
      expect(items.length).toBe(recentColors.value.length);
    });

    it(':swatchColors', () => {
      const wrapper = mount(() => <ColorPickerPanel recent-colors={null} swatch-colors={null} />);
      const swatches = wrapper.findAll('.t-color-picker__swatches');
      expect(swatches.length).toBe(0);
    });
  });

  describe(':events', () => {
    it(':change', async () => {
      const value = ref('#0052d9');
      const handleChange = (val) => {
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
  });
});

describe('colorPicker', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <ColorPicker></ColorPicker>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });
});
