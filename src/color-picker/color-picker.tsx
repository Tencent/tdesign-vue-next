import { ComponentPublicInstance, defineComponent, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import { renderContent } from '../utils/render-tnode';
import props from './props';
import { COMPONENT_NAME, TdColorPickerPopupProvide, TD_COLOR_PICKER_POPUP_PROVIDE } from './const';
import ColorPickerPanel from './panel';
import { Popup as TPopup } from '../popup';
import { useClickOutsider } from './utils/click-outsider';
import DefaultTrigger from './trigger';
import { useColorPicker } from './common';

const name = COMPONENT_NAME;

export default defineComponent({
  name: COMPONENT_NAME,
  components: {
    TPopup,
    ColorPickerPanel,
    DefaultTrigger,
  },
  inheritAttrs: false,
  props,
  emits: ['change'],
  setup(props, { emit }) {
    const visible = ref(false);
    const setVisible = (value: boolean) => {
      visible.value = value;
    };
    // 提供给 head组件中的closeBtn使用
    provide<TdColorPickerPopupProvide>(TD_COLOR_PICKER_POPUP_PROVIDE, {
      visible,
      setVisible,
    });

    const { color, handleChange, handlePaletteChange, updateColor } = useColorPicker(props.value, emit);
    watch(
      () => [props.value],
      () => {
        updateColor(props.value);
      },
    );

    const refTrigger = ref<HTMLElement>(null);
    const refColorPanel = ref<ComponentPublicInstance>(null);

    const { addClickOutsider, removeClickOutsider } = useClickOutsider();
    onMounted(() => addClickOutsider([refTrigger.value, refColorPanel.value], () => setVisible(false)));
    onBeforeUnmount(() => {
      removeClickOutsider();
    });

    return {
      color,
      visible,
      refTrigger,
      refColorPanel,
      updateColor,
      handleChange,
      handlePaletteChange,
      setVisible,
    };
  },
  render() {
    const { popupProps, disabled } = this;
    const colorPickerProps = { ...this.$props };
    delete colorPickerProps.onChange;
    delete colorPickerProps.onPaletteBarChange;
    const slots = {
      content: () => {
        if (disabled) {
          return null;
        }
        return (
          <color-picker-panel
            {...colorPickerProps}
            value={this.color}
            ref="refColorPanel"
            onChange={this.handleChange}
            onPaletteChange={this.handlePaletteChange}
          />
        );
      },
    };
    const popProps = {
      ...((popupProps as any) || {
        placement: 'bottom-left',
      }),
      attach: 'body',
      overlayClassName: [name],
      visible: this.visible,
      overlayStyle: {
        padding: 0,
      },
    };
    return (
      <t-popup {...popProps} v-slots={slots}>
        <div className={`${name}__trigger`} onClick={() => this.setVisible(!this.visible)} ref="refTrigger">
          {renderContent(
            this,
            'default',
            'trigger',
            <default-trigger
              color={this.color}
              disabled={this.disabled}
              input-props={this.inputProps}
              onTriggerChange={this.updateColor}
            />,
          )}
        </div>
      </t-popup>
    );
  },
});
