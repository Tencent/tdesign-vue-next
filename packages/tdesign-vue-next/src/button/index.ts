import { withInstall } from '@td/adapter-vue';
import type { TdButtonProps } from '@td/components/button/type';
import _Button from './button';

import './style';

export * from '@td/components/button/type';
export type ButtonProps = TdButtonProps;

export const Button = withInstall(_Button);
export default Button;
