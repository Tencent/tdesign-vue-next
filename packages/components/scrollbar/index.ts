import _Scrollbar from './scrollbar';
import { withInstall } from '@tdesign/shared-utils';
import { TdScrollbarProps } from './type';

import './style';

export * from './type';
export const Scrollbar = withInstall(_Scrollbar);
export type ScrollbarProps = TdScrollbarProps;
export default Scrollbar;
