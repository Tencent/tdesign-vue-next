import _Popup from './popup';
import withInstall from '../utils/withInstall';
import { TdPopupProps } from '@td/intel/../../vue3/src/popup/type';

import './style';

export * from '@td/intel/../../vue3/src/popup/type';
export type PopupProps = TdPopupProps;

export const Popup = withInstall(_Popup);
export default Popup;
