import { InjectionKey, ComputedRef, Slots } from 'vue';
import { TdSelectProps, TdOptionProps, SelectValue } from './type';

export const selectInjectKey: InjectionKey<
  ComputedRef<{
    slots: Slots;
    keys: TdSelectProps['keys'];
    selectValue: TdSelectProps['value'];
    multiple: TdSelectProps['multiple'];
    size: TdSelectProps['size'];
    onOptionClick: (value: TdSelectProps['value'], e: MouseEvent | KeyboardEvent) => void;
  }>
> = Symbol('selectProvide');

export const getMultipleContent = (value: SelectValue[], options: TdOptionProps[]) => {
  const res = [];
  for (const iterator of value) {
    const option = options.find((item) => item.value === iterator);
    if (option) {
      res.push(option.label);
    }
  }
  return res;
};

export const getSingleContent = (value: TdSelectProps['value'], options: TdOptionProps[]) => {
  return options.find((item) => item.value === value);
};
