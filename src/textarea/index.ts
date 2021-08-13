import _Textarea from './textarea';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdTextareaProps } from './type';

const LocalTextarea = mapProps([{
  name: 'value',
  alias: ['modelValue'],
}])(_Textarea)

export * from './type';
export type TextareaProps = TdTextareaProps

export const Textarea: WithInstallType<typeof LocalTextarea> = withInstall(LocalTextarea)
export default Textarea
