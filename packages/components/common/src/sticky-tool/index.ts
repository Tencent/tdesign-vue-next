import _StickyTool from './sticky-tool';
import _StickyItem from './sticky-item';
import withInstall from '../utils/withInstall';
import { TdStickyToolProps, TdStickyItemProps } from '@td/intel/sticky-tool/type';

import './style';

export * from '@td/intel/sticky-tool/type';

export type StickyToolProps = TdStickyToolProps;
export type StickyItemProps = TdStickyItemProps;

export const StickyItem = withInstall(_StickyItem);

export const StickyTool = withInstall(_StickyTool);

export default StickyTool;
