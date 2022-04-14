import { defineComponent, h, VNodeChild, computed } from 'vue';
import { BrowseIcon, BrowseOffIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';

// hooks
import { useFormDisabled } from '../form/hooks';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import useInput from './useInput';
import useInputEventHandler from './useInputEventHandler';
import useInputWidth from './useInputWidth';
import { useIcon } from '../hooks/icon';

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
  props: { ...props },
  emits: ['enter', 'keydown', 'keyup', 'keypress', 'clear', 'change', 'focus', 'blur', 'click'],
  setup(props, { slots }) {
    const { global } = useConfig('input');
    const disabled = useFormDisabled();
    const COMPONENT_NAME = usePrefixClass('input');
    const INPUT_WRAP_CLASS = usePrefixClass('input__wrap');
    const INPUT_TIPS_CLASS = usePrefixClass('input__tips');
    const { STATUS, SIZE } = useCommonClassName();
    const classPrefix = usePrefixClass();
    const { isHover, inputRef, renderType, ...inputHandle } = useInput(props);
    useInputWidth(props, inputRef);
    const inputEventHandler = useInputEventHandler(props, isHover);
    const renderIconTNode = useIcon();

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

    return {
      global,
      disabled,
      COMPONENT_NAME,
      INPUT_WRAP_CLASS,
      INPUT_TIPS_CLASS,
      classPrefix,
      STATUS,
      SIZE,
      tPlaceholder,
      ...inputHandle,
      ...inputEventHandler,
      renderType,
      inputRef,
      inputAttrs,
      renderIconTNode,
    };
  },

  render(): VNodeChild {
    const { COMPONENT_NAME, INPUT_WRAP_CLASS, INPUT_TIPS_CLASS, SIZE, STATUS, classPrefix, inputRef } = this;

    const inputEvents = getValidAttrs({
      onFocus: (e: FocusEvent) => this.emitFocus(e),
      onBlur: this.formatAndEmitBlur,
      onKeydown: this.handleKeydown,
      onKeyup: this.handleKeyUp,
      onKeypress: this.handleKeypress,
      onPaste: this.onHandlePaste,
      onCompositionend: this.onHandleCompositionend,
      onCompositionstart: this.onHandleCompositionstart,
      // input的change事件是失去焦点或者keydown的时候执行。这与api定义的change不符，所以不做任何变化。
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    });

    const prefixIcon = this.renderIconTNode('prefix-icon', this.prefixIcon);

    let suffixIcon = this.renderIconTNode('suffix-icon', this.suffixIcon);

    const label = renderTNodeJSX(this, 'label', { silent: true });
    const suffix = renderTNodeJSX(this, 'suffix');

    const labelContent = label ? <div class={`${COMPONENT_NAME}__prefix`}>{label}</div> : null;
    const suffixContent = suffix ? <div class={`${COMPONENT_NAME}__suffix`}>{suffix}</div> : null;

    if (this.showClear) {
      suffixIcon = <CloseCircleFilledIcon class={`${COMPONENT_NAME}__suffix-clear`} onClick={this.emitClear} />;
    }

    if (this.type === 'password') {
      if (this.renderType === 'password') {
        suffixIcon = <BrowseOffIcon class={`${COMPONENT_NAME}__suffix-clear`} onClick={this.emitPassword} />;
      } else if (this.renderType === 'text') {
        suffixIcon = <BrowseIcon class={`${COMPONENT_NAME}__suffix-clear`} onClick={this.emitPassword} />;
      }
    }

    const classes = [
      COMPONENT_NAME,
      this.inputClass,
      {
        [SIZE[this.size]]: this.size !== 'medium',
        [STATUS.disabled]: this.disabled,
        [STATUS.focused]: this.focused,
        [`${classPrefix}-is-${this.status}`]: this.status,
        [`${classPrefix}-align-${this.align}`]: this.align !== 'left',
        [`${classPrefix}-is-readonly`]: this.readonly,
        [`${COMPONENT_NAME}--prefix`]: prefixIcon || labelContent,
        [`${COMPONENT_NAME}--suffix`]: suffixIcon || suffixContent,
        [`${COMPONENT_NAME}--focused`]: this.focused,
        [`${COMPONENT_NAME}--auto-width`]: this.autoWidth,
      },
    ];
    const inputNode = (
      <div
        class={classes}
        onClick={this.onRootClick}
        onMouseenter={this.onInputMouseenter}
        onMouseleave={this.onInputMouseleave}
        onWheel={this.onHandleMousewheel}
      >
        {prefixIcon ? (
          <span class={[`${COMPONENT_NAME}__prefix`, `${COMPONENT_NAME}__prefix-icon`]}>{prefixIcon}</span>
        ) : null}
        {labelContent}
        <input
          class={`${COMPONENT_NAME}__inner`}
          {...this.inputAttrs}
          {...inputEvents}
          ref={inputRef}
          value={this.inputValue}
          onInput={(e: Event) => this.handleInput(e as InputEvent)}
        />
        {this.autoWidth && (
          <span ref="inputPreRef" class={`${classPrefix}-input__input-pre`}>
            {this.value || this.tPlaceholder}
          </span>
        )}
        {suffixContent}
        {suffixIcon ? (
          <span
            class={[
              `${COMPONENT_NAME}__suffix`,
              `${COMPONENT_NAME}__suffix-icon`,
              { [`${COMPONENT_NAME}__clear`]: this.showClear },
            ]}
          >
            {suffixIcon}
          </span>
        ) : null}
      </div>
    );
    const tips = renderTNodeJSX(this, 'tips');
    return (
      <div class={INPUT_WRAP_CLASS}>
        {inputNode}
        {tips && <div class={`${INPUT_TIPS_CLASS} ${classPrefix}-input__tips--${this.status || 'normal'}`}>{tips}</div>}
      </div>
    );
  },
});
