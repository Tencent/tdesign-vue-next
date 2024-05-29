import { withInstall } from '@td/adapter-vue';
import type { TdDividerProps } from '@td/intel/divider/type';
import _Divider from './divider';

import './style';

export * from '@td/intel/divider/type';
export type DividerProps = TdDividerProps;

export const Divider = withInstall(_Divider);
export default Divider;
