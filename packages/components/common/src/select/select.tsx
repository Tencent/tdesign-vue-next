import { defineComponent, provide, computed, toRefs, watch, ref, nextTick, PropType } from 'vue';
import picker from 'lodash/pick';
import { isArray } from 'lodash-es';
import { isFunction } from 'lodash-es';
import { debounce } from 'lodash-es';
import { cloneDeep } from 'lodash-es';
import { get } from 'lodash-es';
import { intersection } from 'lodash-es';
import FakeArrow from '../common-components/fake-arrow';
import SelectInput from '../select-input';
import SelectPanel from './select-panel';
import props from '@td/intel/select/props';
// hooks
import { useFormDisabled } from '../form/hooks';
import { useDefaultValue } from '@td/adapter-hooks';
import { useVModel } from '@td/adapter-hooks';
import { useTNodeJSX } from '@td/adapter-hooks';
import { useConfig, usePrefixClass } from '@td/adapter-hooks';
import { selectInjectKey, getSingleContent, getMultipleContent } from './helper';
import { useSelectOptions } from './hooks/useSelectOptions';
import useKeyboardControl from './hooks/useKeyboardControl';
import type { PopupVisibleChangeContext } from '../popup';
import type { SelectInputValueChangeContext } from '../select-input';
import type { TdSelectProps, SelectValue } from '@td/intel/select/type';
import { SelectInputValueDisplayOptions } from '../select-input/useSingle';

