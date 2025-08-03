import { defineComponent, ref, toRefs } from 'vue';
import { useDefaultValue, useTNodeDefault, useVModel } from '@tdesign/shared-hooks';

import { Popup as TPopup } from '../popup';
import ColorPanel from './components/panel';
import DefaultTrigger from './components/trigger';
import { useBaseClassName } from './hooks';
import props from './props';

export default defineComponent({
  name: 'TColorPicker',
  props,
  setup(props) {
    const baseClassName = useBaseClassName();
    const renderTNodeJSXDefault = useTNodeDefault();

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
        trigger: 'click',
        overlayClassName: [baseClassName.value],
        ...((props.popupProps as any) || {}),
      };
      return (
        <TPopup {...popProps} content={renderPopupContent}>
          <div class={`${baseClassName.value}__trigger`} ref={refTrigger}>
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
