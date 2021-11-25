import _TreeSelect from './tree-select';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';

import './style';

export * from './interface';
export const TreeSelect: WithInstallType<typeof _TreeSelect> = withInstall(
  mapProps([
    {
      name: 'value',
      event: ['change', 'clear', 'focus', 'blur', 'remove', 'search'],
      alias: ['modelValue'],
    },
  ])(_TreeSelect),
);
export default TreeSelect;
