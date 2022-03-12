import { ComponentPublicInstance, defineComponent, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import { renderContent } from '../utils/render-tnode';
import props from './props';
import { Popup as TPopup } from '../popup';
import { useClickOutsider } from './utils/click-outsider';
import ColorPanel from './panel';
import DefaultTrigger from './trigger';
import { useColorPicker } from './common';
import { TdColorPickerPopupProvide, TdColorPickerProvides } from './interfaces';
import { useBaseClassName } from './hooks';

export default defineComponent({
  name: 'TColorPicker',
  components: {
    TPopup,
    ColorPanel,
    DefaultTrigger,
  },
  inheritAttrs: false,
  props,
  emits: ['change'],
  setup(props, { emit }) {
    const baseClassName = useBaseClassName();
    const visible = ref(false);
    const setVisible = (value: boolean) => (visible.value = value);
    // 提供给 head组件中的closeBtn使用
    provide<TdColorPickerPopupProvide>(TdColorPickerProvides.POPUP, {
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

    const refTrigger = ref<HTMLElement>();
    const refColorPanel = ref<ComponentPublicInstance>();

    const { addClickOutsider, removeClickOutsider } = useClickOutsider();
    onMounted(() => addClickOutsider([refTrigger.value, refColorPanel.value], () => setVisible(false)));
    onBeforeUnmount(() => {
      removeClickOutsider();
    });

    return {
      baseClassName,
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
    const { popupProps, disabled, baseClassName } = this;
    const colorPickerProps = { ...this.$props };
    delete colorPickerProps.onChange;
    delete colorPickerProps.onPaletteBarChange;
    const popupContent = () => {
      if (disabled) {
        return null;
      }
      return (
        <ColorPanel
          {...colorPickerProps}
          value={this.color}
          ref="refColorPanel"
          onChange={this.handleChange}
          onPaletteChange={this.handlePaletteChange}
        />
      );
    };
    const popProps = {
      ...((popupProps as any) || {
        placement: 'bottom-left',
        trigger: 'click',
      }),
      attach: 'body',
      overlayClassName: [baseClassName],
      visible: this.visible,
      overlayStyle: {
        padding: 0,
      },
      content: popupContent,
    };
    return (
      <t-popup {...popProps}>
        <div className={`${baseClassName}__trigger`} onClick={() => this.setVisible(!this.visible)} ref="refTrigger">
          {renderContent(
            this,
            'default',
            null,
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
