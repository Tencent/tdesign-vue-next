import { withInstall } from '@td/adapter-utils';
import type { TdPopupProps } from '@td/intel/popup/type';
import _Popup from './popup';

import './style';

export type PopupProps = TdPopupProps;
export * from '@td/intel/popup/type';
export * from './plugin';

export const Popup = withInstall(_Popup);

export default Popup;
