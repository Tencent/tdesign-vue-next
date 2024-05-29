import { withInstall } from '@td/adapter-vue';
import type { TdTooltipProps } from '@td/intel/tooltip/type';
import _Tooltip from './tooltip';

import './style';

export * from '@td/intel/tooltip/type';
export type TooltipProps = TdTooltipProps;

export const Tooltip = withInstall(_Tooltip);

export default Tooltip;
