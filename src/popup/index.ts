import _Popup from './popup';
import mapProps from '../utils/map-props';
import { withInstall } from '../utils/withInstall';
import { TdPopupProps } from './type';

import './style';

export * from './type';
export type PopupProps = TdPopupProps;

export const Popup = withInstall(
  mapProps([
    {
      name: 'visible',
      event: 'visible-change',
    },
  ])(_Popup),
);

export default Popup;
