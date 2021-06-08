import _Popconfirm from './popconfirm';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Popconfirm: WithInstallType<typeof _Popconfirm> = withInstall(_Popconfirm);

export { Popconfirm };
export default Popconfirm;
