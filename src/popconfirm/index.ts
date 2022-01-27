import _Popconfirm from './popconfirm';
import mapProps from '../utils/map-props';
import withInstall from '../utils/withInstall';
import { TdPopconfirmProps } from './type';

import './style';

export * from './type';
export type PopconfirmProps = TdPopconfirmProps;

export const Popconfirm = withInstall(
  mapProps([
    {
      name: 'visible',
      event: 'visible-change',
      alias: ['modelValue'],
    },
  ])(_Popconfirm),
);

export default Popconfirm;
