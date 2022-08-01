import { defineComponent, computed } from 'vue';
import Panel from './components/Panel';
import SelectInput from '../select-input';
import FakeArrow from '../common-components/fake-arrow';
import props from './props';

import { useCascaderContext } from './hooks';
import { CascaderValue, TdSelectInputProps, TdCascaderProps } from './interface';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';

import { closeIconClickEffect, handleRemoveTagEffect } from './core/effect';
import { getPanels, getSingleContent, getMultipleContent } from './core/helper';
import { getFakeArrowIconClass } from './core/className';
import { useFormDisabled } from '../form/hooks';

export default defineComponent({
  name: 'TCascader',

  props: { ...props },

  setup(props, { slots }) {
    const disabled = useFormDisabled();
    const COMPONENT_NAME = usePrefixClass('cascader');
    const classPrefix = usePrefixClass();
    const { STATUS } = useCommonClassName();
    const overlayClassName = usePrefixClass('cascader__popup');
    const { global } = useConfig('cascader');

    // 拿到全局状态的上下文
    const { cascaderContext, isFilterable } = useCascaderContext(props);

    const displayValue = computed(() =>
      props.multiple ? getMultipleContent(cascaderContext.value) : getSingleContent(cascaderContext.value),
    );

    const panels = computed(() => getPanels(cascaderContext.value.treeNodes));

    const inputPlaceholder = computed(
      () =>
        (cascaderContext.value.visible && !props.multiple && getSingleContent(cascaderContext.value)) ||
        (props.placeholder ?? global.value.placeholder),
    );

    const renderSuffixIcon = () => {
      const { visible, disabled } = cascaderContext.value;
      return (
        <FakeArrow
          overlayClassName={getFakeArrowIconClass(classPrefix.value, STATUS.value, cascaderContext.value)}
          isActive={visible}
          disabled={disabled}
        />
      );
    };

    return () => {
      const { setVisible, visible, inputVal, setInputVal } = cascaderContext.value;

      return (
        <SelectInput
          class={COMPONENT_NAME.value}
          value={displayValue.value}
          inputValue={visible ? inputVal : ''}
          popupVisible={visible}
          keys={props.keys}
          allowInput={isFilterable.value}
          min-collapsed-num={props.minCollapsedNum}
          collapsed-items={props.collapsedItems}
          readonly={props.readonly}
          disabled={props.disabled}
          clearable={props.clearable}
          placeholder={inputPlaceholder.value}
          multiple={props.multiple}
          loading={props.loading}
          suffixIcon={() => renderSuffixIcon()}
          popupProps={{
            ...(props.popupProps as TdCascaderProps['popupProps']),
            overlayStyle: panels.value.length ? { width: 'auto' } : '',
            overlayClassName: [
              overlayClassName.value,
              (props.popupProps as TdCascaderProps['popupProps'])?.overlayClassName,
            ],
          }}
          inputProps={{ size: props.size, ...(props.inputProps as TdCascaderProps['inputProps']) }}
          tagInputProps={{
            size: props.size,
            ...(props.tagInputProps as TdCascaderProps['tagInputProps']),
          }}
          tagProps={{ ...(props.tagProps as TdCascaderProps['tagProps']) }}
          {...(props.selectInputProps as TdSelectInputProps)}
          onInputChange={(value) => {
            if (!isFilterable.value) return;
            setInputVal(`${value}`);
          }}
          onTagChange={(val: CascaderValue, ctx) => {
            handleRemoveTagEffect(cascaderContext.value, ctx.index, props.onRemove);
          }}
          onPopupVisibleChange={(val: boolean, context) => {
            if (disabled.value) return;
            setVisible(val, context);
          }}
          onBlur={(val, context) => {
            props.onBlur?.({
              value: cascaderContext.value.value,
              e: context.e,
            });
          }}
          onFocus={(val, context) => {
            props.onFocus?.({
              value: cascaderContext.value.value,
              e: context.e,
            });
          }}
          onClear={() => {
            closeIconClickEffect(cascaderContext.value);
          }}
          v-slots={{
            panel: () => (
              <Panel
                empty={props.empty}
                visible={visible}
                trigger={props.trigger}
                cascaderContext={cascaderContext.value}
                v-slots={{ empty: slots.empty }}
              />
            ),
            collapsedItems: slots.collapsedItems,
          }}
          {...(props.selectInputProps as TdSelectInputProps)}
        />
      );
    };
  },
});
