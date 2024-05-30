import { withInstall } from '@td/adapter-vue';
import _Popup from '@td/components-vue3/src/popup/popup';
import type { TdPopupProps } from './type';

import '@td/components-vue3/src/popup/style';

export * from './type';
export type PopupProps = TdPopupProps;

export const Popup = withInstall(_Popup);
export default Popup;
