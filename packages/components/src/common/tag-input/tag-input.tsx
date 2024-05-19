import { computed, defineComponent, nextTick, reactive, ref, toRefs, watch } from '@td/adapter-vue';
import { CloseCircleFilledIcon as TdCloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import type { TdTagInputProps } from '@td/intel/components/tag-input/type';
import props from '@td/intel/components/tag-input/props';
import { useDefaultValue, useEmitEvent, useGlobalIcon, usePrefixClass, useTNodeJSX } from '@td/adapter-hooks';
import { isArray } from 'lodash-es';
import TInput from '../input';
import type { InputProps, StrInputProps, TdInputProps } from '../input';

import useTagScroll from './hooks/useTagScroll';
import useTagList from './hooks/useTagList';
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
  props,
  setup(props: TdTagInputProps, { slots }) {
    const emitEvent = useEmitEvent();
    const renderTNodeJSX = useTNodeJSX();
    const { NAME_CLASS, CLEAR_CLASS, BREAK_LINE_CLASS } = useComponentClassName();
    const { CloseCircleFilledIcon } = useGlobalIcon({ CloseCircleFilledIcon: TdCloseCircleFilledIcon });

    const { inputValue, inputProps } = toRefs(props);
    const [tInputValue, setTInputValue] = useDefaultValue(
      inputValue,
      props.defaultInputValue,
      props.onInputChange,
      'inputValue',
      'input-change',
    );
    const { excessTagsDisplayType, readonly, disabled, clearable, placeholder } = toRefs(props);
    const { isHover, addHover, cancelHover } = useHover({
      readonly: props.readonly,
      disabled: props.disabled,
      onMouseenter: props.onMouseenter,
      onMouseleave: props.onMouseleave,
    });
    const isComposition = ref(false);
    const classPrefix = usePrefixClass();
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

    const {
      scrollToRight,
      onWheel,
      scrollToRightOnEnter,
      scrollToLeftOnLeave,
      tagInputRef,
      isScrollable,
    } = useTagScroll(props);

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
      emitEvent('click', ctx);
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
      emitEvent('focus', tagValue.value, { e: context.e, inputValue });
    };

    const onInnerBlur: InputProps['onFocus'] = (inputValue: string, context: { e: MouseEvent }) => {
      isFocused.value = false;
      setTInputValue('', { e: context.e, trigger: 'blur' });
      emitEvent('blur', tagValue.value, { e: context.e, inputValue });
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

    return () => {
      const suffixIconNode = showClearIcon.value
        ? <CloseCircleFilledIcon class={CLEAR_CLASS.value} onClick={onClearClick} />
        : renderTNodeJSX('suffixIcon');

      const prefixIconNode = renderTNodeJSX('prefixIcon');

      const suffixClass = `${classPrefix.value}-tag-input__with-suffix-icon`;
      if (suffixIconNode && !classes.value.includes(suffixClass)) {
        classes.value.push(suffixClass);
      }
      // 自定义 Tag 节点
      const displayNode = renderTNodeJSX('valueDisplay', {
        params: {
          value: tagValue.value,
          onClose: (index: number, item: any) => onClose({ index, item }),
        },
      });
      // 左侧文本
      const label = renderTNodeJSX('label', { silent: true });
      const tagInputReadonly = readonly?.value || inputProps?.value?.readonly;

      return (
        <TInput
          ref={tagInputRef}
          v-slots={{
            suffix: slots.suffix,
          }}
          readonly={tagInputReadonly}
          showInput={!tagInputReadonly || !tagValue.value || !tagValue.value?.length}
          value={tInputValue.value}
          autoWidth={true} // 控制input_inner的宽度 设置为true让内部input不会提前换行
          size={props.size}
          disabled={disabled?.value}
          label={() => renderLabel({ displayNode, label })}
          class={classes.value}
          tips={props.tips}
          status={props.status}
          placeholder={tagInputPlaceholder.value}
          suffix={props.suffix}
          suffixIcon={() => suffixIconNode}
          prefixIcon={() => prefixIconNode}
          keepWrapperWidth={!props.autoWidth}
          onWheel={onWheel}
          onChange={onInnerChange}
          onPaste={e => props.onPaste?.(e)}
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
          {...(props.inputProps as TdTagInputProps['inputProps'])}
        />
      );
    };
  },
});
