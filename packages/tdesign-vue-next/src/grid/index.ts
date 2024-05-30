import { withInstall } from '@td/adapter-vue';
import type { TdColProps, TdRowProps } from './type';
import _Row from '@td/components-common/src/grid/row';
import _Col from '@td/components-common/src/grid/col';

import '@td/components-common/src/grid/style';

export * from './type';
export type ColProps = TdColProps;
export type RowProps = TdRowProps;

export const Row = withInstall(_Row);
export const Col = withInstall(_Col);
export default { Row, Col };
