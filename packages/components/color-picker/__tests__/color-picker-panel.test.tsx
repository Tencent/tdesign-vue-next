import { ColorObject, ColorPickerChangeTrigger, ColorPickerPanel } from '@tdesign/components/color-picker';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import coloPickePaneProps from '@tdesign/components/color-picker/color-picker-panel-props';

/**
 * 因为在 color-picker 中已经测试过基本的 props 了，因此这里只是做额外的测试
 */
describe('ColorPickerPanel', () => {
  describe(':ui', () => {
    it(':mount', () => {
      const wrapper = mount(() => <ColorPickerPanel />);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe(':props', () => {
    it(':format', () => {
      const validator = coloPickePaneProps.format.validator;
      expect(validator(undefined)).toBe(true);
    });

    it(':colorModes[monochrome,linear-gradient]', async () => {
      const wrapper = mount(() => <ColorPickerPanel />);
      expect(wrapper.element).toMatchSnapshot();

      const wrapper2 = mount(() => <ColorPickerPanel colorModes={['linear-gradient']} />);
      expect(wrapper2.element).toMatchSnapshot();

      const wrapper3 = mount(() => (
        <ColorPickerPanel
          value={'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)'}
          colorModes={['monochrome', 'linear-gradient']}
        />
      ));
      expect(wrapper3.element).toMatchSnapshot();
    });

    it(':recentColors[array<string>]', async () => {
      const recentColors = ref(null);
      const handleRecentColorsChange = vi.fn((value: string[]) => {
        recentColors.value = value;
      });
      const wrapper = mount(
        <ColorPickerPanel recentColors={recentColors.value} onRecentColorsChange={handleRecentColorsChange} />,
      );
      expect(wrapper.find('.t-color-picker__swatches .t-color-picker__icon').exists()).toBeFalsy();
    });

    it(':value[string]', async () => {
      const value = ref('#0052d9');
      const wrapper = mount(<ColorPickerPanel v-model={value} />);
      value.value = 'red';
    });
  });

  describe(':event', () => {
    it(':change', async () => {
      const fn1 = vi.fn((value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger }) => {});
      const wrapper = mount(() => <ColorPickerPanel onChange={fn1} colorModes={['monochrome']} format={'HEX'} />);
      const swatches = wrapper.findAll('.t-color-picker__swatches');
      const items = swatches[1].findAll('.t-color-picker__swatches--item');
      expect(items.length).toBe(40);
      await items[0].trigger('click');
      expect(fn1).toBeCalled();
      const args1 = fn1.mock.calls[0];
      expect(args1[0]).toBe('#ecf2fe');
      expect(args1[1].trigger).toBe('preset');

      const fn2 = vi.fn((value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger }) => {});
      const wrapper2 = mount(() => <ColorPickerPanel onChange={fn2} colorModes={['linear-gradient']} format={'HEX'} />);
      const degree = wrapper2.find('.t-color-picker__gradient-degree');
      expect(degree.exists()).toBeTruthy();
      const degreeInput = degree.find('input');
      await degreeInput.setValue('80');
      await degreeInput.trigger('keydown.enter');
      expect(fn2).toBeCalled();
      const args2 = fn2.mock.calls[0];
      expect(args2[0]).toBe('linear-gradient(80deg,rgb(241, 29, 0) 0%,rgb(73, 106, 220) 100%)');
      expect(args2[1].trigger).toBe('input');
    });
  });
});
