import { defineComponent, ref, toRefs } from 'vue';
import useVModel from '../hooks/useVModel';
import { useTNodeDefault } from '../hooks/tnode';
import props from './props';
import { Popup as TPopup } from '../popup';
import ColorPanel from './components/panel';
import DefaultTrigger from './components/trigger';
import { TdColorContext } from './types';
import { useBaseClassName } from './hooks';

export default defineComponent({
  name: 'TColorPicker',
  props,
  setup(props) {
    const baseClassName = useBaseClassName();
    const renderTNodeJSXDefault = useTNodeDefault();
    const visible = ref(false);
    const setVisible = (value: boolean) => (visible.value = value);

    const { value: inputValue, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(inputValue, modelValue, props.defaultValue, props.onChange);

    const refTrigger = ref<HTMLElement>();

    const handleClear = (context: { e: MouseEvent }) => props.onClear?.(context);

    const isHover = ref(false);

    // 按键trigger的clearable依赖此鼠标事件
    const mouseEvent = (v: boolean) => (isHover.value = v);
    const onMouseenter = (e: MouseEvent) => {
      mouseEvent(true);
      if (props.openOnHover) setVisible(true);
      props.onMouseenter?.({ e });
    };
    const onMouseleave = (e: MouseEvent) => {
      mouseEvent(false);
      props.onMouseleave?.({ e });
    };

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
        />
      );
    };

    return () => {
      const popProps = {
        placement: 'bottom-left',
        ...((props.popupProps as any) || {}),
        trigger: 'click',
        attach: 'body',
        overlayClassName: [baseClassName.value],
        visible: visible.value,
        overlayInnerStyle: {
          padding: 0,
        },
        onVisibleChange: (
          visible: boolean,
          context: {
            trigger: string;
          },
        ) => {
          if (context.trigger === 'document') {
            setVisible(false);
          }
        },
      };
      return (
        <TPopup {...popProps} content={renderPopupContent}>
          <div
            class={`${baseClassName.value}__trigger`}
            onClick={() => setVisible(!visible.value)}
            ref={refTrigger}
            onMouseenter={onMouseenter}
            onMouseleave={onMouseleave}
          >
            {renderTNodeJSXDefault(
              'default',
              <DefaultTrigger
                borderless={props.borderless}
                color={innerValue.value}
                disabled={props.disabled}
                clearable={props.clearable}
                input-props={props.inputProps}
                isHover={isHover.value}
                onTriggerChange={setInnerValue}
                onTriggerClear={handleClear}
                size={props.size}
                triggerType={props.triggerType}
              />,
            )}
          </div>
        </TPopup>
      );
    };
  },
});
