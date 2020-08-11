import Tag from './tag';
import CheckTag from './check-tag';
import setInstallFn from '../utils/setInstallFn';

setInstallFn('Tag', Tag);
setInstallFn('CheckTag', CheckTag);

export { Tag, CheckTag };
export default Tag;
