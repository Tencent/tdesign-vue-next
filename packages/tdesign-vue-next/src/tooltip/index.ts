import { withInstall } from '@td/adapter-vue';
import type { TdTooltipProps } from './type';
import _Tooltip from '@td/components-common/src/tooltip/tooltip';

import '@td/components-common/src/tooltip/style';

export * from './type';
export type TooltipProps = TdTooltipProps;

export const Tooltip = withInstall(_Tooltip);

export default Tooltip;
