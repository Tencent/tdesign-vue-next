import { defineComponent, ref, toRefs } from 'vue';
import { useDefaultValue, useDisabled, useTNodeDefault, useVModel } from '@tdesign/shared-hooks';

import { type PopupProps, Popup as TPopup } from '../popup';
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

    const { value: inputValue, modelValue, recentColors, onChange: onChangeRef, onRecentColorsChange } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(inputValue, modelValue, props.defaultValue, onChangeRef);
    const [innerRecentColors, setInnerRecentColors] = useDefaultValue(
      recentColors,
      props.defaultRecentColors,
      onRecentColorsChange,
      'recentColors',
    );

    const isDisabled = useDisabled();
    const changeColor: typeof setInnerValue = (...args) => {
      if (!isDisabled.value) setInnerValue(...args);
    };

    const refTrigger = ref<HTMLElement>();

    const handleClear = (context: { e: MouseEvent }) => props.onClear?.(context);

    const renderPopupContent = () => {
      if (isDisabled.value) {
        return null;
      }

      return (
        <ColorPanel
          {...{
            ...props,
            onChange: changeColor,
            onRecentColorsChange: setInnerRecentColors,
          }}
          value={innerValue.value}
          recentColors={innerRecentColors.value}
        />
      );
    };

    return () => {
      const popProps = {
        placement: 'bottom-left' as const,
        trigger: 'click' as const,
        overlayClassName: [baseClassName.value],
        ...((props.popupProps as PopupProps) || {}),
      };
      return (
        <TPopup
          {...popProps}
          disabled={Boolean(isDisabled.value || popProps.disabled)}
          hideEmptyPopup={Boolean(isDisabled.value) || popProps.hideEmptyPopup}
          content={renderPopupContent}
        >
          <div class={`${baseClassName.value}__trigger`} ref={refTrigger}>
            {renderTNodeJSXDefault(
              'default',
              <DefaultTrigger
                borderless={props.borderless}
                color={innerValue.value}
                disabled={Boolean(isDisabled.value)}
                clearable={props.clearable}
                enableAlpha={props.enableAlpha}
                input-props={props.inputProps}
                onTriggerChange={changeColor}
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
