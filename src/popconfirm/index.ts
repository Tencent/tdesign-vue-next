import _Popconfirm from './popconfirm';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdPopconfirmProps } from '@TdTypes/popconfirm/TdPopconfirmProps';

export * from '@TdTypes/popup/TdPopupProps';
export type PopconfirmProps = TdPopconfirmProps;

const LocalPopconfirm = mapProps([
  {
    name: 'visible',
    event: 'visible-change',
    alias: ['modelValue'],
  },
])(_Popconfirm);

const PopconfirmProps: WithInstallType<typeof LocalPopconfirm> = withInstall(LocalPopconfirm);
export { PopconfirmProps };
export default PopconfirmProps;
