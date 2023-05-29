import { defineComponent, computed, toRefs, ref, nextTick, reactive } from 'vue';
import { CloseCircleFilledIcon as TdCloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import TInput, { InputValue, TdInputProps } from '../input';
import { TdTagInputProps } from './type';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { useConfig } from '../config-provider/useConfig';
import { usePrefixClass } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import useTagScroll from './hooks/useTagScroll';
import useTagList from './useTagList';
import useHover from './hooks/useHover';
import useDefault from '../hooks/useDefaultValue';
import useDragSorter from './hooks/useDragSorter';
import isArray from 'lodash/isArray';

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
    const { CloseCircleFilledIcon } = useGlobalIcon({ CloseCircleFilledIcon: TdCloseCircleFilledIcon });

    const { inputValue, inputProps } = toRefs(props);
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
    const isComposition = ref(false);
    const { classPrefix } = useConfig();
    // 这里不需要响应式，因此直接传递参数
    const { getDragProps } = useDragSorter({
      ...props,
      sortOnDraggable: props.dragSort,
      onDragOverCheck: {
        x: true,
        targetClassNameRegExp: new RegExp(`^${classPrefix.value}-tag`),
      },
    });
    const { scrollToRight, onWheel, scrollToRightOnEnter, scrollToLeftOnLeave, tagInputRef } = useTagScroll(props);
    // handle tag add and remove
    // 需要响应式，为了尽量的和 react 版本做法相同，这里进行响应式处理
    const { tagValue, onInnerEnter, onInputBackspaceKeyUp, onInputBackspaceKeyDown, clearAll, renderLabel, onClose } =
      useTagList(
        reactive({
          ...toRefs(props),
          getDragProps,
        }),
      );

    const classes = computed(() => {
      const isEmpty = !(isArray(tagValue.value) && tagValue.value.length);
      return [
        NAME_CLASS.value,
        {
          [BREAK_LINE_CLASS.value]: excessTagsDisplayType.value === 'break-line',
          [`${classPrefix.value}-is-empty`]: isEmpty,
          [`${classPrefix.value}-tag-input--with-tag`]: !isEmpty,
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
      // 阻止 Enter 默认行为，避免在 Form 中触发 submit 事件
      context.e?.preventDefault?.();
      setTInputValue('', { e: context.e, trigger: 'enter' });
      !isComposition.value && onInnerEnter(value, context);
      nextTick(() => {
        scrollToRight();
        isComposition.value = false;
      });
    };

    const onInputCompositionstart = (value: InputValue, context: { e: CompositionEvent }) => {
      isComposition.value = true;
      inputProps.value?.onCompositionstart?.(value, context);
    };

    const onInputCompositionend = (value: InputValue, context: { e: CompositionEvent }) => {
      isComposition.value = false;
      inputProps.value?.onCompositionend?.(value, context);
    };

    const onClick: TdInputProps['onClick'] = (ctx) => {
      tagInputRef.value.focus();
      props.onClick?.(ctx);
    };

    const onClearClick = (context: { e: MouseEvent }) => {
      clearAll(context);
      setTInputValue('', { e: context.e, trigger: 'clear' });
      props.onClear?.(context);
    };

    const focus = () => {
      tagInputRef.value.focus();
    };

    return {
      CLEAR_CLASS,
      CloseCircleFilledIcon,
      tagValue,
      tInputValue,
      isHover,
      tagInputPlaceholder,
      showClearIcon,
      tagInputRef,
      classPrefix,
      setTInputValue,
      addHover,
      cancelHover,
      onInputEnter,
      onInnerEnter,
      onInputBackspaceKeyUp,
      onInputBackspaceKeyDown,
      renderLabel,
      onWheel,
      scrollToRightOnEnter,
      scrollToLeftOnLeave,
      onClick,
      onClearClick,
      onClose,
      onInputCompositionstart,
      onInputCompositionend,
      focus,
      classes,
    };
  },

  render() {
    const { CloseCircleFilledIcon } = this;
    const suffixIconNode = this.showClearIcon ? (
      <CloseCircleFilledIcon class={this.CLEAR_CLASS} onClick={this.onClearClick} />
    ) : (
      renderTNodeJSX(this, 'suffixIcon')
    );
    const suffixClass = `${this.classPrefix}-tag-input__with-suffix-icon`;
    if (suffixIconNode && !this.classes.includes(suffixClass)) {
      this.classes.push(suffixClass);
    }
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
        v-slots={{
          suffix: this.$slots.suffix,
        }}
        readonly={this.readonly}
        value={this.tInputValue}
        autoWidth={true} // 控制input_inner的宽度 设置为true让内部input不会提前换行
        size={this.size}
        disabled={this.disabled}
        label={() => this.renderLabel({ displayNode, label })}
        class={this.classes}
        tips={this.tips}
        status={this.status}
        placeholder={this.tagInputPlaceholder}
        suffix={this.suffix}
        suffixIcon={() => suffixIconNode}
        showInput={
          !(this.inputProps as TdTagInputProps['inputProps'])?.readonly || !this.tagValue || !this.tagValue?.length
        }
        keepWrapperWidth={!this.autoWidth}
        onWheel={this.onWheel}
        onChange={(val, context) => {
          this.setTInputValue(val, { ...context, trigger: 'input' });
        }}
        onPaste={this.onPaste}
        onEnter={this.onInputEnter}
        onKeyup={this.onInputBackspaceKeyUp}
        onKeydown={this.onInputBackspaceKeyDown}
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
          this.setTInputValue('', { e: context.e, trigger: 'blur' });
          this.onBlur?.(this.tagValue, { e: context.e, inputValue: '' });
        }}
        onClick={this.onClick}
        onCompositionstart={this.onInputCompositionstart}
        onCompositionend={this.onInputCompositionend}
        {...(this.inputProps as TdTagInputProps['inputProps'])}
      />
    );
  },
});
