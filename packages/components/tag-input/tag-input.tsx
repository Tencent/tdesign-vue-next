import { defineComponent, computed, toRefs, ref, nextTick, reactive, watch } from 'vue';
import { CloseCircleFilledIcon as TdCloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import TInput, { InputProps, StrInputProps, TdInputProps } from '../input';
import { TdTagInputProps } from './type';
import props from './props';
import { useConfig } from '../config-provider/hooks/useConfig';
import { usePrefixClass } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import { useTagScroll, useHover, useDragSorter, useTagList } from './hooks';
import useDefault from '../hooks/useDefaultValue';
import { isArray } from 'lodash-es';
import { useDisabled } from '../hooks/useDisabled';
import { useReadonly } from '../hooks/useReadonly';
import { useTNodeJSX } from '../hooks/tnode';

const useComponentClassName = () => {
  return {
    NAME_CLASS: usePrefixClass('tag-input'),
    CLEAR_CLASS: usePrefixClass('tag-input__suffix-clear'),
    BREAK_LINE_CLASS: usePrefixClass('tag-input--break-line'),
  };
};

export default defineComponent({
  name: 'TTagInput',
  props,
  setup(props: TdTagInputProps, { slots }) {
    const renderTNodeJSX = useTNodeJSX();
    const { NAME_CLASS, CLEAR_CLASS, BREAK_LINE_CLASS } = useComponentClassName();
    const { CloseCircleFilledIcon } = useGlobalIcon({ CloseCircleFilledIcon: TdCloseCircleFilledIcon });

    const isDisabled = useDisabled();
    const isReadonly = useReadonly();

    const { inputValue, inputProps, borderless, size, tips, status, suffix, autoWidth, onPaste } = toRefs(props);
    const [tInputValue, setTInputValue] = useDefault(
      inputValue,
      props.defaultInputValue,
      props.onInputChange,
      'inputValue',
    );
    const { excessTagsDisplayType, clearable, placeholder } = toRefs(props);
    const { isHover, addHover, cancelHover } = useHover({
      readonly: isReadonly.value,
      disabled: isDisabled.value,
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
    const { scrollToRight, onWheel, scrollToRightOnEnter, scrollToLeftOnLeave, tagInputRef, isScrollable } =
      useTagScroll(props);
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
          [`${classPrefix.value}-tag-input--drag-sort`]: props.dragSort && !isReadonly.value && !isDisabled.value,
        },
      ];
    });

    const tagInputPlaceholder = computed(() => (!tagValue.value?.length ? placeholder.value : ''));

    const showClearIcon = computed(() =>
      Boolean(
        !isReadonly.value &&
          !isDisabled.value &&
          clearable.value &&
          isHover.value &&
          (tagValue.value?.length || tInputValue.value),
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
      if (isDisabled.value || isReadonly.value) return;
      isFocused.value = true;
      tagInputRef.value?.focus();
      props.onClick?.(ctx);
    };

    const onClearClick = (context: { e: MouseEvent }) => {
      clearAll(context);
      setTInputValue('', { e: context.e, trigger: 'clear' });
      props.onClear?.(context);
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
      if (isFocused.value) return;
      isFocused.value = true;
      props.onFocus?.(tagValue.value, { e: context.e, inputValue });
    };

    const onInnerBlur: InputProps['onBlur'] = (inputValue: string, context: { e: MouseEvent }) => {
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
        if (props.excessTagsDisplayType !== 'scroll') return;
        const scrollElementClass = `${classPrefix.value}-input__prefix`;
        const scrollElement = tagInputRef.value.$el.querySelector(`.${scrollElementClass}`);
        if (v) scrollElement.classList.add(`${scrollElementClass}--scrollable`);
        else scrollElement.classList.remove(`${scrollElementClass}--scrollable`);
      },
    );

    return () => {
      const suffixIconNode = showClearIcon.value ? (
        <CloseCircleFilledIcon class={CLEAR_CLASS.value} onClick={onClearClick} />
      ) : (
        renderTNodeJSX('suffixIcon')
      );
      const prefixIconNode = renderTNodeJSX('prefixIcon');
      const suffixClass = `${classPrefix.value}-tag-input__with-suffix-icon`;
      if (suffixIconNode && !classes.value.includes(suffixClass)) {
        classes.value.push(suffixClass);
      }
      // 自定义 Tag 节点
      const displayNode = renderTNodeJSX('valueDisplay', {
        params: {
          value: tagValue.value,
          onClose: (index: number) => onClose({ index }),
        },
      });
      // 左侧文本
      const label = renderTNodeJSX('label', { silent: true });
      // const inputProps = inputProps as TdTagInputProps['inputProps'];
      const readonly = isReadonly.value || inputProps.value?.readonly;

      return (
        <TInput
          ref={tagInputRef}
          v-slots={{
            suffix: slots.suffix,
          }}
          borderless={borderless.value}
          readonly={readonly}
          showInput={!readonly || !tagValue.value || !tagValue.value?.length}
          value={tInputValue.value}
          autoWidth={true} // 控制input_inner的宽度 设置为true让内部input不会提前换行
          size={size.value}
          disabled={isDisabled.value}
          label={() => renderLabel({ displayNode, label })}
          class={classes.value}
          tips={tips.value}
          status={status.value}
          placeholder={tagInputPlaceholder.value}
          suffix={suffix.value}
          suffixIcon={() => suffixIconNode}
          prefixIcon={() => prefixIconNode}
          keepWrapperWidth={!autoWidth.value}
          onWheel={onWheel}
          onChange={onInnerChange}
          onPaste={onPaste.value}
          onEnter={onInputEnter}
          onKeyup={onInputBackspaceKeyUp}
          onKeydown={onInputBackspaceKeyDown}
          onMouseenter={onMouseEnter}
          onMouseleave={onMouseLeave}
          onFocus={onInnerFocus}
          onBlur={onInnerBlur}
          onClick={onClick}
          onCompositionstart={onInputCompositionstart}
          onCompositionend={onInputCompositionend}
          {...inputProps.value}
        />
      );
    };
  },
});
