import _Tooltip from './tooltip';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdTooltipProps } from './type';

import './style';

export * from './type';
export type TooltipProps = TdTooltipProps;

export const Tooltip: WithInstallType<typeof _Tooltip> = withInstall(_Tooltip);

export default Tooltip;
