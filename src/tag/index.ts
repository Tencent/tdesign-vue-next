import Tag from './tag';
import _CheckTag from './check-tag';
import setInstallFn from '../utils/setInstallFn';
import mapProps from '../utils/map-props';

const CheckTag = mapProps([{
  name: 'checked', event: 'change',
}])(_CheckTag);

setInstallFn('Tag', Tag);
setInstallFn('CheckTag', CheckTag);

export { Tag, CheckTag };
export default Tag;
