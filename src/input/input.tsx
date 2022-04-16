import { defineComponent, h, computed } from 'vue';
import { BrowseIcon, BrowseOffIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import props from './props';

// hooks
import { useFormDisabled } from '../form/hooks';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import useInput from './useInput';
import useInputEventHandler from './useInputEventHandler';
import useInputWidth from './useInputWidth';

function getValidAttrs(obj: Record<string, unknown>): Record<string, unknown> {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

export default defineComponent({
  name: 'TInput',
  props,
  emits: ['enter', 'keydown', 'keyup', 'keypress', 'clear', 'change', 'focus', 'blur', 'click'],
  setup(props, { slots }) {
    const { global } = useConfig('input');
    const disabled = useFormDisabled();
    const COMPONENT_NAME = usePrefixClass('input');
    const INPUT_WRAP_CLASS = usePrefixClass('input__wrap');
    const INPUT_TIPS_CLASS = usePrefixClass('input__tips');
    const { STATUS, SIZE } = useCommonClassName();
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();
    const { isHover, inputRef, renderType, showClear, focused, inputValue, ...inputHandle } = useInput(props);
    useInputWidth(props, inputRef);
    const inputEventHandler = useInputEventHandler(props, isHover);

    const tPlaceholder = computed(() => props.placeholder ?? global.value.placeholder);
    const inputAttrs = computed(() =>
      getValidAttrs({
        autofocus: props.autofocus,
        disabled: props.disabled,
        readonly: props.readonly,
        placeholder: tPlaceholder.value,
        maxlength: props.maxlength,
        name: props.name || undefined,
        type: renderType.value,
        autocomplete: renderType.value === 'password' ? 'on' : undefined,
      }),
    );

    const renderIcon = (icon: string | Function | undefined, iconType: 'prefix-icon' | 'suffix-icon') => {
      if (typeof icon === 'function') {
        return icon(h);
      }
      // 插槽名称为中划线
      if (slots[kebabCase(iconType)]) {
        return slots[kebabCase(iconType)](null);
      }
      // 插槽名称为驼峰
      if (slots[camelCase(iconType)]) {
        return slots[camelCase(iconType)](null);
      }
      return null;
    };

    return () => {
      const inputEvents = getValidAttrs({
        onFocus: (e: FocusEvent) => inputHandle.emitFocus(e),
        onBlur: inputHandle.formatAndEmitBlur,
        onKeydown: inputEventHandler.handleKeydown,
        onKeyup: inputEventHandler.handleKeyUp,
        onKeypress: inputEventHandler.handleKeypress,
        onPaste: inputEventHandler.onHandlePaste,
        onCompositionend: inputHandle.onHandleCompositionend,
        onCompositionstart: inputHandle.onHandleCompositionstart,
      });

      const prefixIcon = renderIcon(props.prefixIcon, 'prefix-icon');
      let suffixIcon = renderIcon(props.suffixIcon, 'suffix-icon');

      const label = renderTNodeJSX('label', { silent: true });
      const suffix = renderTNodeJSX('suffix');

      const labelContent = label ? <div class={`${COMPONENT_NAME.value}__prefix`}>{label}</div> : null;
      const suffixContent = suffix ? <div class={`${COMPONENT_NAME.value}__suffix`}>{suffix}</div> : null;

      if (showClear.value) {
        suffixIcon = (
          <CloseCircleFilledIcon class={`${COMPONENT_NAME}__suffix-clear`} onClick={inputHandle.emitClear} />
        );
      }

      if (props.type === 'password') {
        if (renderType.value === 'password') {
          suffixIcon = (
            <BrowseOffIcon class={`${COMPONENT_NAME.value}__suffix-clear`} onClick={inputHandle.emitPassword} />
          );
        } else if (renderType.value === 'text') {
          suffixIcon = (
            <BrowseIcon class={`${COMPONENT_NAME.value}__suffix-clear`} onClick={inputHandle.emitPassword} />
          );
        }
      }

      const classes = [
        COMPONENT_NAME.value,
        props.inputClass,
        {
          [SIZE.value[props.size]]: props.size !== 'medium',
          [STATUS.value.disabled]: props.disabled,
          [STATUS.value.focused]: focused.value,
          [`${classPrefix.value}-is-${props.status}`]: props.status,
          [`${classPrefix.value}-align-${props.align}`]: props.align !== 'left',
          [`${classPrefix.value}-is-readonly`]: props.readonly,
          [`${COMPONENT_NAME.value}--prefix`]: prefixIcon || labelContent,
          [`${COMPONENT_NAME.value}--suffix`]: suffixIcon || suffixContent,
          [`${COMPONENT_NAME.value}--focused`]: focused.value,
          [`${COMPONENT_NAME.value}--auto-width`]: props.autoWidth,
        },
      ];

      const renderInputNode = () => (
        <div
          class={classes}
          onClick={inputHandle.onRootClick}
          onMouseEnter={inputEventHandler.onInputMouseenter}
          onMouseLeave={inputEventHandler.onInputMouseleave}
          onWheel={inputEventHandler.onHandleMousewheel}
        >
          {prefixIcon ? (
            <span class={[`${COMPONENT_NAME.value}__prefix`, `${COMPONENT_NAME.value}__prefix-icon`]}>
              {prefixIcon}
            </span>
          ) : null}
          {labelContent}
          <input
            class={`${COMPONENT_NAME.value}__inner`}
            {...inputAttrs.value}
            {...inputEvents}
            ref={inputRef}
            value={inputValue.value}
            onInput={(e: Event) => inputHandle.handleInput(e as InputEvent)}
          />
          {props.autoWidth && (
            <span ref="inputPreRef" className={`${classPrefix.value}-input__input-pre`}>
              {props.value || tPlaceholder.value}
            </span>
          )}
          {suffixContent}
          {suffixIcon ? (
            <span
              class={[
                `${COMPONENT_NAME.value}__suffix`,
                `${COMPONENT_NAME.value}__suffix-icon`,
                { [`${COMPONENT_NAME.value}__clear`]: showClear.value },
              ]}
            >
              {suffixIcon}
            </span>
          ) : null}
        </div>
      );
      const tips = renderTNodeJSX('tips');

      return (
        <div class={INPUT_WRAP_CLASS.value}>
          {renderInputNode()}
          {tips && (
            <div class={`${INPUT_TIPS_CLASS.value} ${classPrefix.value}-input__tips--${props.status || 'normal'}`}>
              {tips}
            </div>
          )}
        </div>
      );
    };
  },
});
