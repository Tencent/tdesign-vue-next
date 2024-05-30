import { withInstall } from '@td/adapter-vue';
import type { TdInputNumberProps } from '@td/components/input-number/type';
import _InputNumber from '@td/components-common/src/input-number/input-number';

import '@td/components-common/src/input-number/style';

export * from '@td/components/input-number/type';
export type InputNumberProps = TdInputNumberProps;

export const InputNumber = withInstall(_InputNumber);
export default InputNumber;
