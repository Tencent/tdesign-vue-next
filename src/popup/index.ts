import withInstall from '../utils/withInstall';

import _Popup from './popup';
import { TdPopupProps } from './type';

import './style';

export * from './type';
export type PopupProps = TdPopupProps;

export const Popup = withInstall(_Popup);
export default Popup;
