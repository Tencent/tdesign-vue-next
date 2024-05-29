import { computed, defineComponent, nextTick, reactive, ref, toRefs, watch } from '@td/adapter-vue';
import { CloseCircleFilledIcon as TdCloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import type { TdTagInputProps } from '@td/components/tag-input/type';
import props from '@td/components/tag-input/props';
import { useDefaultValue, useGlobalIcon, usePrefixClass, useTNodeJSX } from '@td/adapter-hooks';
import { isArray } from 'lodash-es';
import type { InputProps, StrInputProps, TdInputProps } from '../input';
import TInput from '../input';
import { useConfig } from '../config-provider/useConfig';
import useTagScroll from './hooks/useTagScroll';
import useTagList from './useTagList';
import useHover from './hooks/useHover';
import useDragSorter from './hooks/useDragSorter';

function useComponentClassName() {
  return {
    NAME_CLASS: usePrefixClass('tag-input'),
    CLEAR_CLASS: usePrefixClass('tag-input__suffix-clear'),
    BREAK_LINE_CLASS: usePrefixClass('tag-input--break-line'),
  };
}

export default defineComponent({
  name: 'TTagInput',

  props: { ...props },

  setup(props: TdTagInputProps) {
    const { NAME_CLASS, CLEAR_CLASS, BREAK_LINE_CLASS } = useComponentClassName();
    const { CloseCircleFilledIcon } = useGlobalIcon({ CloseCircleFilledIcon: TdCloseCircleFilledIcon });

    const { inputValue, inputProps } = toRefs(props);
    const [tInputValue, setTInputValue] = useDefaultValue(
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
    const isFocused = ref(false);

    // 这里不需要响应式，因此直接传递参数
    const { getDragProps } = useDragSorter({
      ...props,
      sortOnDraggable: props.dragSort,
      onDragOverCheck: {
        x: true,
        targetClassNameRegExp: new RegExp(`^${classPrefix.value}-tag`),
      },
    });
    const { scrollToRight, onWheel, scrollToRightOnEnter, scrollToLeftOnLeave, tagInputRef, isScrollable }
      = useTagScroll(props);
    // handle tag add and remove
    // 需要响应式，为了尽量的和 react 版本做法相同，这里进行响应式处理
    const { tagValue, onInnerEnter, onInputBackspaceKeyUp, onInputBackspaceKeyDown, clearAll, renderLabel, onClose }
      = useTagList(
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
        !readonly.value
        && !disabled.value
        && clearable.value
        && isHover.value
        && (tagValue.value?.length || tInputValue.value),
      ),
    );

    const onInputEnter = (value: string, context: { e: KeyboardEvent }) => {
      // 阻止 Enter 默认行为，避免在 Form 中触发 submit 事件
      context.e?.preventDefault?.();
      setTInputValue('', { e: context.e, trigger: 'enter' });
      !isComposition.value && onInnerEnter(value, context);
      nextTick(() => {
        scrollToRight();
        isComposition.value = false;
      });
    };

    const onInputCompositionstart = (value: string, context: { e: CompositionEvent }) => {
      isComposition.value = true;
      inputProps.value?.onCompositionstart?.(value, context);
    };

    const onInputCompositionend = (value: string, context: { e: CompositionEvent }) => {
      isComposition.value = false;
      inputProps.value?.onCompositionend?.(value, context);
    };

    const onClick: TdInputProps['onClick'] = (ctx) => {
      if (disabled.value) {
        return;
      }
      isFocused.value = true;
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

    const blur = () => {
      tagInputRef.value.blur();
    };

    const onMouseEnter: InputProps['onMouseenter'] = (context) => {
      addHover(context);
      scrollToRightOnEnter();
    };

    const onMouseLeave: InputProps['onMouseleave'] = (context) => {
      cancelHover(context);
      scrollToLeftOnLeave();
    };

    const onInnerFocus: InputProps['onFocus'] = (inputValue: string, context: { e: MouseEvent }) => {
      if (isFocused.value) {
        return;
      }
      isFocused.value = true;
      props.onFocus?.(tagValue.value, { e: context.e, inputValue });
    };

    const onInnerBlur: InputProps['onFocus'] = (inputValue: string, context: { e: MouseEvent }) => {
      isFocused.value = false;
      setTInputValue('', { e: context.e, trigger: 'blur' });
      props.onBlur?.(tagValue.value, { e: context.e, inputValue });
    };

    const onInnerChange: StrInputProps['onChange'] = (val, context) => {
      setTInputValue(val, { ...context, trigger: 'input' });
    };

    watch(
      () => isScrollable.value,
      (v) => {
        if (props.excessTagsDisplayType !== 'scroll') {
          return;
        }
        const scrollElementClass = `${classPrefix.value}-input__prefix`;
        const scrollElement = tagInputRef.value.$el.querySelector(`.${scrollElementClass}`);
        if (v) {
          scrollElement.classList.add(`${scrollElementClass}--scrollable`);
        } else {
          scrollElement.classList.remove(`${scrollElementClass}--scrollable`);
        }
      },
    );
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
      isFocused,
      focus,
      blur,
      setTInputValue,
      onMouseEnter,
      onMouseLeave,
      onInnerFocus,
      onInnerBlur,
      onInnerChange,
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
      classes,
    };
  },

  render() {
    const { CloseCircleFilledIcon } = this;
    const renderTNodeJSX = useTNodeJSX();

    const suffixIconNode = this.showClearIcon
      ? (
        <CloseCircleFilledIcon class={this.CLEAR_CLASS} onClick={this.onClearClick} />
        )
      : (
          renderTNodeJSX('suffixIcon')
        );
    const prefixIconNode = renderTNodeJSX('prefixIcon');
    const suffixClass = `${this.classPrefix}-tag-input__with-suffix-icon`;
    if (suffixIconNode && !this.classes.includes(suffixClass)) {
      this.classes.push(suffixClass);
    }
    // 自定义 Tag 节点
    const displayNode = renderTNodeJSX('valueDisplay', {
      params: {
        value: this.tagValue,
        onClose: (index: number) => this.onClose({ index }),
      },
    });
    // 左侧文本
    const label = renderTNodeJSX('label', { silent: true });
    const inputProps = this.inputProps as TdTagInputProps['inputProps'];
    const readonly = this.readonly || inputProps?.readonly;
    return (
      <TInput
        ref="tagInputRef"
        v-slots={{
          suffix: this.$slots.suffix,
        }}
        borderless={this.borderless}
        readonly={readonly}
        showInput={!readonly || !this.tagValue || !this.tagValue?.length}
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
        prefixIcon={() => prefixIconNode}
        keepWrapperWidth={!this.autoWidth}
        onWheel={this.onWheel}
        onChange={this.onInnerChange}
        onPaste={this.onPaste}
        onEnter={this.onInputEnter}
        onKeyup={this.onInputBackspaceKeyUp}
        onKeydown={this.onInputBackspaceKeyDown}
        onMouseenter={this.onMouseEnter}
        onMouseleave={this.onMouseLeave}
        onFocus={this.onInnerFocus}
        onBlur={this.onInnerBlur}
        onClick={this.onClick}
        onCompositionstart={this.onInputCompositionstart}
        onCompositionend={this.onInputCompositionend}
        {...(this.inputProps as TdTagInputProps['inputProps'])}
      />
    );
  },
});
