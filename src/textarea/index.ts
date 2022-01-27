import _Textarea from './textarea';
import mapProps from '../utils/map-props';
import { withInstall } from '../utils/withInstall';
import { TdTextareaProps } from './type';

import './style';

export * from './type';
export type TextareaProps = TdTextareaProps;

export const Textarea = withInstall(
  mapProps([
    {
      name: 'value',
      alias: ['modelValue'],
    },
  ])(_Textarea),
);
export default Textarea;
