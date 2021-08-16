import _Popconfirm from './popconfirm';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdPopconfirmProps } from './type';

export * from './type';
export type PopconfirmProps = TdPopconfirmProps;

const LocalPopconfirm = mapProps([
  {
    name: 'visible',
    event: 'visible-change',
    alias: ['modelValue'],
  },
])(_Popconfirm);

export const Popconfirm: WithInstallType<typeof LocalPopconfirm> = withInstall(LocalPopconfirm);
export default Popconfirm;
