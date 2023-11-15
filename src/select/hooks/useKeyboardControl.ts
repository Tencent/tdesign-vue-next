import { ref, watch, ComputedRef, Ref } from 'vue';
import { usePrefixClass } from '../../hooks/useConfig';

import { getNewMultipleValue } from '../helper';

import type { SelectOption, TdOptionProps, SelectValue } from '../type';
import type { ChangeHandler } from '../../hooks/useVModel';
import type { PopupVisibleChangeContext } from '../../popup';

export type useKeyboardControlType = {
  displayOptions: ComputedRef<SelectOption[]>;
  optionsList: ComputedRef<TdOptionProps[]>;
  innerPopupVisible: Ref<boolean>;
  setInnerPopupVisible: ChangeHandler<boolean, [context: PopupVisibleChangeContext]>;
  selectPanelRef: Ref<{ isVirtual: boolean; innerRef: HTMLDivElement }>;
  isFilterable: ComputedRef<boolean>;
  getSelectedOptions: (selectValue?: SelectValue[] | SelectValue) => TdOptionProps[];
  setInnerValue: Function;
  innerValue: Ref<SelectValue[]>;
  popupContentRef: ComputedRef<HTMLElement>;
  multiple: boolean;
  max: number;
};

// 统一处理键盘控制的hooks
export default function useKeyboardControl({
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
  multiple,
  max,
}: useKeyboardControlType) {
  const hoverIndex = ref(-1);
  const virtualFilteredOptions = ref([]); // 处理虚拟滚动下选项过滤通过键盘选择的问题
  const classPrefix = usePrefixClass();

  const handleKeyDown = (e: KeyboardEvent) => {
    const optionsListLength = displayOptions.value.length;
    let newIndex = hoverIndex.value;
    switch (e.code) {
      case 'ArrowUp':
        e.preventDefault();
        if (hoverIndex.value === -1) {
          newIndex = 0;
        } else if (hoverIndex.value === 0 || hoverIndex.value > displayOptions.value.length - 1) {
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
        if (hoverIndex.value === -1 || hoverIndex.value >= optionsListLength - 1) {
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
        const filteredOptions =
          selectPanelRef.value.isVirtual && isFilterable.value && virtualFilteredOptions.value.length
            ? virtualFilteredOptions.value
            : optionsList.value;

        if (!multiple) {
          const selectedOptions = getSelectedOptions(filteredOptions[hoverIndex.value].value);
          setInnerValue(filteredOptions[hoverIndex.value].value, {
            option: selectedOptions?.[0],
            selectedOptions: getSelectedOptions(filteredOptions[hoverIndex.value].value),
            trigger: 'check',
            e,
          });
          setInnerPopupVisible(false, { e });
        } else {
          if (hoverIndex.value === -1) return;
          const optionValue = filteredOptions[hoverIndex.value]?.value;

          if (!optionValue) return;
          const newValue = getNewMultipleValue(innerValue.value, optionValue);

          if (max > 0 && newValue.value.length > max) return; // 如果已选达到最大值 则不处理
          const selectedOptions = getSelectedOptions(newValue.value);
          setInnerValue(newValue.value, {
            option: selectedOptions.find((v) => v.value == optionValue),
            selectedOptions,
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

  watch(innerPopupVisible, (value) => {
    if (value) {
      // 展开重新恢复初始值
      hoverIndex.value = -1;
      virtualFilteredOptions.value = [];
    }
  });

  // 处理键盘操作滚动 超出视图时继续自动滚动到键盘所在元素
  watch(hoverIndex, (index) => {
    const optionHeight = selectPanelRef.value?.innerRef?.querySelector(
      `.${classPrefix.value}-select-option`,
    ).clientHeight;

    const scrollHeight = optionHeight * index;

    popupContentRef.value.scrollTo({
      top: scrollHeight,
      behavior: 'smooth',
    });
  });

  return {
    hoverIndex,
    handleKeyDown,
    virtualFilteredOptions,
  };
}
