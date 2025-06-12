import _Tooltip from './tooltip';
import { withInstall } from '@tdesign/shared-utils';
import { TdTooltipProps } from './type';

import './style';

export * from './type';
export type TooltipProps = TdTooltipProps;

export const Tooltip = withInstall(_Tooltip);

export default Tooltip;
