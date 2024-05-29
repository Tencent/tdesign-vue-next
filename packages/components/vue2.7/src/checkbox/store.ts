import type { CheckboxGroupValue, TdCheckboxProps } from '@td/components/checkbox/type';

export type CheckboxValue = TdCheckboxProps['value'];

export interface CheckboxStoreData {
  checked: CheckboxGroupValue;
}

interface ObserverMap {
  [key: string]: (val: ObserverListenerParams) => void;
}

export interface UpdateCheckedData {
  checked: CheckboxStoreData['checked'];
  oldChecked?: CheckboxStoreData['checked'];
  isCheckAll: boolean;
  indeterminate: boolean;
}

export interface UpdateCheckboxData {
  disabled: boolean;
  maxExceeded: boolean;
  checkboxName: string;
}

export interface ObserverListenerParams {
  type: 'checked' | 'checkbox';
  parentIsCheckAll?: boolean;
  parentChecked?: CheckboxStoreData['checked'];
  parentIsIndeterminate?: boolean;
  parentMaxExceeded?: boolean;
  parentDisabled?: boolean;
  checkboxName?: string;
}

class CheckboxStore {
  observerMap: ObserverMap = {};

  parentChecked: CheckboxGroupValue;

  parentExist: boolean;

  init() {
    this.parentExist = true;
  }

  updateChecked({
    checked,
isCheckAll,
oldChecked,
indeterminate,
  }: UpdateCheckedData) {
    this.parentChecked = checked;
    const changedChecked = oldChecked ? getChangedChecked(checked, oldChecked) : checked;
    const checkedParams: ObserverListenerParams = {
      parentChecked: checked,
      parentIsCheckAll: isCheckAll,
      parentIsIndeterminate: indeterminate,
      type: 'checked',
    };
    for (let i = 0, len = changedChecked.length; i < len; i++) {
      const value = String(changedChecked[i]);
      this.observerMap[value]?.(checkedParams);
    }
    this.observerMap.CHECK_ALL?.(checkedParams);
  }

  updateCheckbox({ disabled, maxExceeded, checkboxName }: UpdateCheckboxData) {
    const checkboxList = Object.keys(this.observerMap);
    checkboxList.forEach((checkbox) => {
      this.observerMap[checkbox]?.({
        type: 'checkbox',
        parentDisabled: disabled,
        parentMaxExceeded: maxExceeded,
        checkboxName,
      });
    });
  }

  subscribe(value: CheckboxValue, listener: (val: any) => void) {
    this.observerMap[String(value)] = listener;
  }

  unSubscribe(value: CheckboxValue) {
    delete this.observerMap[String(value)];
  }
}

export function getChangedChecked(
  checked: CheckboxStoreData['checked'] = [],
  oldChecked: CheckboxStoreData['checked'] = [],
): CheckboxStoreData['checked'] {
  // Map can recognize number and string number. '2' and 2.etc.
  const checkedMap: Map<CheckboxValue, boolean> = new Map();
  const oldCheckedMap: Map<CheckboxValue, boolean> = new Map();
  const changedValues: CheckboxStoreData['checked'] = [];
  for (let i = 0, len = checked.length; i < len; i++) {
    checkedMap.set(checked[i], true);
  }
  for (let i = 0, len = oldChecked.length; i < len; i++) {
    oldCheckedMap.set(oldChecked[i], true);
  }
  for (let i = 0, len = checked.length; i < len; i++) {
    if (!oldCheckedMap.get(checked[i])) {
      changedValues.push(checked[i]);
    }
  }
  for (let i = 0, len = oldChecked.length; i < len; i++) {
    if (!checkedMap.get(oldChecked[i])) {
      changedValues.push(oldChecked[i]);
    }
  }
  return changedValues;
}

const checkboxStoreInstanceMap: { [key: string]: CheckboxStore } = {};

export function createCheckboxStore(key?: string): { storeKey: string; checkboxStore: CheckboxStore } {
  const date = new Date();
  const storeKey = key
    || [
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getUTCMilliseconds(),
      Number((Math.random() * 10000).toFixed(2)),
    ].join('_');

  if (checkboxStoreInstanceMap[storeKey]) {
    return createCheckboxStore();
  }
  checkboxStoreInstanceMap[storeKey] = new CheckboxStore();

  return {
    storeKey,
    checkboxStore: checkboxStoreInstanceMap[storeKey],
  };
}

export function getCheckboxStore(key: string) {
  return checkboxStoreInstanceMap[key];
}
