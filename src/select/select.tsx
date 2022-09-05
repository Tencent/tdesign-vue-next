import { defineComponent, provide, computed, toRefs, watch, ref, nextTick } from 'vue';
import picker from 'lodash/pick';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';

import { intersection } from 'lodash';
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
import { useSelectOptions } from './hooks/useSelectOptions';

export default defineComponent({
  name: 'TSelect',
  props: { ...props },
  setup(props: TdSelectProps, { slots, expose, ...res }) {
    const classPrefix = usePrefixClass();
    const disabled = useFormDisabled();
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('select');
    const { globalConfig, t } = useConfig('select');
    const { popupVisible, inputValue, modelValue, value } = toRefs(props);
    const [orgValue, setOrgValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const selectPanelRef = ref(null);
    const selectInputRef = ref(null);
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
      if (newVal === orgValue.value) return;
      setOrgValue(newVal, { selectedOptions: getSelectedOptions(newVal), trigger: e.trigger, e: e.e });
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
        ((!props.multiple && innerPopupVisible.value && getSingleContent(innerValue.value, optionsList.value)) ||
          props.placeholder) ??
        t(globalConfig.value.placeholder),
    );

    // selectInput 展示值
    const displayText = computed(() =>
      props.multiple
        ? getMultipleContent(innerValue.value as SelectValue[], optionsList.value)
        : getSingleContent(innerValue.value, optionsList.value),
    );

    // valueDisplayParams参数
    const valueDisplayParams = computed(() => {
      return props.multiple
        ? (innerValue.value as SelectValue[]).map((value) => ({
            value,
            label: optionsMap.value.get(value)?.label,
          }))
        : innerValue.value;
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

    // 键盘操作逻辑
    const hoverIndex = ref(-1);
    const handleKeyDown = (e: KeyboardEvent) => {
      const optionsListLength = optionsList.value.length;
      let newIndex = hoverIndex.value;
      switch (e.code) {
        case 'ArrowUp':
          e.preventDefault();
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
          e.preventDefault();
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
          if (hoverIndex.value === -1) break;
          if (!innerPopupVisible.value) {
            setInnerPopupVisible(true, { e });
            break;
          }
          if (!props.multiple) {
            setInnerValue(optionsList.value[hoverIndex.value].value, {
              selectedOptions: getSelectedOptions(optionsList.value[hoverIndex.value].value),
              trigger: 'check',
              e,
            });
            setInnerPopupVisible(false, { e });
          } else {
            if (hoverIndex.value === -1) return;
            const optionValue = optionsList.value[hoverIndex.value]?.value;
            if (!optionValue) return;
            const newValue = getNewMultipleValue(innerValue.value, optionValue);
            setInnerValue(newValue.value, {
              selectedOptions: getSelectedOptions(newValue.value),
              trigger: newValue.isCheck ? 'check' : 'uncheck',
              e,
            });
          }
          break;
        case 'Escape':
          setInnerPopupVisible(false, { e });
          break;
      }
    };

    const popupContentRef = computed(() => selectInputRef.value?.selectInputRef.getOverlay() as HTMLElement);

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
        if (Array.isArray(selectValue)) return selectValue.includes(option.value);
        return selectValue === option.value;
      });
    };

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

    const SelectProvide = computed(() => ({
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
    const handleSearch = debounce((value: string) => {
      props.onSearch?.(`${value}`);
    }, 300);

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
    watch(innerPopupVisible, (value) => {
      if (value) {
        hoverIndex.value = -1;
      }
    });

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
              borderless: props.borderless || !props.bordered,
              multiple: props.multiple,
              clearable: props.clearable,
              loading: props.loading,
              status: props.status,
              tips: props.tips,
              minCollapsedNum: props.minCollapsedNum,
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
                params: { value: valueDisplayParams.value, onClose: (index: number) => removeTag(index) },
              })
            }
            onPopupVisibleChange={(val: boolean, context) => {
              setInnerPopupVisible(val, context);
            }}
            onInputChange={(value) => {
              if (!innerPopupVisible.value) return;
              setInputValue(value);
              handleSearch(`${value}`);
            }}
            onClear={({ e }) => {
              setInnerValue(props.multiple ? [] : '', {
                selectedOptions: getSelectedOptions(props.multiple ? [] : ''),
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
