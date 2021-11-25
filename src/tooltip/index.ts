import _Tooltip from './tooltip';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdTooltipProps } from './type';
import mapProps from '../utils/map-props';

import './style';

export * from './type';
export type TooltipProps = TdTooltipProps;

export const Tooltip: WithInstallType<typeof _Tooltip> = withInstall(mapProps([
  {
    name: 'visible',
    event: 'visible-change',
  },
])(_Tooltip));

export default Tooltip;
