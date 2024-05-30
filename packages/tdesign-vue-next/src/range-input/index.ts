import { withInstall } from '@td/adapter-vue';
import type { TdRangeInputPopupProps, TdRangeInputProps } from '@td/components/range-input/type';
import _RangeInput from '@td/components-common/src/range-input/range-input';
import _RangeInputPopup from '@td/components-common/src/range-input/range-input-popup';

import '@td/components-common/src/range-input/style';

export * from '@td/components/range-input/type';

export type RangeInputProps = TdRangeInputProps;
export type RangeInputPopupProps = TdRangeInputPopupProps;

export const RangeInput = withInstall(_RangeInput);
export const RangeInputPopup = withInstall(_RangeInputPopup);

export default RangeInput;
