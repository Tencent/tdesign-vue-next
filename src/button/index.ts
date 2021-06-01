import _Button from './button';
import { TdButtonProps } from '@TdTypes/button/TdButtonProps';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Button: WithInstallType<typeof _Button> = withInstall(_Button);

export type ButtonProps = TdButtonProps;
export { Button };
export default Button;
