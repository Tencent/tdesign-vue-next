import Popup from './popup';
import setInstallFn from '../utils/setInstallFn';
import { TdPopupProps } from '@TdTypes/popup/TdPopupProps';

setInstallFn('Popup', Popup);

export type PopupProps = TdPopupProps;
export { Popup };
export default Popup;