export default defineComponent({
  name: 'TSelect',
  props: {
    ...props,
    /**
     * 非公开 API，请勿使用（后续即将删除）
     */
    valueDisplayOptions: {
      type: Object as PropType<SelectInputValueDisplayOptions>,
    },
  },
  setup(props: TdSelectProps & { valueDisplayOptions: SelectInputValueDisplayOptions }, { slots }) {
    const classPrefix = usePrefixClass();
    const disabled = useFormDisabled();
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('select');
    const { globalConfig, t } = useConfig('select');
    const { popupVisible, inputValue, modelValue, value } = toRefs(props);
    const [innerInputValue, setInputValue] = useDefaultValue(
      inputValue,
      props.defaultInputValue,
      props.onInputChange,
      'inputValue',
    );
    const [orgValue, setOrgValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const selectPanelRef = ref(null);
    const selectInputRef = ref(null);
    const keys = computed(() => ({
      label: props.keys?.label || 'label',
      value: props.keys?.value || 'value',
      disabled: props.keys?.disabled || 'disabled',
    }));
    const { optionsMap, optionsList, optionsCache, displayOptions } = useSelectOptions(props, keys, innerInputValue);

    // 内部数据,格式化过的
    const innerValue = computed(() => {
      if (orgValue.value === undefined) {
        return props.multiple ? [] : undefined;
      }
      if (props.valueType === 'object') {
        return !props.multiple
          ? orgValue.value[keys.value.value]
          : (orgValue.value as SelectValue[]).map((option) => option[keys.value.value]);
      }
      return orgValue.value;
    });

    const setInnerValue: TdSelectProps['onChange'] = (newVal: SelectValue | SelectValue[], context) => {
      if (props.valueType === 'object') {
        const { value, label } = keys.value;
        const getOption = (val: SelectValue) => {
          if (val === undefined) {
            return undefined;
          }
          const option = optionsMap.value.get(val);
          return {
            [value]: get(option, value),
            [label]: get(option, label),
          };
        };
        newVal = props.multiple ? (newVal as SelectValue[]).map((val) => getOption(val)) : getOption(newVal);
      }
      if (newVal === orgValue.value) return;
      setOrgValue(newVal, {
        selectedOptions: getSelectedOptions(newVal),
        ...context,
      });
    };

    const [innerPopupVisible, setInnerPopupVisible] = useDefaultValue(
      popupVisible,
      false,
      (visible: boolean, context: PopupVisibleChangeContext) => {
        props.onPopupVisibleChange?.(visible, context);
      },
      'popupVisible',
    );

    const placeholderText = computed(
      () =>
        ((!props.multiple && innerPopupVisible.value && getSingleContent(innerValue.value, optionsMap)) ||
          props.placeholder) ??
        t(globalConfig.value.placeholder),
    );

    // selectInput 展示值
    const displayText = computed(() =>
      props.multiple
        ? getMultipleContent(innerValue.value as SelectValue[], optionsMap)
        : getSingleContent(innerValue.value, optionsMap),
    );

    // valueDisplayParams参数
    const valueDisplayParams = computed(() => {
      const val =
        props.multiple && isArray(innerValue.value)
          ? (innerValue.value as SelectValue[]).map((value) => ({
              value,
              label: optionsMap.value.get(value)?.label,
            }))
          : innerValue.value;

      const params = {
        value: val,
        onClose: props.multiple ? (index: number) => removeTag(index) : () => {},
      };

      if (props.minCollapsedNum && props.multiple) {
        return {
          ...params,
          displayValue: val?.slice?.(0, props.minCollapsedNum),
        };
      }
      return params;
    });

    const isFilterable = computed(() => {
      return Boolean(props.filterable || globalConfig.value.filterable || isFunction(props.filter));
    });

    // 移除tag
    const removeTag = (index: number, e?: MouseEvent) => {
      e && e.stopPropagation();
      const selectValue = cloneDeep(innerValue.value) as SelectValue[];
      const value = selectValue[index];
      selectValue.splice(index, 1);
      setInnerValue(selectValue, { selectedOptions: getSelectedOptions(selectValue), trigger: 'tag-remove', e });
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

    const popupContentRef = computed(() => selectInputRef.value?.popupRef.getOverlay() as HTMLElement);

    /**
     * 可选选项的列表
     * 排除已禁用和全选的选项
     */
    const optionalList = computed(() =>
      optionsList.value.filter((item) => {
        return !item.disabled && !item['check-all'] && !item.checkAll;
      }),
    );

    const getSelectedOptions = (selectValue: SelectValue[] | SelectValue = innerValue.value) => {
      return optionsList.value.filter((option) => {
        if (option.checkAll) return;
        if (isArray(selectValue)) return selectValue.includes(option.value);
        return selectValue === option.value;
      });
    };

    const { hoverIndex, virtualFilteredOptions, handleKeyDown, filteredOptions } = useKeyboardControl({
      displayOptions,
      optionsList,
      innerPopupVisible,
      setInnerPopupVisible,
      selectPanelRef,
      isFilterable,
      getSelectedOptions,
      setInnerValue,
      innerValue,
      popupContentRef,
      multiple: props.multiple,
      max: props.max,
    });

    const onCheckAllChange = (checked: boolean) => {
      if (!props.multiple) return;
      const value = checked ? optionalList.value.map((option) => option.value) : [];
      setInnerValue(value, { selectedOptions: getSelectedOptions(value), trigger: checked ? 'check' : 'clear' });
    };

    // 已选的长度
    const intersectionLen = computed<number>(() => {
      const values = optionalList.value.map((item) => item.value);
      const n = intersection(innerValue.value, values);
      return n.length;
    });

    // 全选
    const isCheckAll = computed<boolean>(() => {
      return intersectionLen.value === optionalList.value.length;
    });

    // 半选
    const indeterminate = computed<boolean>(() => !isCheckAll.value && intersectionLen.value !== 0);

    const SelectProvider = computed(() => ({
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
      popupContentRef,
      indeterminate: indeterminate.value,
      isCheckAll: isCheckAll.value,
      onCheckAllChange,
      getSelectedOptions,
      displayOptions: displayOptions.value,
    }));

    provide(selectInjectKey, SelectProvider);

    const checkValueInvalid = () => {
      // 参数类型检测与修复
      if (!props.multiple && isArray(orgValue.value)) {
        setOrgValue(undefined, { selectedOptions: [], trigger: 'default' });
      }
      if (props.multiple && !isArray(orgValue.value)) {
        setOrgValue([], { selectedOptions: [], trigger: 'default' });
      }
    };

    const handleSearch = debounce((value: string, { e }: { e: KeyboardEvent }) => {
      props.onSearch?.(`${value}`, { e });
    }, 300);

    const handlerInputChange = (value: string, context: SelectInputValueChangeContext) => {
      if (value) {
        setInnerPopupVisible(true, { e: context.e as KeyboardEvent });
      }
      setInputValue(value);
      handleSearch(`${value}`, { e: context.e as KeyboardEvent });
      nextTick(() => {
        virtualFilteredOptions.value = selectPanelRef.value?.visibleData;
        filteredOptions.value = selectPanelRef.value?.displayOptions;
      });
    };

    const handlerPopupVisibleChange = (visible: boolean, context: PopupVisibleChangeContext) => {
      setInnerPopupVisible(visible, context);
      // 在通过点击选择器打开弹窗时 清空此前的输入内容 避免在关闭时就清空引起的闪烁问题
      if (visible && context.trigger === 'trigger-element-click') setInputValue('');
    };

    const addCache = (val: SelectValue) => {
      if (props.multiple) {
        const newCache = [];
        for (const item of (val as SelectValue[]) || []) {
          const option = optionsMap.value.get(item);
          if (option) {
            newCache.push(option);
          }
        }
        optionsCache.value = Array.from(new Set([...newCache, ...optionsCache.value]));
      } else {
        const option = optionsMap.value.get(val);
        if (option) {
          optionsCache.value = Array.from(new Set([option, ...optionsCache.value]));
        }
      }
    };

    watch(
      orgValue,
      (val) => {
        checkValueInvalid();
        nextTick(() => {
          addCache(val);
        });
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

    // 列表展开时定位置选中项
    const updateScrollTop = (content: HTMLDivElement) => {
      if (!selectPanelRef.value) {
        return;
      }
      const firstSelectedNode: HTMLDivElement = (selectPanelRef.value?.innerRef as HTMLDivElement)?.querySelector(
        `.${classPrefix.value}-is-selected`,
      );
      // 此处需要等待渲染后进行计算
      nextTick(() => {
        if (firstSelectedNode && content) {
          const { paddingBottom } = getComputedStyle(firstSelectedNode);
          const { marginBottom } = getComputedStyle(content);
          const elementBottomHeight = parseInt(paddingBottom, 10) + parseInt(marginBottom, 10);
          // 小于0时不需要特殊处理，会被设为0
          const updateValue =
            firstSelectedNode.offsetTop -
            content.offsetTop -
            (content.clientHeight - firstSelectedNode.clientHeight) +
            elementBottomHeight;
          // eslint-disable-next-line no-param-reassign
          content.scrollTop = updateValue;
        }
      });
    };
    provide('updateScrollTop', updateScrollTop);
    return () => {
      const { overlayClassName, ...restPopupProps } = (props.popupProps || {}) as TdSelectProps['popupProps'];
      return (
        <div class={`${COMPONENT_NAME.value}__wrap`}>
          <SelectInput
            {...{
              autoWidth: props.autoWidth,
              readonly: props.readonly,
              borderless: props.borderless,
              multiple: props.multiple,
              clearable: props.clearable,
              loading: props.loading,
              status: props.status,
              tips: props.tips,
              minCollapsedNum: props.minCollapsedNum,
              autofocus: props.autofocus,
              suffix: props.suffix,
              valueDisplayOptions: props.valueDisplayOptions,
            }}
            ref={selectInputRef}
            class={COMPONENT_NAME.value}
            value={displayText.value}
            disabled={disabled.value}
            popupVisible={innerPopupVisible.value}
            inputValue={innerPopupVisible.value ? innerInputValue.value : ''}
            placeholder={`${placeholderText.value}`}
            allowInput={isFilterable.value}
            collapsed-items={props.collapsedItems}
            inputProps={{
              size: props.size,
              autofocus: props.autofocus,
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
            tagProps={{ ...(props.tagProps as TdSelectProps['tagProps']) }}
            popupProps={{
              overlayClassName: [`${COMPONENT_NAME.value}__dropdown`, overlayClassName],
              ...restPopupProps,
            }}
            label={props.label}
            prefixIcon={props.prefixIcon}
            suffix={props.suffix}
            suffixIcon={() => {
              if (props.suffixIcon || slots.suffixIcon) {
                return renderTNodeJSX('suffixIcon');
              }

              return (
                props.showArrow && (
                  <FakeArrow
                    overlayClassName={`${COMPONENT_NAME.value}__right-icon`}
                    isActive={innerPopupVisible.value}
                  />
                )
              );
            }}
            valueDisplay={() =>
              renderTNodeJSX('valueDisplay', {
                params: valueDisplayParams.value,
              })
            }
            onPopupVisibleChange={handlerPopupVisibleChange}
            onInputChange={handlerInputChange}
            onClear={({ e }) => {
              setInnerValue(props.multiple ? [] : undefined, {
                option: null,
                selectedOptions: getSelectedOptions(props.multiple ? [] : undefined),
                trigger: 'clear',
                e,
              });
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
              label: slots.label,
              prefixIcon: slots.prefixIcon,
              suffix: slots.suffix,
              panel: () => (
                <SelectPanel
                  ref={selectPanelRef}
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
                    'scroll',
                  ])}
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
