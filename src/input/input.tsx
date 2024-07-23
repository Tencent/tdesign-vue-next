import { defineComponent, computed } from 'vue';
import {
  BrowseIcon as TdBrowseIcon,
  BrowseOffIcon as TdBrowseOffIcon,
  CloseCircleFilledIcon as TdCloseCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import props from './props';
import { useDisabled } from '../hooks/useDisabled';
import { useReadonly } from '../hooks/useReadonly';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import { useTNodeJSX } from '../hooks/tnode';
import useInput from './useInput';
import useInputEventHandler from './useInputEventHandler';
import useInputWidth from './useInputWidth';
import isUndefined from 'lodash/isUndefined';
import { PlainObject } from '../common';

function getValidAttrs(obj: PlainObject): PlainObject {
  const newObj: PlainObject = {};
  Object.keys(obj).forEach((key) => {
    if (!isUndefined(obj[key])) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

export default defineComponent({
  name: 'TInput',
  props: {
    ...props,
    /**
     * 非公开 API，随时可能变动，请勿使用。控制透传readonly同时是否展示input 默认保留 因为正常Input需要撑开宽度
     */
    showInput: {
      type: Boolean,
      default: true,
    },
    /**
     * 非公开 API，随时可能变动，请勿使用。控制透传autoWidth之后是否容器宽度也自适应 多选等组件需要用到自适应但也需要保留宽度
     */
    keepWrapperWidth: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { expose }) {
    const { globalConfig } = useConfig('input');
    const { BrowseIcon, BrowseOffIcon, CloseCircleFilledIcon } = useGlobalIcon({
      BrowseIcon: TdBrowseIcon,
      BrowseOffIcon: TdBrowseOffIcon,
      CloseCircleFilledIcon: TdCloseCircleFilledIcon,
    });
    const readonly = useReadonly();
    const disabled = useDisabled();

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
      renderType,
      showClear,
      focused,
      inputValue,
      isComposition,
      compositionValue,
      innerValue,
      limitNumber,
      ...inputHandle
    } = useInput(props, expose);

    const { inputPreRef } = useInputWidth(props, inputRef, innerValue);

    const inputEventHandler = useInputEventHandler(props, isHover);

    const tPlaceholder = computed(() => props.placeholder ?? globalConfig.value.placeholder);
    const inputAttrs = computed(() =>
      getValidAttrs({
        autofocus: props.autofocus,
        disabled: disabled.value,
        readonly: readonly.value,
        placeholder: tPlaceholder.value,
        name: props.name || undefined,
        type: renderType.value,
        autocomplete: props.autocomplete ?? (globalConfig.value.autocomplete || undefined),
        unselectable: readonly.value ? 'on' : undefined,
        spellcheck: props.spellCheck,
        // 不要传给 input 原生元素 maxlength，浏览器默认行为会按照 unicode 进行限制，与 maxLength API 违背
        // https://github.com/Tencent/tdesign-vue-next/issues/4413
      }),
    );

    const wrapClasses = computed(() => [
      INPUT_WRAP_CLASS.value,
      {
        [`${COMPONENT_NAME.value}--auto-width`]: props.autoWidth && !props.keepWrapperWidth,
      },
    ]);

    const inputEvents = getValidAttrs({
      onFocus: inputHandle.emitFocus,
      onBlur: inputHandle.formatAndEmitBlur,
      onKeydown: inputEventHandler.handleKeydown,
      onKeyup: inputEventHandler.handleKeyUp,
      onKeypress: inputEventHandler.handleKeypress,
      onPaste: inputEventHandler.onHandlePaste,
      onCompositionend: inputHandle.onHandleCompositionend,
      onCompositionstart: inputHandle.onHandleCompositionstart,
    });

    return () => {
      const prefixIcon = renderTNodeJSX('prefixIcon');
      let suffixIcon = renderTNodeJSX('suffixIcon');
      let passwordIcon = renderTNodeJSX('passwordIcon');
      const label = renderTNodeJSX('label', { silent: true });
      const suffix = renderTNodeJSX('suffix');
      const limitNode =
        limitNumber.value && props.showLimitNumber ? (
          <div
            class={[
              `${classPrefix.value}-input__limit-number`,
              {
                [`${classPrefix.value}-is-disabled`]: disabled.value,
              },
            ]}
          >
            {limitNumber.value}
          </div>
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
        const passwordClass = [{ [`${COMPONENT_NAME.value}__suffix-clear`]: !disabled.value }];
        if (renderType.value === 'password') {
          suffixIcon = <BrowseOffIcon class={passwordClass} onClick={inputHandle.emitPassword} />;
        } else if (renderType.value === 'text') {
          suffixIcon = <BrowseIcon class={passwordClass} onClick={inputHandle.emitPassword} />;
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
          [STATUS.value.focused]: disabled.value ? false : focused.value,
          [`${classPrefix.value}-is-${tStatus.value}`]: tStatus.value && tStatus.value !== 'default',
          [`${classPrefix.value}-align-${props.align}`]: props.align !== 'left',
          [`${classPrefix.value}-is-readonly`]: readonly.value,
          [`${COMPONENT_NAME.value}--prefix`]: prefixIcon || labelContent,
          [`${COMPONENT_NAME.value}--suffix`]: suffixIcon || suffixContent,
          [`${COMPONENT_NAME.value}--borderless`]: props.borderless,
          [`${COMPONENT_NAME.value}--focused`]: focused.value,
        },
      ];

      const tips = renderTNodeJSX('tips');

      const tipsClasses = [
        INPUT_TIPS_CLASS.value,
        `${classPrefix.value}-tips`,
        `${classPrefix.value}-is-${tStatus.value || 'default'}`,
      ];

      return (
        <div class={wrapClasses.value} v-show={props.type !== 'hidden'}>
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
            {/* input element must exist, or other select components can not focus by keyboard operation */}
            <input
              class={[`${COMPONENT_NAME.value}__inner`, { [`${COMPONENT_NAME.value}--soft-hidden`]: !props.showInput }]}
              {...inputAttrs.value}
              {...inputEvents}
              ref={inputRef}
              value={isComposition.value ? compositionValue.value ?? '' : inputValue.value ?? ''}
              onInput={(e: Event) => inputHandle.handleInput(e as InputEvent)}
            />
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
          {tips && <div class={tipsClasses}>{tips}</div>}
        </div>
      );
    };
  },
});
