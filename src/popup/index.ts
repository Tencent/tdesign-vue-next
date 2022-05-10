import _Popup from './popup';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdPopupProps } from './type';

import './style';

export * from './type';
export type PopupProps = TdPopupProps;

export const Popup: WithInstallType<typeof _Popup> = withInstall(_Popup);
export default Popup;
