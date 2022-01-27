import _Tooltip from './tooltip';
import { withInstall } from '../utils/withInstall';
import { TdTooltipProps } from './type';
import mapProps from '../utils/map-props';

import './style';

export * from './type';
export type TooltipProps = TdTooltipProps;

export const Tooltip = withInstall(
  mapProps([
    {
      name: 'visible',
      event: 'visible-change',
    },
  ])(_Tooltip),
);

export default Tooltip;
