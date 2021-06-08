import _Popup from './popup';
import { TdPopupProps } from '@TdTypes/popup/TdPopupProps';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Popup: WithInstallType<typeof _Popup> = withInstall(_Popup);

export type PopupProps = TdPopupProps;
export { Popup };
export default Popup;
