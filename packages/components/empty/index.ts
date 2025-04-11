import _Empty from './empty';
import withInstall from '../utils/withInstall';
import type { TdEmptyProps } from './type';

import './style';

export * from './type';
export type EmptyProps = TdEmptyProps;

export const Empty = withInstall(_Empty);
export default Empty;
