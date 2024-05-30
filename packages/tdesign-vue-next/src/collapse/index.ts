import { withInstall } from '@td/adapter-vue';
import _Collapse from '@td/components-common/src/collapse/collapse';
import _CollapsePanel from '@td/components-common/src/collapse/collapse-panel';
import type { TdCollapsePanelProps, TdCollapseProps } from './type';

import '@td/components-common/src/collapse/style';

export * from './type';

export type CollapseProps = TdCollapseProps;
export type CollapsePanelProps = TdCollapsePanelProps;

export const Collapse = withInstall(_Collapse);

export const CollapsePanel = withInstall(_CollapsePanel);

export default Collapse;
