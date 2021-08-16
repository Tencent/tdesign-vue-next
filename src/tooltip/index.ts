import _Tooltip from './tooltip.vue';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdTooltipProps } from './type';

export * from './type';
export type TooltipProps = TdTooltipProps;

export const Tooltip: WithInstallType<typeof _Tooltip> = withInstall(_Tooltip);
export default Tooltip;
