import _Button from './button';
import withInstall from '../utils/withInstall';
import { TdButtonProps } from './type';

import './style';

export * from './type';
export type ButtonProps = TdButtonProps;

export const Button = withInstall(_Button);
export default Button;
