import _Transfer from './transfer';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Transfer: WithInstallType<typeof _Transfer> = withInstall(_Transfer);

export { Transfer };
export default Transfer;
