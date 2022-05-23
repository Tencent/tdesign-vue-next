import { ComponentPublicInstance, defineComponent, onBeforeUnmount, onMounted, ref, toRefs } from 'vue';
import useVModel from '../hooks/useVModel';
import { renderTNodeJSXDefault } from '../utils/render-tnode';
import props from './props';
import { Popup as TPopup } from '../popup';
import { useClickOutsider } from './utils/click-outsider';
import ColorPanel from './panel';
import DefaultTrigger from './trigger';
import { TdColorContext } from './interfaces';
import { useBaseClassName } from './hooks';

export default defineComponent({
  name: 'TColorPicker',
  props: {
    ...props,
  },
  setup(props) {
    const baseClassName = useBaseClassName();
    const visible = ref(false);
    const setVisible = (value: boolean) => (visible.value = value);

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
      const newProps = { ...props };
      delete newProps.onChange;
      return (
        <ColorPanel
          {...newProps}
          disabled={props.disabled}
          value={innerValue.value}
          togglePopup={setVisible}
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
      <TPopup {...popProps} content={this.renderPopupContent}>
        <div className={`${baseClassName}__trigger`} onClick={() => this.setVisible(!this.visible)} ref="refTrigger">
          {renderTNodeJSXDefault(
            this,
            'default',
            <DefaultTrigger
              color={this.innerValue}
              disabled={disabled}
              input-props={this.inputProps}
              onTriggerChange={this.setInnerValue}
            />,
          )}
        </div>
      </TPopup>
    );
  },
});
