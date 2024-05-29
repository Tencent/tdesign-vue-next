import { withInstall } from '@td/adapter-vue';
import type { TdPopupProps } from '@td/intel/popup/type';
import _Popup from './popup';

import './style';

export * from '@td/intel/popup/type';
export type PopupProps = TdPopupProps;

export const Popup = withInstall(_Popup);
export default Popup;
