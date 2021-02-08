import Button from './button';
import setInstallFn from '../utils/setInstallFn';
import { TdButtonProps } from '@TdTypes/button/TdButtonProps';

setInstallFn('Button', Button);

export type ButtonProps = TdButtonProps;
export { Button };
export default Button;
