import { defineComponent, provide, ref, watch } from 'vue';
import props from './props';
import ColorPickerPanel from './panel';
import {
  CLASS_NAME_INLINE,
  COMPONENT_PANEL_NAME,
  TdColorPickerPopupProvide,
  TD_COLOR_PICKER_POPUP_PROVIDE,
} from './const';
import { useColorPicker } from './common';

export default defineComponent({
  name: COMPONENT_PANEL_NAME,
  components: {
    ColorPickerPanel,
  },
  inheritAttrs: false,
  props,
  emits: ['change'],
  setup(props, { emit }) {
    provide<TdColorPickerPopupProvide>(TD_COLOR_PICKER_POPUP_PROVIDE, {
      visible: ref(false),
      setVisible() {},
    });

    const { color, handleChange, handlePaletteChange, updateColor } = useColorPicker(props.value, emit);
    watch(
      () => [props.value],
      () => {
        updateColor(props.value);
      },
    );

    return {
      color,
      handleChange,
      handlePaletteChange,
    };
  },
  render() {
    const { popupProps, ...props } = this.$props;
    delete props.onChange;
    delete props.onPaletteBarChange;
    return (
      <color-picker-panel
        {...props}
        value={this.color}
        custom-class={CLASS_NAME_INLINE}
        close-btn={false}
        onChange={this.handleChange}
        onPaletteChange={this.handlePaletteChange}
      />
    );
  },
});
