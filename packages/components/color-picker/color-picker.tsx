import { defineComponent, ref, toRefs } from 'vue';
import { useVModel, useDefaultValue, useTNodeDefault } from '@tdesign/shared-hooks';

import props from './props';
import { PopupTriggerEvent, PopupTriggerSource, Popup as TPopup } from '../popup';
import ColorPanel from './components/panel';
import DefaultTrigger from './components/trigger';
import { useBaseClassName } from './hooks';
import { TdColorPickerProps } from './type';

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
          {...{
            ...props,
            onChange: setInnerValue,
            onRecentColorsChange: setInnerRecentColors,
          }}
          value={innerValue.value}
          recentColors={innerRecentColors.value}
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
          popupVisible: boolean,
          context: {
            e?: PopupTriggerEvent;
            trigger: PopupTriggerSource;
          },
        ) => {
          if (context.trigger === 'document') {
            setVisible(false);
          }
          (props.popupProps as TdColorPickerProps['popupProps'])?.onVisibleChange?.(visible.value, context);
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
