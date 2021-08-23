import _Affix from './affix';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Affix: WithInstallType<typeof _Affix> = withInstall(_Affix);

export { Affix };
export default Affix;
