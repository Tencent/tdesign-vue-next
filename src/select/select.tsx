import { defineComponent, provide, computed, toRefs, watch, ref } from 'vue';
import picker from 'lodash/pick';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';

import FakeArrow from '../common-components/fake-arrow';
import SelectInput from '../select-input';
import SelectPanel from './select-panel';

import props from './props';
import { TdSelectProps, SelectValue } from './type';
import { PopupVisibleChangeContext } from '../popup';

// hooks
import { useFormDisabled } from '../form/hooks';
import useDefaultValue from '../hooks/useDefaultValue';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { selectInjectKey, getSingleContent, getMultipleContent, getNewMultipleValue } from './helper';
import { useSelectOptions } from './hooks';

export default defineComponent({
  name: 'TSelect',
  props: { ...props },
  setup(props: TdSelectProps, { slots }) {
    const disabled = useFormDisabled();
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('select');
    const { global, t } = useConfig('select');
    const { popupVisible, inputValue, modelValue, value } = toRefs(props);
    const [orgValue, seOrgValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const keys = computed(() => ({
      label: props.keys?.label || 'label',
      value: props.keys?.value || 'value',
    }));
    const { options, optionsMap, optionsList } = useSelectOptions(props, keys);

    // 内部数据,格式化过的
    const innerValue = computed(() => {
      if (props.valueType === 'object') {
        return !props.multiple
          ? orgValue.value[keys.value.value]
          : (orgValue.value as SelectValue[]).map((option) => option[keys.value.value]);
      }
      return orgValue.value;
    });
    const setInnerValue: TdSelectProps['onChange'] = (newVal: SelectValue | SelectValue[], e) => {
      if (props.valueType === 'object') {
        const { value, label } = keys.value;
        const getOption = (val: SelectValue) => {
          const option = optionsMap.value.get(val);
          return {
            [value]: get(option, value),
            [label]: get(option, label),
          };
        };
        newVal = props.multiple ? (newVal as SelectValue[]).map((val) => getOption(val)) : getOption(newVal);
      }
      seOrgValue(newVal, e);
    };

    const [innerInputValue, setInputValue] = useDefaultValue(
      inputValue,
      props.defaultInputValue,
      props.onInputChange,
      'inputValue',
    );
    const [innerPopupVisible, setInnerPopupVisible] = useDefaultValue(
      popupVisible,
      false,
      (visible: boolean, context: PopupVisibleChangeContext) => {
        props.onPopupVisibleChange?.(visible, context);
        props.onVisibleChange?.(visible);
      },
      'popupVisible',
    );

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
    const valueDisplayParmas = computed(() => {
      return props.multiple
        ? (innerValue.value as SelectValue[]).map((value) => ({
            value,
            label: optionsMap.value.get(value)?.label,
          }))
        : innerValue.value;
    });

    const isFilterable = computed(() => {
      return Boolean(props.filterable || isFunction(props.filter));
    });

    // 移除tag
    const removeTag = (index: number, e?: MouseEvent) => {
      e && e.stopPropagation();
      const selectValue = cloneDeep(innerValue.value) as SelectValue[];
      const value = selectValue[index];
      selectValue.splice(index, 1);
      setInnerValue(selectValue, { e, trigger: 'tag-remove' });
      props.onRemove?.({
        value: value as string | number,
        data: optionsMap.value.get(value),
        e,
      });
    };

    const handleCreate = () => {
      if (!innerInputValue.value) return;
      props.onCreate?.(innerInputValue.value);
      setInputValue('');
    };

    // 键盘操作逻辑
    const hoverIndex = ref(-1);
    const handleKeyDown = (e: KeyboardEvent) => {
      const optionsListLength = optionsList.value.length;
      let newIndex = hoverIndex.value;
      switch (e.code) {
        case 'ArrowUp':
          if (hoverIndex.value === -1) {
            newIndex = 0;
          } else if (hoverIndex.value === 0) {
            newIndex = optionsListLength - 1;
          } else {
            newIndex--;
          }
          if (optionsList.value[newIndex]?.disabled) {
            newIndex--;
          }
          hoverIndex.value = newIndex;
          break;
        case 'ArrowDown':
          if (hoverIndex.value === -1 || hoverIndex.value === optionsListLength - 1) {
            newIndex = 0;
          } else {
            newIndex++;
          }
          if (optionsList.value[newIndex]?.disabled) {
            newIndex++;
          }
          hoverIndex.value = newIndex;
          break;
        case 'Enter':
          if (!innerPopupVisible.value) {
            setInnerPopupVisible(true, { e });
            break;
          }
          if (!props.multiple) {
            setInnerValue(optionsList.value[hoverIndex.value].value, {
              e,
              trigger: 'check',
            });
            setInnerPopupVisible(false, { e });
          } else {
            const optionValue = optionsList.value[hoverIndex.value].value;
            const newValue = getNewMultipleValue(innerValue.value, optionValue);
            setInnerValue(newValue.value, { e, trigger: newValue.isCheck ? 'check' : 'uncheck' });
          }
          break;
        case 'Escape':
          setInnerPopupVisible(false, { e });
          break;
      }
    };

    const SelectProvide = computed(() => ({
      slots,
      max: props.max,
      multiple: props.multiple,
      hoverIndex: hoverIndex.value,
      selectValue: innerValue.value,
      reserveKeyword: props.reserveKeyword,
      handleValueChange: setInnerValue,
      handlerInputChange: setInputValue,
      handlePopupVisibleChange: setInnerPopupVisible,
      handleCreate,
      size: props.size,
    }));

    provide(selectInjectKey, SelectProvide);

    const checkValueInvalid = () => {
      // 参数类型检测与修复
      if (!props.multiple && isArray(orgValue.value)) {
        orgValue.value = '';
      }
      if (props.multiple && !isArray(orgValue.value)) {
        orgValue.value = [];
      }
    };

    watch(
      orgValue,
      () => {
        checkValueInvalid();
      },
      {
        immediate: true,
      },
    );
    watch(
      () => props.multiple,
      () => {
        checkValueInvalid();
      },
    );

    return () => {
      const { overlayClassName, ...restPopupProps } = (props.popupProps || {}) as TdSelectProps['popupProps'];
      return (
        <div class={`${COMPONENT_NAME.value}__wrap`}>
          <SelectInput
            {...{
              autoWidth: props.autoWidth,
              readonly: props.readonly,
              borderless: props.borderless || !props.bordered,
              multiple: props.multiple,
              clearable: props.clearable,
              loading: props.loading,
              minCollapsedNum: props.minCollapsedNum,
            }}
            class={COMPONENT_NAME.value}
            value={displayText.value}
            disabled={disabled.value}
            popupVisible={innerPopupVisible.value}
            inputValue={innerInputValue.value}
            placeholder={placeholderText.value}
            allowInput={innerPopupVisible.value && isFilterable.value}
            collapsed-items={props.collapsedItems}
            inputProps={{
              size: props.size,
              ...(props.inputProps as TdSelectProps['inputProps']),
              onkeydown: handleKeyDown,
            }}
            tagInputProps={{
              size: props.size,
              ...(props.tagInputProps as TdSelectProps['tagInputProps']),
            }}
            onTagChange={(val, ctx) => {
              removeTag(ctx.index);
            }}
            tagProps={props.tagProps as TdSelectProps['tagProps']}
            popupProps={{
              overlayClassName: [`${COMPONENT_NAME.value}__dropdown`, ['narrow-scrollbar'], overlayClassName],
              ...restPopupProps,
            }}
            label={() => renderTNodeJSX('prefixIcon')}
            suffixIcon={() =>
              props.showArrow && (
                <FakeArrow
                  overlayClassName={`${COMPONENT_NAME.value}__right-icon`}
                  isActive={innerPopupVisible.value}
                />
              )
            }
            valueDisplay={() =>
              renderTNodeJSX('valueDisplay', {
                params: { value: valueDisplayParmas.value, onClose: (index: number) => removeTag(index) },
              })
            }
            onPopupVisibleChange={(val: boolean, context) => {
              setInnerPopupVisible(val, context);
            }}
            onInputChange={(value) => {
              setInputValue(value);
              debounce(() => {
                props.onSearch?.(`${value}`);
              }, 300);
            }}
            onClear={({ e }) => {
              setInnerValue(props.multiple ? [] : '', { e, trigger: 'clear' });
              props.onClear?.({ e });
            }}
            onEnter={(inputValue, { e }) => {
              props.onEnter?.({ inputValue: `${innerInputValue.value}`, e, value: innerValue.value });
              handleCreate();
            }}
            onBlur={(inputValue, { e }) => {
              props.onBlur?.({ e, value: innerValue.value });
            }}
            onFocus={(inputValue, { e }) => {
              props.onFocus?.({ e, value: innerValue.value });
            }}
            {...(props.selectInputProps as TdSelectProps['selectInputProps'])}
            v-slots={{
              panel: () => (
                <SelectPanel
                  {...picker(props, [
                    'size',
                    'multiple',
                    'empty',
                    'loading',
                    'loadingText',
                    'filterable',
                    'creatable',
                    'panelTopContent',
                    'panelBottomContent',
                    'filter',
                  ])}
                  options={options.value}
                  inputValue={innerInputValue.value}
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
