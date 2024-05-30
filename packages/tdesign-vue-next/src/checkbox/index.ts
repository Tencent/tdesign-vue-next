import { withInstall } from '@td/adapter-vue';
import type { TdCheckboxGroupProps, TdCheckboxProps } from '@td/components/checkbox/type';
import _Checkbox from '@td/components-vue3/src/checkbox/checkbox';
import _Group from '@td/components-vue3/src/checkbox/group';

import '@td/components-vue3/src/checkbox/style';

export * from '@td/components/checkbox/type';
export type CheckboxProps = TdCheckboxProps;
export type CheckboxGroupProps = TdCheckboxGroupProps;

export const Checkbox = withInstall(_Checkbox);
export const CheckboxGroup = withInstall(_Group);

export default Checkbox;
