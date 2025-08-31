import ColorPanel from '@tdesign/components/color-picker/components/panel/index';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick, ref } from 'vue';
import coloPickePaneProps from '@tdesign/components/color-picker/color-picker-panel-props';
import { clickAtPosition, simulateInputChange, userEvent } from '@tdesign/internal-tests';

/**
 * 因为在 color-picker 中已经测试过基本的 props 了，因此这里只是做额外的测试
 */
describe('ColorPanel', () => {
  describe(':props', () => {
    it(':colorModes[monochrome,linear-gradient]', async () => {
      const wrapper = mount(() => <ColorPanel />);
      expect(wrapper.element).toMatchSnapshot();

      const wrapper2 = mount(() => <ColorPanel colorModes={['linear-gradient']} />);
      expect(wrapper2.element).toMatchSnapshot();

      const wrapper3 = mount(() => (
        <ColorPanel
          value={'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)'}
          colorModes={['monochrome', 'linear-gradient']}
        />
      ));
      expect(wrapper3.element).toMatchSnapshot();
    });

    it(':recentColors[array<string>]', async () => {
      const color = '#0052d9';
      const recentColors = ref(null);
      const handleRecentColorsChange = vi.fn((value: string[]) => {
        recentColors.value = value;
      });
      const wrapper = mount(
        <ColorPanel
          recentColors={recentColors.value}
          onRecentColorsChange={handleRecentColorsChange}
          colorModes={['monochrome']}
        />,
      );
      await wrapper.find('.t-color-picker__swatches').find('.t-color-picker__icon').trigger('click');
      expect(handleRecentColorsChange).toBeCalled();
      expect(recentColors.value).toEqual(['rgba(0, 31, 151, 1)']);
    });
  });
});
