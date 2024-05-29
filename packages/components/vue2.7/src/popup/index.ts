import { withInstall } from '@td/adapter-vue';
import type { TdPopupProps } from '@td/components/popup/type';
import _Popup from './popup';

import './style';

export type PopupProps = TdPopupProps;
export * from '@td/components/popup/type';
export * from './plugin';

export const Popup = withInstall(_Popup);

export default Popup;
