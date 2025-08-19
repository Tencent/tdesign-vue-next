// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { ref, nextTick } from 'vue';
import { ColorPicker } from '@tdesign/components/color-picker';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';

describe('ColorPicker', () => {
  // test props api
  describe(':props', () => {
    it(':borderless', () => {
      const wrapper = mount({
        render() {
          return <ColorPicker borderless={true}></ColorPicker>;
        },
      });
      expect(wrapper.find('.t-input--borderless').exists()).toBe(true);
    });

    it(':colorModes', async () => {
      const testColor = ref('linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)');

      const wrapper = mount(() => (
        <ColorPicker v-model={testColor.value} format="CSS" color-modes={['linear-gradient']} />
      ));
      await wrapper.vm.$nextTick();

      const span = wrapper.find('.t-input__input-pre');
      expect(span.exists()).toBe(true);
      expect(span.text()).toContain('linear-gradient');
    });

    it(':clearable', async () => {
      const wrapper = mount(<ColorPicker value="red" clearable={true} />);
      wrapper.find('.t-input').trigger('mouseenter');
      await nextTick();

      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      expect(closeIcon.exists()).toBeTruthy();
    });

    it(':disabled', () => {
      const wrapper = mount(<ColorPicker disabled={true} />);
      expect(wrapper.find('.t-input').classes()).toContain('t-is-disabled');
    });

    it(':enableAlpha', async () => {
      const wrapper = mount(<ColorPicker enableAlpha={true} />);
      wrapper.find('.t-input').trigger('click');
      await nextTick();
      const panelNode = document.querySelector('.t-color-picker__alpha');
      expect(panelNode).toBeTruthy();
      wrapper.unmount();
    });

    it(':enableMultipleGradient', async () => {
      const testColor = ref('linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)');

      const wrapper = mount(
        <ColorPicker v-model={testColor.value} color-modes={['linear-gradient']} enableMultipleGradient={true} />,
      );
      wrapper.find('.t-input').trigger('click');
      await nextTick();
      const sliderNode = document.querySelector('.gradient-thumbs');

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        clientX: 10,
        clientY: 0,
      });

      sliderNode.dispatchEvent(clickEvent);

      await nextTick();

      expect(sliderNode.children.length).toBe(3);

      wrapper.unmount();
    });

    it(':format', async () => {
      const color = ref('red');

      const wrapper = mount(() => <ColorPicker v-model={color.value} format={'HEX'} />);
      wrapper.find('.t-input').trigger('click');
      await nextTick();

      const panel = document.querySelector('.t-color-picker__panel');
      const input = panel.querySelector('.t-input__inner') as HTMLInputElement[];
      expect(input.value).toBe('HEX');
      wrapper.unmount();
    });

    it(':recentColors', async () => {
      const recentColors = ref(['red', 'yellow', 'blue']);
      const wrapper = mount(() => <ColorPicker recent-colors={recentColors.value} />);
      wrapper.find('.t-input').trigger('click');
      await nextTick();

      const panel = document.querySelector('.t-color-picker__panel');
      const items = panel.querySelector('.t-color-picker__swatches--items');
      expect(items.children.length).toBe(recentColors.value.length);

      recentColors.value = [];
      await nextTick();
      expect(items.children.length).toBe(0);
      wrapper.unmount();
    });

    it(':defaultRecentColors', async () => {
      const recentColors = ref(['red', 'yellow', 'blue']);
      const wrapper = mount(() => <ColorPicker defaultRecentColors={recentColors.value} />);
      wrapper.find('.t-input').trigger('click');
      await nextTick();

      const panel = document.querySelector('.t-color-picker__panel');
      const items = panel.querySelector('.t-color-picker__swatches--items');
      expect(items.children.length).toBe(recentColors.value.length);
      wrapper.unmount();
    });

    it(':size', () => {
      const wrapper = mount(<ColorPicker size={'small'} />);
      expect(wrapper.find('.t-input').classes()).toContain('t-size-s');
    });

    it(':showPrimaryColorPreview', async () => {
      const wrapper = mount(<ColorPicker show-primary-color-preview={false} />);
      wrapper.find('.t-input').trigger('click');
      await nextTick();

      const panel = document.querySelector('.t-color-picker__panel');
      const preview = panel.querySelector('.t-color-picker__sliders-preview');
      expect(preview).toBeFalsy();
      wrapper.unmount();
    });

    it(':swatchColors', async () => {
      const systemColors = ref(['red', 'green', 'yellow', 'blue', 'purple']);

      const wrapper = mount(<ColorPicker swatch-colors={systemColors.value} />);
      wrapper.find('.t-input').trigger('click');
      await nextTick();

      const panel = document.querySelector('.t-color-picker__panel');
      const swatchs = panel.querySelectorAll('.t-color-picker__swatches--items');
      expect(swatchs[1].children.length).toBe(systemColors.value.length);
      wrapper.unmount();
    });
  });
  describe(':events', () => {
    it('change', async () => {
      const data = ref('rgb(0, 82, 217)');
      const fn = vi.fn();

      const wrapper = mount(<ColorPicker v-model={data.value} onChange={fn} />);
      const el = wrapper.find('.t-input__wrap input').element;
      await nextTick();

      const simulateEvent = (text, event) => {
        el.value = text;
        el.dispatchEvent(new Event(event));
      };
      simulateEvent('rgb(255, 255, 255)', 'input');
      await nextTick();

      expect(fn).toBeCalled();
      expect(data.value).toBe('rgb(255, 255, 255)');
    });

    it('clearable', async () => {
      const value = ref('#0052d9');
      const fn = vi.fn();

      const wrapper = mount(<ColorPicker v-model={value.value} clearable={true} onClear={fn} />);
      wrapper.find('.t-input').trigger('mouseenter');
      await nextTick();

      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      await closeIcon.trigger('click');

      expect(fn).toBeCalled();
      expect(value.value).toBe('');
      wrapper.unmount();
    });

    // it('palette-bar-change', async () => {
    //   const value = ref('#0052d9');
    //   const result = ref<string>('');
    //   const handlePaletteBarChange = (value: string) => {
    //     result.value = value;
    //   };

    //   const wrapper = mount(() => <ColorPicker v-model={value.value} onPaletteBarChange={handlePaletteBarChange} />);
    //   wrapper.find('.t-input').trigger('click');
    //   await nextTick();

    //   const panel = document.querySelector('.t-color-picker__panel');
    //   const slider = panel.querySelector('.t-color-picker__rail');
    //   slider.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, clientX: 50, clientY: 200 }));
    //   await nextTick();
    //   expect(result.value).toBeFalsy();
    //   wrapper.unmount();
    // });

    it('recent-colors-change', async () => {
      const recentColors = ref(['red']);
      const value = ref('#0052d9');

      const result = ref<Array<string>>([]);
      const handleRecentColorsChange = (value: Array<string>) => {
        result.value = value;
      };

      const wrapper = mount(() => (
        <ColorPicker
          v-model={value.value}
          recentColors={recentColors.value}
          onRecentColorsChange={handleRecentColorsChange}
        />
      ));
      wrapper.find('.t-input').trigger('click');
      await nextTick();

      const panel = document.querySelector('.t-color-picker__panel');
      const swatch = panel.querySelector('.t-color-picker__swatches');
      const item = swatch.querySelector('.t-color-picker__icon');
      item.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      await nextTick();

      expect(result.value).toEqual(['rgba(0, 82, 217, 1)', 'red']);
      wrapper.unmount();
    });
  });
});
