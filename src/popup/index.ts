import _Popup from './popup';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdPopupProps } from '../../types/popup/TdPopupProps';

export * from '../../types/popup/TdPopupProps';
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
