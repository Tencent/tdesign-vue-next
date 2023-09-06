import _Button from './button';
import _ButtonGroup from './button-group';
import withInstall from '../utils/withInstall';
import { TdButtonProps } from './type';
import { TdButtonGroupProps } from './button-group-type';

import './style';

export * from './type';
export type ButtonProps = TdButtonProps;
export type ButtonGroupProps = TdButtonGroupProps;

export const Button = withInstall(_Button);
export const ButtonGroup = withInstall(_ButtonGroup);
export default Button;
