import { withInstall } from '@td/adapter-vue';
import type { TdPopupProps } from '@td/components/popup/type';
import _Popup from './popup';

import './style';

export * from '@td/components/popup/type';
export type PopupProps = TdPopupProps;

export const Popup = withInstall(_Popup);
export default Popup;
