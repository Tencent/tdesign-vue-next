import _Row from './row';
import _Col from './col';
import { withInstall } from '@td/adapter-utils';
import type { TdRowProps, TdColProps } from '@td/intel/components/grid/type';

import './style';

export * from '@td/intel/components/grid/type';
export type ColProps = TdColProps;
export type RowProps = TdRowProps;

export const Row = withInstall(_Row);
export const Col = withInstall(_Col);
export default { Row, Col };
