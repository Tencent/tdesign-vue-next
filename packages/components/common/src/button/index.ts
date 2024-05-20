import { withInstall } from '@td/adapter-utils';
import type { TdButtonProps } from '@td/intel/button/type';
import _Button from './button';

import './style';

export * from '@td/intel/button/type';
export type ButtonProps = TdButtonProps;

export const Button = withInstall(_Button);
export default Button;
