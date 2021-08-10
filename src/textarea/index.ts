import _Textarea from './textarea';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';

const LocalTextarea = mapProps([{
  name: 'value',
  alias: ['modelValue'],
}])(_Textarea)

const Textarea: WithInstallType<typeof LocalTextarea> = withInstall(LocalTextarea)

export { Textarea }
export default Textarea
