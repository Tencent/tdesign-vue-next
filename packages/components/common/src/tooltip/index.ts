import _Tooltip from './tooltip';
import { withInstall } from '@td/adapter-utils';
import { TdTooltipProps } from '@td/intel/tooltip/type';

import './style';

export * from '@td/intel/tooltip/type';
export type TooltipProps = TdTooltipProps;

export const Tooltip = withInstall(_Tooltip);

export default Tooltip;
