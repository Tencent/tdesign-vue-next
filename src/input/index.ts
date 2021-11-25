import _Addon from './addon';
import _Input from './input';
import _InputGroup from './input-group';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdInputProps } from './type';

import './style';

export * from './type';
export type InputProps = TdInputProps;

export const Addon: WithInstallType<typeof _Addon> = withInstall(_Addon);
export const Input: WithInstallType<typeof _Input> = withInstall(
  mapProps([
    {
      name: 'value',
      event: ['input', 'change'],
      alias: ['modelValue'],
    },
  ])(_Input),
);
export const InputGroup: WithInstallType<typeof _InputGroup> = withInstall(_InputGroup);

export default Input;
