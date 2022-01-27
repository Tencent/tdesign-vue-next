import _TreeSelect from './tree-select';
import mapProps from '../utils/map-props';
import withInstall from '../utils/withInstall';

import './style';

export * from './interface';
export const TreeSelect = withInstall(
  mapProps([
    {
      name: 'value',
      event: ['change', 'clear', 'focus', 'blur', 'remove', 'search'],
      alias: ['modelValue'],
    },
  ])(_TreeSelect),
);
export default TreeSelect;
