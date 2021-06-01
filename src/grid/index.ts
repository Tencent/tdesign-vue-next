import _Row from './row';
import _Col from './col';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Row: WithInstallType<typeof _Row> = withInstall(_Row);
const Col: WithInstallType<typeof _Col> = withInstall(_Col);

export { Row, Col };
export default { Row, Col };
