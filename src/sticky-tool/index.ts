import withInstall from '../utils/withInstall';

import _StickyItem from './sticky-item';
import _StickyTool from './sticky-tool';
import { TdStickyToolProps, TdStickyItemProps } from './type';

import './style';

export * from './type';

export type StickyToolProps = TdStickyToolProps;
export type StickyItemProps = TdStickyItemProps;

export const StickyItem = withInstall(_StickyItem);

export const StickyTool = withInstall(_StickyTool);

export default StickyTool;
