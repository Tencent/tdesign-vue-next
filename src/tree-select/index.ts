import mapProps from '../utils/map-props';
import _TreeSelect from './tree-select';
import { withInstall, WithInstallType } from '../utils/withInstall';

const LocalTreeSelect = mapProps([
  {
    name: 'value',
    event: ['change', 'clear', 'focus', 'blur', 'remove', 'search'],
    alias: ['modelValue'],
  },
])(_TreeSelect);

export * from './interface';
export const TreeSelect: WithInstallType<typeof _TreeSelect> = withInstall(LocalTreeSelect);
export default TreeSelect;
