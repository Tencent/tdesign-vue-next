import { withInstall } from '@td/adapter-utils';
import type { TdTooltipProps } from '@td/intel/components/tooltip/type';
import _Tooltip from './tooltip';

import './style';

export * from '@td/intel/components/tooltip/type';
export type TooltipProps = TdTooltipProps;

export const Tooltip = withInstall(_Tooltip);

export default Tooltip;
