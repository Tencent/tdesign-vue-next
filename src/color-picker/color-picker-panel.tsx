import { defineComponent, provide, ref, watch } from 'vue';
import props from './props';
import ColorPanel from './panel';
import { useColorPicker } from './common';
import { TdColorPickerPopupProvide, TdColorPickerProvides } from './interfaces';
import { useStatusClassName } from './hooks';

export default defineComponent({
  name: 'TColorPickerPanel',
  components: {
    ColorPanel,
  },
  inheritAttrs: false,
  props,
  emits: ['change'],
  setup(props, { emit }) {
    const statusClassNames = useStatusClassName();
    provide<TdColorPickerPopupProvide>(TdColorPickerProvides.POPUP, {
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
      statusClassNames,
      handleChange,
      handlePaletteChange,
    };
  },
  render() {
    const { popupProps, color, statusClassNames, ...props } = this;
    delete props.onChange;
    delete props.onPaletteBarChange;
    return (
      <color-panel
        {...props}
        value={color}
        custom-class={statusClassNames.inlineClassName}
        close-btn={false}
        onChange={this.handleChange}
        onPaletteChange={this.handlePaletteChange}
      />
    );
  },
});
