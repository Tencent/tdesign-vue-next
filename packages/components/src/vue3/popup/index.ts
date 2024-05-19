import { withInstall } from '@td/adapter-utils';
import type { TdPopupProps } from '@td/intel/components/popup/type';
import _Popup from './popup';

import './style';

export * from '@td/intel/components/popup/type';
export type PopupProps = TdPopupProps;

export const Popup = withInstall(_Popup);
export default Popup;
