import { withInstall } from '@td/adapter-vue';
import type { TdPopupProps } from '@td/components/popup/type';
import _Popup from '@td/components-vue3/src/popup/popup';

import '@td/components-vue3/src/popup/style';

export * from '@td/components/popup/type';
export type PopupProps = TdPopupProps;

export const Popup = withInstall(_Popup);
export default Popup;
