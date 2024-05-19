import _Divider from './divider';
import withInstall from '../utils/withInstall';
import { TdDividerProps } from '@td/intel/divider/type';

import './style';

export * from '@td/intel/divider/type';
export type DividerProps = TdDividerProps;

export const Divider = withInstall(_Divider);
export default Divider;
