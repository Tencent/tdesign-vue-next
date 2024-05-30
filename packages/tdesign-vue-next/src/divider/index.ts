import { withInstall } from '@td/adapter-vue';
import _Divider from '@td/components-common/src/divider/divider';
import type { TdDividerProps } from './type';

import '@td/components-common/src/divider/style';

export * from './type';
export type DividerProps = TdDividerProps;

export const Divider = withInstall(_Divider);
export default Divider;
