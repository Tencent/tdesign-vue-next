import { withInstall } from '@td/adapter-vue';
import type { TdStickyItemProps, TdStickyToolProps } from './type';
import _StickyTool from '@td/components-common/src/sticky-tool/sticky-tool';
import _StickyItem from '@td/components-common/src/sticky-tool/sticky-item';

import '@td/components-common/src/sticky-tool/style';

export * from './type';

export type StickyToolProps = TdStickyToolProps;
export type StickyItemProps = TdStickyItemProps;

export const StickyItem = withInstall(_StickyItem);

export const StickyTool = withInstall(_StickyTool);

export default StickyTool;
