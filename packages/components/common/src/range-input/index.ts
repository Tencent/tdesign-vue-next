import _RangeInput from './range-input';
import _RangeInputPopup from './range-input-popup';
import { withInstall } from '@td/adapter-utils';
import { TdRangeInputProps, TdRangeInputPopupProps } from '@td/intel/range-input/type';

import './style';

export * from '@td/intel/range-input/type';

export type RangeInputProps = TdRangeInputProps;
export type RangeInputPopupProps = TdRangeInputPopupProps;

export const RangeInput = withInstall(_RangeInput);
export const RangeInputPopup = withInstall(_RangeInputPopup);

export default RangeInput;
