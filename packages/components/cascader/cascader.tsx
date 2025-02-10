import { defineComponent, computed } from 'vue';
import { omit } from 'lodash-es';
import Panel from './components/Panel';
import SelectInput from '../select-input';
import FakeArrow from '../common-components/fake-arrow';
import props from './props';

import { CascaderValue, TdSelectInputProps, TdCascaderProps } from './interface';
import { closeIconClickEffect, handleRemoveTagEffect } from './core/effect';
import { getPanels, getSingleContent, getMultipleContent } from './core/helper';
import { getFakeArrowIconClass } from './core/className';

import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useCascaderContext } from './hooks';
import { useTNodeJSX } from '../hooks/tnode';
import { useDisabled } from '../hooks/useDisabled';
import { useReadonly } from '../hooks/useReadonly';

export default defineComponent({
  name: 'TCascader',

  props: { ...props },

  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('cascader');
    const classPrefix = usePrefixClass();
    const { STATUS } = useCommonClassName();
    const overlayClassName = usePrefixClass('cascader__popup');
    const { globalConfig } = useConfig('cascader');
    const isDisabled = useDisabled();
    const isReadonly = useReadonly();
    const renderTNodeJSX = useTNodeJSX();

    // 拿到全局状态的上下文
    const { cascaderContext, innerValue, isFilterable, getCascaderItems } = useCascaderContext(props);

    const displayValue = computed(() =>
      props.multiple ? getMultipleContent(cascaderContext.value) : getSingleContent(cascaderContext.value),
    );

    const panels = computed(() => getPanels(cascaderContext.value.treeNodes));

    const inputPlaceholder = computed(
      () =>
        (cascaderContext.value.visible && !props.multiple && getSingleContent(cascaderContext.value)) ||
        (props.placeholder ?? globalConfig.value.placeholder),
    );

    const renderSuffixIcon = () => {
      if (props.suffixIcon || slots.suffixIcon) {
        return renderTNodeJSX('suffixIcon');
      }

      const { visible, disabled } = cascaderContext.value;
      return (
        <FakeArrow
          overlayClassName={getFakeArrowIconClass(classPrefix.value, STATUS.value, cascaderContext.value)}
          isActive={visible}
          disabled={disabled}
        />
      );
    };

    const valueDisplayParams = computed(() => {
      const arrayValue = innerValue.value instanceof Array ? innerValue.value : [innerValue.value];
      const displayValue =
        props.multiple && props.minCollapsedNum ? arrayValue.slice(0, props.minCollapsedNum) : innerValue.value;
      const options = getCascaderItems(arrayValue);
      return {
        value: innerValue.value,
        selectedOptions: options,
        onClose: (index: number) => {
          handleRemoveTagEffect(cascaderContext.value, index, props.onRemove);
        },
        displayValue,
      };
    });

    const renderValueDisplay = () => {
      return renderTNodeJSX('valueDisplay', {
        params: valueDisplayParams.value,
      });
    };

    const renderLabel = () => {
      const label = renderTNodeJSX('label');
      if (props.multiple) return label;
      if (!label) return null;
      return <div class={`${classPrefix.value}-tag-input__prefix`}>{label}</div>;
    };

    const cascaderClassNames = computed(() => [
      COMPONENT_NAME.value,
      props.multiple ? `${COMPONENT_NAME.value}--multiple` : `${COMPONENT_NAME.value}--single`,
    ]);

    return () => {
      const { setVisible, visible, inputVal, setInputVal } = cascaderContext.value;

      return (
        <SelectInput
          class={cascaderClassNames.value}
          value={displayValue.value}
          inputValue={visible ? inputVal : ''}
          popupVisible={visible}
          keys={props.keys}
          allowInput={isFilterable.value}
          min-collapsed-num={props.minCollapsedNum}
          collapsed-items={props.collapsedItems}
          readonly={isReadonly.value}
          disabled={isDisabled.value}
          clearable={props.clearable}
          placeholder={inputPlaceholder.value}
          multiple={props.multiple}
          loading={props.loading}
          status={props.status}
          tips={props.tips}
          borderless={props.borderless}
          label={renderLabel}
          valueDisplay={renderValueDisplay}
          prefixIcon={props.prefixIcon}
          suffix={props.suffix}
          suffixIcon={() => renderSuffixIcon()}
          popupProps={{
            ...(props.popupProps as TdCascaderProps['popupProps']),
            overlayInnerStyle: panels.value.length && !props.loading ? { width: 'auto' } : '',
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
          onInputChange={(value, ctx) => {
            if (!isFilterable.value) return;
            setInputVal(`${value}`);
            (props?.selectInputProps as TdSelectInputProps)?.onInputChange?.(value, ctx);
          }}
          onTagChange={(val: CascaderValue, ctx) => {
            // 按 enter 键不处理
            if (ctx.trigger === 'enter') return;
            handleRemoveTagEffect(cascaderContext.value, ctx.index, props.onRemove);
            // @ts-ignore TODO: fix bug
            (props?.selectInputProps as TdSelectInputProps)?.onTagChange?.(val, ctx);
          }}
          onPopupVisibleChange={(val: boolean, context) => {
            if (isDisabled.value) return;
            setVisible(val, context);
            (props?.selectInputProps as TdSelectInputProps)?.onPopupVisibleChange?.(val, context);
          }}
          onBlur={(val, context) => {
            props.onBlur?.({
              value: cascaderContext.value.value,
              inputValue: context.inputValue || '',
              e: context.e as FocusEvent,
            });
            (props?.selectInputProps as TdSelectInputProps)?.onBlur?.(val, context);
          }}
          onFocus={(val, context) => {
            props.onFocus?.({
              value: cascaderContext.value.value,
              e: context.e,
            });
            (props?.selectInputProps as TdSelectInputProps)?.onFocus?.(val, context);
          }}
          onClear={(context: { e: MouseEvent }) => {
            closeIconClickEffect(cascaderContext.value);
            (props?.selectInputProps as TdSelectInputProps)?.onClear?.(context);
          }}
          v-slots={{
            label: slots.label,
            suffix: slots.suffix,
            prefixIcon: slots.prefixIcon,
            panel: () => (
              <>
                {renderTNodeJSX('panelTopContent')}
                <Panel
                  option={props.option}
                  empty={props.empty}
                  visible={visible}
                  trigger={props.trigger}
                  loading={props.loading}
                  loadingText={props.loadingText}
                  cascaderContext={cascaderContext.value}
                  v-slots={{ option: slots.option, empty: slots.empty, loadingText: slots.loadingText }}
                />
                {renderTNodeJSX('panelBottomContent')}
              </>
            ),
            collapsedItems: slots.collapsedItems,
          }}
          {...omit(props.selectInputProps as TdSelectInputProps, [
            'onTagChange',
            'onInputChange',
            'onPopupVisibleChange',
            'onBlur',
            'onFocus',
            'onClear',
          ])}
        />
      );
    };
  },
});
