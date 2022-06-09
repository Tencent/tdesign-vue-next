import { defineComponent, provide, computed, toRefs, VNode } from 'vue';
import isArray from 'lodash/isArray';

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
import { useChildComponentSlots } from '../hooks/slot';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { selectInjectKey, getSingleContent, getMultipleContent } from './constants';

export default defineComponent({
  name: 'TSelect',
  props: { ...props },
  setup(props, { slots }) {
    const disabled = useFormDisabled();
    const getChildComponentSlots = useChildComponentSlots();
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

    const options = computed(() => {
      const { options = [] } = props;
      const childSlots = getChildComponentSlots('TOption');
      if (isArray(childSlots)) {
        for (const child of childSlots as VNode[]) {
          options.push(child.props as TdOptionProps);
        }
      }
      return options;
    });

    const [innerInputValue, setTInputValue] = useDefaultValue(
      inputValue,
      props.defaultInputValue,
      props.onInputChange,
      'inputValue',
    );

    const onOptionClick = (value: TdSelectProps['value']) => {
      setInnerPopupVisible(false);
      setInnerValue(value);
    };

    const SelectProvide = computed(() => ({
      slots,
      selectValue: innerValue.value,
      keys: props.keys,
      onOptionClick,
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

    const displayText = computed(() =>
      props.multiple
        ? getMultipleContent(innerValue.value as SelectValue[], options.value)
        : getSingleContent(innerValue.value, options.value),
    );

    return () => (
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
          label={() => renderTNodeJSX('prefixIcon')}
          inputProps={{
            size: props.size,
            ...(props.inputProps as TdSelectProps['inputProps']),
          }}
          tagInputProps={{
            size: props.size,
            ...(props.tagInputProps as TdSelectProps['tagInputProps']),
          }}
          tagProps={props.tagProps as TdSelectProps['tagProps']}
          minCollapsedNum={props.minCollapsedNum}
          popupVisible={innerPopupVisible.value}
          popupProps={{
            overlayClassName: [`${COMPONENT_NAME.value}__dropdown`, ['narrow-scrollbar']],
          }}
          placeholder={placeholderText.value}
          inputValue={innerInputValue.value}
          suffixIcon={() => (
            <FakeArrow overlayClassName={`${COMPONENT_NAME.value}__right-icon`} isActive={innerPopupVisible.value} />
          )}
          onPopupVisibleChange={(val: boolean, context) => {
            if (disabled.value) return;
            setInnerPopupVisible(val, context);
          }}
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
              />
            ),
            collapsedItems: slots.collapsedItems,
          }}
        />
      </div>
    );
  },
});
