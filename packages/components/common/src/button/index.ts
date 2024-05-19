import _Button from './button';
import withInstall from '../utils/withInstall';
import { TdButtonProps } from '@td/intel/button/type';

import './style';

export * from '@td/intel/button/type';
export type ButtonProps = TdButtonProps;

export const Button = withInstall(_Button);
export default Button;
