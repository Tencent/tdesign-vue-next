import withInstall from '../utils/withInstall';

import _Tooltip from './tooltip';
import { TdTooltipProps } from './type';

import './style';

export * from './type';
export type TooltipProps = TdTooltipProps;

export const Tooltip = withInstall(_Tooltip);

export default Tooltip;
