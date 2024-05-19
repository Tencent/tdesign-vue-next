import _Popup from './popup';
import { withInstall } from '@td/adapter-utils';
import { TdPopupProps } from '@td/intel/popup/type';

import './style';

export * from '@td/intel/popup/type';
export type PopupProps = TdPopupProps;

export const Popup = withInstall(_Popup);
export default Popup;
