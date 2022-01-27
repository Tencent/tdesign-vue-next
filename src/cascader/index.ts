import _Cascader from './cascader';
import mapProps from '../utils/map-props';
import withInstall from '../utils/withInstall';

import './style';

export * from './type';

export const Cascader = withInstall(
  mapProps([
    {
      name: 'value',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(_Cascader),
);
export default Cascader;
