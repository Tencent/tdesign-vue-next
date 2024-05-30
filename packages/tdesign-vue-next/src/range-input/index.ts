import { withInstall } from '@td/adapter-vue';
import _RangeInput from '@td/components-common/src/range-input/range-input';
import _RangeInputPopup from '@td/components-common/src/range-input/range-input-popup';
import type { TdRangeInputPopupProps, TdRangeInputProps } from './type';

import '@td/components-common/src/range-input/style';

export * from './type';

export type RangeInputProps = TdRangeInputProps;
export type RangeInputPopupProps = TdRangeInputPopupProps;

export const RangeInput = withInstall(_RangeInput);
export const RangeInputPopup = withInstall(_RangeInputPopup);

export default RangeInput;
