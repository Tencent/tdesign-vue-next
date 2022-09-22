import { defineComponent, h, computed } from 'vue';
import {
  BrowseIcon as TdBrowseIcon,
  BrowseOffIcon as TdBrowseOffIcon,
  CloseCircleFilledIcon as TdCloseCircleFilledIcon,
} from 'tdesign-icons-vue-next';

import props from './props';
import { TdInputProps } from './type';

// hooks
import { useFormDisabled } from '../form/hooks';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import { useTNodeJSX } from '../hooks/tnode';
import useInput from './useInput';
import useInputEventHandler from './useInputEventHandler';
import useInputWidth from './useInputWidth';

export interface ExtendsTdInputProps extends TdInputProps {
  showInput: boolean;
  keepWrapperWidth: boolean;
  allowTriggerBlur: boolean;
}

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
  props: {
    ...props,
    showInput: {
      // 没有这个 API，请勿使用，即将删除。控制透传readonly同时是否展示input 默认保留 因为正常Input需要撑开宽度
      type: Boolean,
      default: true,
    },
    keepWrapperWidth: {
      // 没有这个 API，请勿使用，即将删除。控制透传autoWidth之后是否容器宽度也自适应 多选等组件需要用到自适应但也需要保留宽度
      type: Boolean,
      default: false,
    },
    allowTriggerBlur: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { slots, expose }) {
    const { globalConfig } = useConfig('input');
    const { BrowseIcon, BrowseOffIcon, CloseCircleFilledIcon } = useGlobalIcon({
      BrowseIcon: TdBrowseIcon,
      BrowseOffIcon: TdBrowseOffIcon,
      CloseCircleFilledIcon: TdCloseCircleFilledIcon,
    });
    const disabled = useFormDisabled();
    const COMPONENT_NAME = usePrefixClass('input');
    const INPUT_WRAP_CLASS = usePrefixClass('input__wrap');
    const INPUT_TIPS_CLASS = usePrefixClass('input__tips');
    const { STATUS, SIZE } = useCommonClassName();
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();
    const {
      isHover,
      tStatus,
      inputRef,
      inputPreRef,
      renderType,
      showClear,
      focused,
      inputValue,
      innerValue,
      limitNumber,
      ...inputHandle
    } = useInput(props, expose);
    useInputWidth(props, inputPreRef, inputRef, innerValue);
    const inputEventHandler = useInputEventHandler(props, isHover, innerValue);

    const tPlaceholder = computed(() => props.placeholder ?? globalConfig.value.placeholder);
    const inputAttrs = computed(() =>
      getValidAttrs({
        autofocus: props.autofocus,
        disabled: disabled.value,
        readonly: props.readonly,
        placeholder: tPlaceholder.value,
        maxlength: (!props.allowInputOverMax && props.maxlength) || undefined,
        name: props.name || undefined,
        type: renderType.value,
        autocomplete: props.autocomplete ?? (globalConfig.value.autocomplete || undefined),
        unselectable: props.readonly ? 'on' : undefined,
      }),
    );

    return () => {
      const prefixIcon = renderTNodeJSX('prefixIcon');
      let suffixIcon = renderTNodeJSX('suffixIcon');
      let passwordIcon = renderTNodeJSX('passwordIcon');
      const label = renderTNodeJSX('label', { silent: true });
      const suffix = renderTNodeJSX('suffix');
      const limitNode =
        limitNumber.value && props.showLimitNumber ? (
          <div class={`${classPrefix.value}-input__limit-number`}>{limitNumber.value}</div>
        ) : null;

      const labelContent = label ? <div class={`${COMPONENT_NAME.value}__prefix`}>{label}</div> : null;
      const suffixContent =
        suffix || limitNode ? (
          <div class={`${COMPONENT_NAME.value}__suffix`}>
            {suffix}
            {limitNode}
          </div>
        ) : null;

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

      if (showClear.value) {
        // 如果类型为 password 则使用 passwordIcon 显示 clear
        if (props.type === 'password') {
          passwordIcon = (
            <CloseCircleFilledIcon
              ref={inputHandle.clearIconRef}
              class={`${COMPONENT_NAME.value}__suffix-clear`}
              onClick={inputHandle.emitClear}
              onMousedown={inputHandle.onClearIconMousedown}
            />
          );
        } else {
          suffixIcon = (
            <CloseCircleFilledIcon
              ref={inputHandle.clearIconRef}
              class={`${COMPONENT_NAME.value}__suffix-clear`}
              onClick={inputHandle.emitClear}
              onMousedown={inputHandle.onClearIconMousedown}
            />
          );
        }
      }

      const classes = [
        COMPONENT_NAME.value,
        props.inputClass,
        {
          [SIZE.value[props.size]]: props.size !== 'medium',
          [STATUS.value.disabled]: disabled.value,
          [STATUS.value.focused]: focused.value,
          [`${classPrefix.value}-is-${tStatus.value}`]: tStatus.value,
          [`${classPrefix.value}-align-${props.align}`]: props.align !== 'left',
          [`${classPrefix.value}-is-readonly`]: props.readonly,
          [`${COMPONENT_NAME.value}--prefix`]: prefixIcon || labelContent,
          [`${COMPONENT_NAME.value}--suffix`]: suffixIcon || suffixContent,
          [`${COMPONENT_NAME.value}--focused`]: focused.value,
          [`${COMPONENT_NAME.value}--auto-width`]: props.autoWidth && !props.keepWrapperWidth,
        },
      ];

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

      const tips = renderTNodeJSX('tips');

      return (
        <div class={INPUT_WRAP_CLASS.value}>
          <div
            class={classes}
            onClick={inputHandle.onRootClick}
            onMouseenter={inputEventHandler.onInputMouseenter}
            onMouseleave={inputEventHandler.onInputMouseleave}
            onWheel={inputEventHandler.onHandleMousewheel}
          >
            {prefixIcon ? (
              <span class={[`${COMPONENT_NAME.value}__prefix`, `${COMPONENT_NAME.value}__prefix-icon`]}>
                {prefixIcon}
              </span>
            ) : null}
            {labelContent}
            {props.showInput && (
              <input
                class={`${COMPONENT_NAME.value}__inner`}
                {...inputAttrs.value}
                {...inputEvents}
                ref={inputRef}
                value={inputValue.value ?? ''}
                onInput={(e: Event) => inputHandle.handleInput(e as InputEvent)}
              />
            )}
            {props.autoWidth && (
              <span ref={inputPreRef} class={`${classPrefix.value}-input__input-pre`}>
                {innerValue.value || tPlaceholder.value}
              </span>
            )}
            {suffixContent}
            {passwordIcon ? (
              <span
                class={[
                  `${COMPONENT_NAME.value}__suffix`,
                  `${COMPONENT_NAME.value}__suffix-icon`,
                  `${COMPONENT_NAME.value}__clear`,
                ]}
              >
                {passwordIcon}
              </span>
            ) : null}
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
          {tips && (
            <div class={`${INPUT_TIPS_CLASS.value} ${classPrefix.value}-input__tips--${props.status}`}>{tips}</div>
          )}
        </div>
      );
    };
  },
});
