import _Row from './row';
import _Col from './col';
import withInstall from '../utils/withInstall';
import { TdRowProps, TdColProps } from './type';

import './style';

export * from './type';
export type ColProps = TdColProps;
export type RowProps = TdRowProps;

export const Row = withInstall(_Row);
export const Col = withInstall(_Col);
export default { Row, Col };
