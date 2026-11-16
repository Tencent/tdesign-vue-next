import _Split from './split';
import _SplitPanel from './split-panel';
import { withInstall } from '@tdesign/shared-utils';
import { TdSplitPanelProps, TdSplitProps } from './type';

import './style';

export * from './type';
export type SplitProps = TdSplitProps;
export type SplitPanelProps = TdSplitPanelProps;

export const Split = withInstall(_Split);
export const SplitPanel = withInstall(_SplitPanel);
export default Split;
