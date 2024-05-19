import { InjectionKey } from 'vue';
import { DropdownOption } from '@td/intel/dropdown/type';

export const injectKey: InjectionKey<{
  handleMenuClick: (data: DropdownOption, context: { e: MouseEvent }) => void;
  maxHeight: number;
  maxColumnWidth: number | string;
  minColumnWidth: number | string;
}> = Symbol('dropdownProvider');
