import _Popconfirm from './popconfirm';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdPopconfirmProps } from '../../types/popconfirm/TdPopconfirmProps';

export * from '../../types/popup/TdPopupProps';
export type PopconfirmProps = TdPopconfirmProps;

const LocalPopconfirm = mapProps([
  {
    name: 'visible',
    event: 'visible-change',
    alias: ['modelValue'],
  },
])(_Popconfirm);

const Popconfirm: WithInstallType<typeof LocalPopconfirm> = withInstall(LocalPopconfirm);
export { Popconfirm };
export default Popconfirm;
