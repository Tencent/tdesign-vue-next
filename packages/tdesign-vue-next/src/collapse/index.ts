import { withInstall } from '@td/adapter-vue';
import type { TdCollapsePanelProps, TdCollapseProps } from '@td/components/collapse/type';
import _Collapse from '@td/components-common/src/collapse/collapse';
import _CollapsePanel from '@td/components-common/src/collapse/collapse-panel';

import '@td/components-common/src/collapse/style';

export * from '@td/components/collapse/type';

export type CollapseProps = TdCollapseProps;
export type CollapsePanelProps = TdCollapsePanelProps;

export const Collapse = withInstall(_Collapse);

export const CollapsePanel = withInstall(_CollapsePanel);

export default Collapse;
