import { withInstall } from '@td/adapter-vue';
import type { TdStickyItemProps, TdStickyToolProps } from '@td/components/sticky-tool/type';
import _StickyTool from './sticky-tool';
import _StickyItem from './sticky-item';

import './style';

export * from '@td/components/sticky-tool/type';

export type StickyToolProps = TdStickyToolProps;
export type StickyItemProps = TdStickyItemProps;

export const StickyItem = withInstall(_StickyItem);

export const StickyTool = withInstall(_StickyTool);

export default StickyTool;
