import _Divider from './divider';
import withInstall from '../utils/withInstall';
import { TdDividerProps } from './type';

import './style';

export * from './type';
export type DividerProps = TdDividerProps;

export const Divider = withInstall(_Divider);
export default Divider;
