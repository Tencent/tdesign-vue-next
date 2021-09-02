import _Popup from './popup';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdPopupProps } from './type';

export * from './type';
export type PopupProps = TdPopupProps;

const LocalPopup = mapProps([
  {
    name: 'visible',
    event: 'visible-change',
  },
])(_Popup);

export const Popup: WithInstallType<typeof LocalPopup> = withInstall(LocalPopup);
export default Popup;
