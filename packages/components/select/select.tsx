import { defineComponent, provide, computed, toRefs, watch, ref, nextTick, PropType } from 'vue';
import { get, isArray, debounce, cloneDeep, isFunction, intersection, pick as picker } from 'lodash-es';

import FakeArrow from '../common-components/fake-arrow';
import SelectInput from '../select-input';
import SelectPanel from './select-panel';
import Tag from '../tag';
import props from './props';
// hooks
import {
  useVModel,
  useConfig,
  useDisabled,
  useReadonly,
  useTNodeJSX,
  usePrefixClass,
  useDefaultValue,
} from '@tdesign/hooks';

import { getSingleContent, getMultipleContent } from './utils';
import { selectInjectKey } from './consts';
import { useSelectOptions, useKeyboardControl } from './hooks';
import type { PopupProps, PopupVisibleChangeContext } from '../popup';
import type { SelectInputChangeContext, SelectInputValueChangeContext } from '../select-input';
import type { TdSelectProps, SelectValue, TdOptionProps } from './type';
import { SelectInputValueDisplayOptions } from '../select-input/hooks/useSingle';
import { TagInputTriggerSource } from '../tag-input';

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
    const isDisabled = useDisabled();
    const isReadonly = useReadonly();
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
    const { optionsMap, optionsList, optionsCache, displayOptions, filterMethods } = useSelectOptions(
      props,
      keys,
      innerInputValue,
    );

    // 内部数据,格式化过的
    const innerValue = computed(() => {
      if (orgValue.value === undefined) {
        return props.multiple ? [] : undefined;
      }
      if (props.valueType === 'object') {
        return !props.multiple
          ? // @ts-ignore
            // TODO optimize SelectValue
            orgValue.value[keys.value.value]
          : // @ts-ignore
            // TODO optimize SelectValue
            (orgValue.value as SelectValue[]).map((option) => option[keys.value.value]);
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
            [value]: get(option, 'value'),
            [label]: get(option, 'label'),
          };
        };
        newVal = props.multiple ? (newVal as SelectValue[]).map((val) => getOption(val)) : getOption(newVal);
      }
      if (newVal === orgValue.value) return;

      // 多选场景下 在选中值时，且不保留reserveKeyword 的情况下 ，需要清空输入（筛选）值
      if (props.multiple && !props.reserveKeyword && context.trigger == 'check') setInputValue('');

      setOrgValue(newVal, {
        selectedOptions: getSelectedOptions(newVal),
        ...context,
      });
      if (props.multiple && context.trigger === 'uncheck' && context.option) {
        props.onRemove?.({
          value: get(context.option, keys.value.value),
          data: context.option,
          e: context.e,
        });
      }
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
      if (!props.multiple) {
        return {
          ...optionsMap.value.get(innerValue.value),
          value: innerValue.value,
          label: displayText.value,
        };
      }

      const val = isArray(innerValue.value) ? innerValue.value.map((value) => optionsMap.value.get(value)) : [];
      const params = {
        value: val,
        onClose: props.multiple ? (index: number) => removeTag(index) : () => {},
      };

      if (props.minCollapsedNum && isArray(innerValue.value)) {
        return {
          ...params,
          displayValue: Array.isArray(val) ? val.slice(0, props.minCollapsedNum) : [],
        };
      }
      return params;
    });

    const isFilterable = computed(() => {
      return Boolean(props.filterable || globalConfig.value.filterable || isFunction(props.filter));
    });

    const isRemoteSearch = computed(() => {
      return Boolean((props.filterable || globalConfig.value.filterable) && isFunction(props.onSearch));
    });

    // 移除tag
    const removeTag = (index: number, context?: SelectInputChangeContext) => {
      const { e, trigger = 'tag-remove' } =
        (context as SelectInputChangeContext & {
          trigger: Exclude<TagInputTriggerSource, 'enter'>;
        }) || {};

      e && e.stopPropagation();

      const selectValue = cloneDeep(innerValue.value) as SelectValue[];
      const value = selectValue[index];

      selectValue.splice(index, 1);

      if (trigger === 'backspace') {
        // 如果最后一个为disabled，则应删除前一项（非disabled的）
        let closest = -1;
        let len = index;
        const currentSelected = getCurrentSelectedOptions();
        while (len >= 0) {
          if (!currentSelected[len]?.disabled) {
            closest = len;
            break;
          }
          len -= 1;
        }
        // 只剩下disabled的情况，不做任何操作
        if (closest < 0) return;

        // 前面不是disabled的option
        const values = currentSelected[closest];

        const currentSelectedOptions = currentSelected.filter((item) => item.value !== values.value);

        setInnerValue(
          currentSelectedOptions.map((item) => item.value),
          { selectedOptions: currentSelectedOptions, trigger, e },
        );

        props.onRemove?.({
          value: values.value as string | number,
          data: values,
          e,
        });

        return;
      }

      if (trigger !== 'clear') {
        setInnerValue(selectValue, { selectedOptions: getSelectedOptions(selectValue), trigger, e });
      }

      props.onRemove?.({
        value: value as string | number,
        data: optionsMap.value.get(value),
        e,
      });
    };

    const handleCreate = () => {
      if (!innerInputValue.value) return;
      props.onCreate?.(innerInputValue.value);
      // only clean input value when reopen popup
      if (!innerPopupVisible.value) setInputValue('');
    };

    const popupContentRef = computed(() => selectInputRef.value?.popupRef.getOverlay() as HTMLElement);

    /**
     * 可选选项的列表
     * 排除已禁用和全选的选项，考虑过滤情况
     */
    const optionalList = computed(() =>
      optionsList.value.filter((item) => {
        return (
          !item.disabled &&
          // @ts-ignore types only declare checkAll not declare check-all
          !(item['check-all'] || item['check-all'] === '') &&
          !item.checkAll &&
          filterMethods(item)
        );
      }),
    );

    const getSelectedOptions = (selectValue: SelectValue[] | SelectValue = innerValue.value) => {
      return optionsList.value.filter((option) => {
        if (option.checkAll) return;
        if (isArray(selectValue)) return selectValue.includes(option.value);
        return selectValue === option.value;
      });
    };

    //  获取当前选中的选项，和 getSelectedOptions 的区别是 这个会保持选择的先后顺序
    const getCurrentSelectedOptions = (selectValue: SelectValue[] | SelectValue = innerValue.value) => {
      const options: TdOptionProps[] = [];
      const values = isArray(selectValue) ? selectValue : [selectValue];

      values.forEach((value) => {
        const option = optionsMap.value.get(value);
        if (option) options.push(option);
      });

      return options;
    };

    /*
     * 全选逻辑：
     * 根据 checked 的值计算最终选中的值：
     *    - 如果 checked 为 true，则选中所有非 disabled 选项，并保留已选中的 disabled 选项。
     *    - 如果 checked 为 false，则只保留已选中的 disabled 选项。
     *    - 过滤条件下，如果 checked 为 true，则选中所有非 disabled 选项，并保留已选中的选项。
     *    - 过滤条件下，如果 checked 为 false，则只保留已选中的 disabled 选项。
     */
    const onCheckAllChange = (checked: boolean) => {
      if (!props.multiple) return;
      const { value } = keys.value;
      // disabled状态的选项，不参与全选的计算，始终保留
      const lockedValues = innerValue.value.filter((value: string | number | boolean) => {
        return optionsList.value.find((item) => item.value === value && item.disabled);
      });

      const activeValues = optionalList.value.map((option) => option.value);
      const formattedOrgValue =
        props.valueType === 'object'
          ? (orgValue.value as Array<SelectValue>).map((v) => get(v, value))
          : orgValue.value;

      const values = checked
        ? [...new Set([...(formattedOrgValue as Array<SelectValue>), ...activeValues, ...lockedValues])]
        : [...lockedValues];
      setInnerValue(values, { selectedOptions: getSelectedOptions(values), trigger: checked ? 'check' : 'clear' });
    };

    // 全选
    const isCheckAll = computed<boolean>(() => {
      if (intersectionLen.value === 0) return false;
      return intersectionLen.value === optionalList.value.length;
    });

    const { hoverIndex, virtualFilteredOptions, handleKeyDown, filteredOptions } = useKeyboardControl({
      displayOptions,
      optionsList,
      innerPopupVisible,
      setInnerPopupVisible,
      selectPanelRef,
      isFilterable,
      isRemoteSearch,
      getSelectedOptions,
      setInnerValue,
      onCheckAllChange,
      isCheckAll,
      innerValue,
      popupContentRef,
      multiple: props.multiple,
      max: props.max,
    });

    // 已选的长度
    const intersectionLen = computed<number>(() => {
      const values = optionalList.value.map((item) => item.value);
      const n = intersection(innerValue.value, values);
      return n.length;
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
      emitBlur: handleOptionEmitBlur,
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
        !innerPopupVisible.value && setInnerPopupVisible(true, { e: context.e as KeyboardEvent });
      }
      setInputValue(value);
      handleSearch(`${value}`, { e: context.e as KeyboardEvent });
      nextTick(() => {
        virtualFilteredOptions.value = selectPanelRef.value?.visibleData;
        filteredOptions.value = selectPanelRef.value?.displayOptions;
      });
    };

    const handleOptionEmitBlur = (e: MouseEvent | KeyboardEvent) => {
      props.onBlur?.({ e, value: innerValue.value });
    };

    const handlerPopupVisibleChange = (visible: boolean, context: PopupVisibleChangeContext) => {
      setInnerPopupVisible(visible, context);
      // 在通过点击选择器打开弹窗时 清空此前的输入内容 避免在关闭时就清空引起的闪烁问题
      if (visible && context.trigger === 'trigger-element-click') setInputValue('');
    };

    const handlerPopupScrollToBottom: PopupProps['onScrollToBottom'] = async (context) => {
      const { popupProps } = props;
      if (props.loading) {
        return;
      }
      // @ts-ignore types 中只有 onScrollToBottom，但 Vue 会自动转换 on-scroll-to-bottom 并支持，故此处都进行调用
      popupProps?.['on-scroll-to-bottom']?.(context);
      popupProps?.onScrollToBottom?.(context);
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

    const renderValueDisplay = (_h: any, { value }: { value: any }) => {
      const renderTag = () => {
        if (!props.multiple) {
          return undefined;
        }
        const currentSelectedOptions = getCurrentSelectedOptions(innerValue.value);
        return value
          .slice(0, props.minCollapsedNum ? props.minCollapsedNum : innerValue.value.length)
          .map((v: string, key: number) => {
            const filterOption = optionsMap.value.get(v);
            return (
              <Tag
                key={key}
                closable={!filterOption?.disabled && !props.disabled && !props.readonly}
                size={props.size}
                {...props.tagProps}
                onClose={({ e }: { e: MouseEvent }) => {
                  e.stopPropagation();
                  const index = currentSelectedOptions.findIndex((item) => item.value === filterOption.value);
                  props.tagProps?.onClose?.({ e });
                  removeTag(index);
                }}
              >
                {v}
              </Tag>
            );
          });
      };

      return (
        renderTNodeJSX('valueDisplay', {
          params: valueDisplayParams.value,
        }) || renderTag()
      );
    };

    provide('updateScrollTop', updateScrollTop);
    return () => {
      const { overlayClassName, ...restPopupProps } = (props.popupProps || {}) as TdSelectProps['popupProps'];
      return (
        <div class={`${COMPONENT_NAME.value}__wrap`}>
          <SelectInput
            {...{
              autoWidth: props.autoWidth,
              readonly: isReadonly.value,
              borderless: props.borderless,
              multiple: props.multiple,
              clearable: props.clearable,
              loading: props.loading,
              status: props.status,
              tips: renderTNodeJSX('tips'),
              minCollapsedNum: props.minCollapsedNum,
              autofocus: props.autofocus,
              suffix: props.suffix,
              valueDisplayOptions: props.valueDisplayOptions,
            }}
            ref={selectInputRef}
            class={COMPONENT_NAME.value}
            value={displayText.value}
            disabled={isDisabled.value}
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
              removeTag(ctx.index, ctx);
            }}
            tagProps={{ ...(props.tagProps as TdSelectProps['tagProps']) }}
            popupProps={{
              overlayClassName: [`${COMPONENT_NAME.value}__dropdown`, overlayClassName],
              ...restPopupProps,
              onScrollToBottom: handlerPopupScrollToBottom,
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
            valueDisplay={renderValueDisplay}
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
              // onEnter和handleKeyDown的Enter事件同时触发，需要通过setTimeout设置先后
              setTimeout(() => {
                props.onEnter?.({ inputValue: `${innerInputValue.value}`, e, value: innerValue.value });
                handleCreate();
              }, 0);
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
