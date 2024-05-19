import _Row from './row';
import _Col from './col';
import { withInstall } from '@td/adapter-utils';
import { TdRowProps, TdColProps } from '@td/intel/grid/type';

import './style';

export * from '@td/intel/grid/type';
export type ColProps = TdColProps;
export type RowProps = TdRowProps;

export const Row = withInstall(_Row);
export const Col = withInstall(_Col);
export default { Row, Col };
