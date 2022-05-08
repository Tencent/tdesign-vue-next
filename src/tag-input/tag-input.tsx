import { defineComponent, computed, toRefs, nextTick } from 'vue';

import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import TInput, { InputValue } from '../input';

import { TdTagInputProps } from './type';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { usePrefixClass } from '../hooks/useConfig';

import useTagScroll from './useTagScroll';
import useTagList from './useTagList';
import useHover from './useHover';
import useDefault from '../hooks/useDefaultValue';

const useComponentClassName = () => {
  return {
    NAME_CLASS: usePrefixClass('tag-input'),
    CLEAR_CLASS: usePrefixClass('tag-input__suffix-clear'),
    BREAK_LINE_CLASS: usePrefixClass('tag-input--break-line'),
  };
};

export default defineComponent({
  name: 'TTagInput',

  props: { ...props },

  setup(props: TdTagInputProps) {
    const { NAME_CLASS, CLEAR_CLASS, BREAK_LINE_CLASS } = useComponentClassName();

    const { inputValue } = toRefs(props);
    const [tInputValue, setTInputValue] = useDefault(
      inputValue,
      props.defaultInputValue,
      props.onInputChange,
      'inputValue',
    );
    const { excessTagsDisplayType, readonly, disabled, clearable, placeholder } = toRefs(props);
    const { isHover, addHover, cancelHover } = useHover({
      readonly: props.readonly,
      disabled: props.disabled,
      onMouseenter: props.onMouseenter,
      onMouseleave: props.onMouseleave,
    });
    const { scrollToRight, onWheel, scrollToRightOnEnter, scrollToLeftOnLeave, tagInputRef } = useTagScroll(props);
    // handle tag add and remove
    const { tagValue, onInnerEnter, onInputBackspaceKeyUp, clearAll, renderLabel, onClose } = useTagList(props);

    const classes = computed(() => {
      return [
        NAME_CLASS.value,
        {
          [BREAK_LINE_CLASS.value]: excessTagsDisplayType.value === 'break-line',
        },
      ];
    });

    const tagInputPlaceholder = computed(() => (!tagValue.value?.length ? placeholder.value : ''));

    const showClearIcon = computed(() =>
      Boolean(
        !readonly.value &&
          !disabled.value &&
          clearable.value &&
          isHover.value &&
          (tagValue.value?.length || tInputValue.value),
      ),
    );

    const onInputEnter = (value: InputValue, context: { e: KeyboardEvent }) => {
      setTInputValue('', { e: context.e, trigger: 'enter' });
      onInnerEnter(value, context);
      nextTick(() => {
        scrollToRight();
      });
    };

    const onClick = () => {
      tagInputRef.value.focus();
    };

    const onClearClick = (context: { e: MouseEvent }) => {
      clearAll(context);
      setTInputValue('', { e: context.e, trigger: 'clear' });
      props.onClear?.(context);
    };

    return {
      CLEAR_CLASS,
      tagValue,
      tInputValue,
      isHover,
      tagInputPlaceholder,
      showClearIcon,
      tagInputRef,
      setTInputValue,
      addHover,
      cancelHover,
      onInputEnter,
      onInnerEnter,
      onInputBackspaceKeyUp,
      renderLabel,
      onWheel,
      scrollToRightOnEnter,
      scrollToLeftOnLeave,
      onClick,
      onClearClick,
      onClose,
      classes,
    };
  },

  render() {
    const suffixIconNode = this.showClearIcon ? (
      <CloseCircleFilledIcon class={this.CLEAR_CLASS} onClick={this.onClearClick} />
    ) : (
      renderTNodeJSX(this, 'suffixIcon')
    );
    // 自定义 Tag 节点
    const displayNode = renderTNodeJSX(this, 'valueDisplay', {
      params: {
        value: this.tagValue,
        onClose: (index: number, item: any) => this.onClose({ index, item }),
      },
    });
    // 左侧文本
    const label = renderTNodeJSX(this, 'label', { silent: true });
    return (
      <TInput
        ref="tagInputRef"
        readonly={this.readonly}
        {...this.inputProps}
        value={this.tInputValue}
        onWheel={this.onWheel}
        autoWidth={this.autoWidth}
        size={this.size}
        disabled={this.disabled}
        label={() => this.renderLabel({ displayNode, label })}
        class={this.classes}
        tips={this.tips}
        status={this.status}
        placeholder={this.tagInputPlaceholder}
        suffix={this.suffix}
        suffixIcon={() => suffixIconNode}
        onChange={(val: InputValue, context?: { e?: InputEvent | MouseEvent }) => {
          this.setTInputValue(val, { ...context, trigger: 'input' });
        }}
        onPaste={this.onPaste}
        onEnter={this.onInputEnter}
        onKeyup={this.onInputBackspaceKeyUp}
        onMouseenter={(context: { e: MouseEvent }) => {
          this.addHover(context);
          this.scrollToRightOnEnter();
        }}
        onMouseleave={(context: { e: MouseEvent }) => {
          this.cancelHover(context);
          this.scrollToLeftOnLeave();
        }}
        onFocus={(inputValue: InputValue, context: { e: MouseEvent }) => {
          this.onFocus?.(this.tagValue, { e: context.e, inputValue });
        }}
        onBlur={(inputValue: InputValue, context: { e: MouseEvent }) => {
          this.onBlur?.(this.tagValue, { e: context.e, inputValue });
        }}
        onClick={this.onClick}
      />
    );
  },
});
