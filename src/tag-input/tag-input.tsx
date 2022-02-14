import { defineComponent, ref, computed, toRefs, nextTick } from 'vue';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { prefix } from '../config';
import TInput, { InputValue } from '../input';
import { TdTagInputProps } from './type';
import props from './props';
import { useTNodeJSX } from '../hooks/tnode';
import useTagScroll from './useTagScroll';
import useTagList from './useTagList';
import useHover from './useHover';

const NAME_CLASS = `${prefix}-tag-input`;
const CLEAR_CLASS = `${prefix}-tag-input__suffix-clear`;
const BREAK_LINE_CLASS = `${prefix}-tag-input--break-line`;

export default defineComponent({
  name: 'TTagInput',

  props: { ...props },

  setup(props: TdTagInputProps, context) {
    const tInputValue = ref<InputValue>();
    const { excessTagsDisplayType, readonly, disabled, clearable, placeholder } = toRefs(props);
    const { isHover, addHover, cancelHover } = useHover(props);
    const { scrollToRight, onWheel, scrollToRightOnEnter, scrollToLeftOnLeave, tagInputRef } = useTagScroll(props);
    // handle tag add and remove
    const { tagValue, onInnerEnter, onInputBackspaceKeyUp, clearAll, renderLabel } = useTagList(props, context);

    const classes = computed(() => {
      return [
        NAME_CLASS,
        {
          [BREAK_LINE_CLASS]: excessTagsDisplayType.value === 'break-line',
        },
      ];
    });

    const tagInputPlaceholder = computed(() => {
      return isHover.value || !tagValue.value?.length ? placeholder.value : '';
    });

    const showClearIcon = computed(() => {
      return Boolean(!readonly.value && !disabled.value && clearable.value && isHover.value && tagValue.value?.length);
    });

    const onInputEnter = (value: InputValue, context: { e: KeyboardEvent }) => {
      tInputValue.value = '';
      onInnerEnter(value, context);
      nextTick(() => {
        scrollToRight();
      });
    };

    return {
      tagValue,
      tInputValue,
      isHover,
      tagInputPlaceholder,
      showClearIcon,
      tagInputRef,
      addHover,
      cancelHover,
      onInputEnter,
      onInnerEnter,
      onInputBackspaceKeyUp,
      clearAll,
      renderLabel,
      onWheel,
      scrollToRightOnEnter,
      scrollToLeftOnLeave,
      classes,
      slots: context.slots,
    };
  },

  render() {
    const suffixIconNode = this.showClearIcon ? (
      <CloseCircleFilledIcon class={CLEAR_CLASS} onClick={this.clearAll} />
    ) : (
      useTNodeJSX('suffixIcon', { slots: this.slots })
    );
    // 自定义 Tag 节点
    const displayNode = useTNodeJSX('valueDisplay', {
      slots: this.slots,
      params: { value: this.tagValue },
    });
    // 左侧文本
    const label = useTNodeJSX('label', { slots: this.slots });
    return (
      <TInput
        ref="tagInputRef"
        {...this.inputProps}
        value={this.tInputValue}
        onChange={(val: InputValue) => {
          this.tInputValue = val;
        }}
        onMousewheel={this.onWheel}
        size={this.size}
        readonly={this.readonly}
        disabled={this.disabled}
        label={() => this.renderLabel({ slots: this.slots, displayNode, label })}
        class={this.classes}
        tips={this.tips}
        status={this.status}
        placeholder={this.tagInputPlaceholder}
        suffix={this.suffix}
        suffixIcon={() => suffixIconNode}
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
      />
    );
  },
});
