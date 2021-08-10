import _Row from './row';
import _Col from './col';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdRowProps, TdColProps } from './type';

export type ColProps = TdColProps;
export type RowProps = TdRowProps;
export * from './type';

export const Row: WithInstallType<typeof _Row> = withInstall(_Row);
export const Col: WithInstallType<typeof _Col> = withInstall(_Col);
export default { Row, Col };
