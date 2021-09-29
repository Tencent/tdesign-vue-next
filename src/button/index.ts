import _Button from './button';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdButtonProps } from './type';

import './style';

export * from './type';
export type ButtonProps = TdButtonProps;

export const Button: WithInstallType<typeof _Button> = withInstall(_Button);
export default Button;
