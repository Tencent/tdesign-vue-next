import { defineComponent, ref, toRefs } from 'vue';
import useDefaultValue from '../hooks/useDefaultValue';
import useVModel from '../hooks/useVModel';
import { useTNodeDefault } from '../hooks/tnode';
import props from './props';
import { Popup as TPopup } from '../popup';
import ColorPanel from './components/panel';
import DefaultTrigger from './components/trigger';
import { useBaseClassName } from './hooks';

export default defineComponent({
  name: 'TColorPicker',
  props,
  setup(props) {
    const baseClassName = useBaseClassName();
    const renderTNodeJSXDefault = useTNodeDefault();
    const visible = ref(false);
    const setVisible = (value: boolean) => (visible.value = value);

    const { value: inputValue, modelValue, recentColors } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(inputValue, modelValue, props.defaultValue, props.onChange);
    const [innerRecentColors, setInnerRecentColors] = useDefaultValue(
      recentColors,
      props.defaultRecentColors,
      props.onRecentColorsChange,
      'recentColors',
    );

    const refTrigger = ref<HTMLElement>();

    const handleClear = (context: { e: MouseEvent }) => props.onClear?.(context);

    const renderPopupContent = () => {
      if (props.disabled) {
        return null;
      }

      return (
        <ColorPanel
          {...props}
          value={innerValue.value}
          recentColors={innerRecentColors.value}
          onChange={setInnerValue}
          onRecentColorsChange={setInnerRecentColors}
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
          <div class={`${baseClassName.value}__trigger`} onClick={() => setVisible(!visible.value)} ref={refTrigger}>
            {renderTNodeJSXDefault(
              'default',
              <DefaultTrigger
                borderless={props.borderless}
                color={innerValue.value}
                disabled={props.disabled}
                clearable={props.clearable}
                input-props={props.inputProps}
                onTriggerChange={setInnerValue}
                onTriggerClear={handleClear}
                size={props.size}
              />,
            )}
          </div>
        </TPopup>
      );
    };
  },
});
