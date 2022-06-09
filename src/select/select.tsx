import { defineComponent, provide, computed, toRefs, VNode } from 'vue';

import FakeArrow from '../common-components/fake-arrow';
import SelectInput from '../select-input';
import SelectPanel from './select-panel';

import props from './props';
import { TdSelectProps, TdOptionProps, SelectValue } from './type';

// hooks
import { useFormDisabled } from '../form/hooks';
import useDefaultValue from '../hooks/useDefaultValue';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { selectInjectKey, getSingleContent, getMultipleContent } from './constants';
import { useSelectOptions } from './hooks';

export default defineComponent({
  name: 'TSelect',
  props: { ...props },
  setup(props, { slots }) {
    const disabled = useFormDisabled();

    const COMPONENT_NAME = usePrefixClass('select');
    const { global, t } = useConfig('select');
    const { popupVisible, inputValue, modelValue, value } = toRefs(props);
    const renderTNodeJSX = useTNodeJSX();
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const [innerPopupVisible, setInnerPopupVisible] = useDefaultValue(
      popupVisible,
      false,
      props.onPopupVisibleChange,
      'popupVisible',
    );

    const [innerInputValue, setTInputValue] = useDefaultValue(
      inputValue,
      props.defaultInputValue,
      props.onInputChange,
      'inputValue',
    );

    const { options, optionsMap } = useSelectOptions(props);

    const SelectProvide = computed(() => ({
      slots,
      max: props.max,
      selectValue: innerValue.value,
      keys: props.keys,
      onChange: setInnerValue,
      onPopupVisibleChange: setInnerPopupVisible,
      multiple: props.multiple,
      size: props.size,
    }));

    provide(selectInjectKey, SelectProvide);

    const placeholderText = computed(
      () =>
        ((!props.multiple && innerPopupVisible.value && getSingleContent(innerValue.value, props.options)) ||
          props.placeholder) ??
        t(global.value.placeholder),
    );

    // selectInput 展示值
    const displayText = computed(() =>
      props.multiple
        ? getMultipleContent(innerValue.value as SelectValue[], options.value)
        : getSingleContent(innerValue.value, options.value),
    );

    // valueDisplayParmas参数
    const valueDisplayParmas = computed(() =>
      props.multiple
        ? (innerValue.value as SelectValue[]).map((value) => ({ value, label: optionsMap.value[value as string] }))
        : innerValue.value,
    );

    const removeTag = (index: number, e?: MouseEvent) => {
      e && e.stopPropagation();

      (innerValue.value as SelectValue[]).splice(index, 1);
      setInnerValue(innerValue.value, { e, trigger: 'clear' });
      props.onRemove?.({
        value: '',
        data: '',
        e,
      });
    };

    return () => {
      const { overlayClassName, ...restPopupProps } = (props.popupProps || {}) as TdSelectProps['popupProps'];

      return (
        <div class={`${COMPONENT_NAME.value}__wrap`}>
          <SelectInput
            class={COMPONENT_NAME.value}
            autoWidth={props.autoWidth}
            value={displayText.value}
            borderless={props.borderless || !props.bordered}
            readonly={props.readonly}
            allowInput={innerPopupVisible.value && props.filterable}
            multiple={props.multiple}
            clearable={props.clearable}
            disabled={disabled.value}
            loading={props.loading}
            inputProps={{
              size: props.size,
              ...(props.inputProps as TdSelectProps['inputProps']),
            }}
            tagInputProps={{
              size: props.size,
              ...(props.tagInputProps as TdSelectProps['tagInputProps']),
            }}
            onTagChange={(val, ctx) => {
              removeTag(ctx.index);
            }}
            tagProps={props.tagProps as TdSelectProps['tagProps']}
            minCollapsedNum={props.minCollapsedNum}
            collapsed-items={props.collapsedItems}
            popupVisible={innerPopupVisible.value}
            popupProps={{
              overlayClassName: [`${COMPONENT_NAME.value}__dropdown`, ['narrow-scrollbar'], overlayClassName],
              ...restPopupProps,
            }}
            onClear={({ e }) => {
              setInnerValue(props.multiple ? [] : '');
            }}
            placeholder={placeholderText.value}
            inputValue={innerInputValue.value}
            label={() => renderTNodeJSX('prefixIcon')}
            suffixIcon={() => (
              <FakeArrow overlayClassName={`${COMPONENT_NAME.value}__right-icon`} isActive={innerPopupVisible.value} />
            )}
            onPopupVisibleChange={(val: boolean, context) => {
              if (disabled.value) return;
              setInnerPopupVisible(val, context);
            }}
            valueDisplay={() =>
              renderTNodeJSX('valueDisplay', {
                params: { value: valueDisplayParmas.value, onClose: (index: number) => removeTag(index) },
              })
            }
            v-slots={{
              panel: () => (
                <SelectPanel
                  size={props.size}
                  multiple={props.multiple}
                  empty={props.empty}
                  loading={props.loading}
                  options={options.value}
                  loadingText={props.loadingText}
                  max={props.max}
                  inputValue={innerInputValue.value}
                  value={innerValue.value}
                  v-slots={slots}
                />
              ),
              collapsedItems: slots.collapsedItems,
            }}
          />
        </div>
      );
    };
  },
});
