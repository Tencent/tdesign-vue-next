import _Divider from './divider';
import { withInstall } from '@td/adapter-utils';
import type { TdDividerProps } from '@td/intel/components/divider/type';

import './style';

export * from '@td/intel/components/divider/type';
export type DividerProps = TdDividerProps;

export const Divider = withInstall(_Divider);
export default Divider;
