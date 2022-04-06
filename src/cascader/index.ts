import _Cascader from './cascader';
import _CascaderPanel from './cascader-panel';
import _CascaderNew from './cascader-new';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';

import './style';

export * from './type';

export const Cascader: WithInstallType<typeof _Cascader> = withInstall(
  mapProps([
    {
      name: 'value',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(_Cascader),
);
export const CascaderPanel: WithInstallType<typeof _CascaderPanel> = withInstall(_CascaderPanel);
export const CascaderNew: WithInstallType<typeof _CascaderNew> = withInstall(_CascaderNew);

export default Cascader;
