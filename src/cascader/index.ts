import _Cascader from './cascader';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdCascaderProps } from './type';

import './style';

export * from './type';
export type CascaderProps = TdCascaderProps;

export const Cascader: WithInstallType<typeof _Cascader> = withInstall(mapProps([{
  name: 'value', event: 'change', alias: ['modelValue'],
}])(_Cascader));
export default Cascader;
