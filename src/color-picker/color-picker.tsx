import { ComponentPublicInstance, defineComponent, onBeforeUnmount, onMounted, provide, ref, toRefs } from 'vue';
import useVModel from '../hooks/useVModel';
import { renderTNodeJSXDefault } from '../utils/render-tnode';
import props from './props';
import { Popup as TPopup } from '../popup';
import { useClickOutsider } from './utils/click-outsider';
import ColorPanel from './panel';
import DefaultTrigger from './trigger';
import { TdColorPickerPopupProvide, TdColorPickerProvides, TdColorContext } from './interfaces';
import { useBaseClassName } from './hooks';

export default defineComponent({
  name: 'TColorPicker',
  components: {
    TPopup,
    ColorPanel,
    DefaultTrigger,
  },
  inheritAttrs: false,
  props: {
    ...props,
  },
  setup(props) {
    const baseClassName = useBaseClassName();
    const visible = ref(false);
    const setVisible = (value: boolean) => (visible.value = value);
    // 提供给 head组件中的closeBtn使用
    provide<TdColorPickerPopupProvide>(TdColorPickerProvides.POPUP, {
      visible,
      setVisible,
    });

    const { value: inputValue, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(inputValue, modelValue, props.defaultValue, props.onChange);

    const refTrigger = ref<HTMLElement>();
    const refColorPanel = ref<ComponentPublicInstance>();

    const { addClickOutsider, removeClickOutsider } = useClickOutsider();
    onMounted(() => addClickOutsider([refTrigger.value, refColorPanel.value], () => setVisible(false)));
    onBeforeUnmount(() => {
      removeClickOutsider();
    });

    const renderPopupContent = () => {
      if (props.disabled) {
        return null;
      }
      return (
        <ColorPanel
          {...props}
          disabled={props.disabled}
          value={innerValue.value}
          onChange={(value: string, context: TdColorContext) => setInnerValue(value, context)}
          ref="refColorPanel"
        />
      );
    };

    return {
      baseClassName,
      innerValue,
      visible,
      refTrigger,
      refColorPanel,
      renderPopupContent,
      setVisible,
      setInnerValue,
    };
  },
  render() {
    const { popupProps, disabled, baseClassName } = this;
    const popProps = {
      placement: 'bottom-left',
      ...((popupProps as any) || {}),
      trigger: 'click',
      attach: 'body',
      overlayClassName: [baseClassName],
      visible: this.visible,
      overlayStyle: {
        padding: 0,
      },
    };
    return (
      <t-popup {...popProps} content={this.renderPopupContent}>
        <div className={`${baseClassName}__trigger`} onClick={() => this.setVisible(!this.visible)} ref="refTrigger">
          {renderTNodeJSXDefault(
            this,
            'default',
            <default-trigger
              color={this.innerValue}
              disabled={disabled}
              input-props={this.inputProps}
              onTriggerChange={this.setInnerValue}
            />,
          )}
        </div>
      </t-popup>
    );
  },
});
