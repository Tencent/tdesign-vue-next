import _InputNumber from './input-number';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdInputNumberProps } from './type';

import './style';

export * from './type';
export type InputNumberProps = TdInputNumberProps;

export const InputNumber: WithInstallType<typeof _InputNumber> = withInstall(_InputNumber);
export default InputNumber;
