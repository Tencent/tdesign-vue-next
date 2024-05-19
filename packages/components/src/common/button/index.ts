import _Button from './button';
import { withInstall } from '@td/adapter-utils';
import type { TdButtonProps } from '@td/intel/components/button/type';

import './style';

export * from '@td/intel/components/button/type';
export type ButtonProps = TdButtonProps;

export const Button = withInstall(_Button);
export default Button;
