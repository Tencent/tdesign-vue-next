import { withInstall } from '@td/adapter-vue';
import _Button from '@td/components-common/src/button/button';
import type { TdButtonProps } from './type';

import '@td/components-common/src/button/style';

export * from './type';
export type ButtonProps = TdButtonProps;

export const Button = withInstall(_Button);
export default Button;
