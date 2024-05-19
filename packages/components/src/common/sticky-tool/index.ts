import type { TdStickyItemProps, TdStickyToolProps } from '@td/intel/components/sticky-tool/type';
import { withInstall } from '@td/adapter-utils';
import _StickyTool from './sticky-tool';
import _StickyItem from './sticky-item';

import './style';

export * from '@td/intel/components/sticky-tool/type';

export type StickyToolProps = TdStickyToolProps;
export type StickyItemProps = TdStickyItemProps;

export const StickyItem = withInstall(_StickyItem);

export const StickyTool = withInstall(_StickyTool);

export default StickyTool;
