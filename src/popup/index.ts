import _Popup from './popup';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdPopupProps } from '@TdTypes/popup/TdPopupProps';

export * from '@TdTypes/popup/TdPopupProps';
export type PopupProps = TdPopupProps;

const LocalPopup = mapProps([
  {
    name: 'visible',
    event: 'visible-change',
    alias: ['modelValue'],
  },
])(_Popup);

const Popup: WithInstallType<typeof LocalPopup> = withInstall(LocalPopup);
export { Popup };
export default Popup;
