import { withInstall } from '@td/adapter-utils';
import type { TdStickyItemProps, TdStickyToolProps } from '@td/intel/sticky-tool/type';
import _StickyTool from './sticky-tool';
import _StickyItem from './sticky-item';

import './style';

export * from '@td/intel/sticky-tool/type';

export type StickyToolProps = TdStickyToolProps;
export type StickyItemProps = TdStickyItemProps;

export const StickyItem = withInstall(_StickyItem);

export const StickyTool = withInstall(_StickyTool);

export default StickyTool;
