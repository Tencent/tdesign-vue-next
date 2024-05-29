import { withInstall } from '@td/adapter-vue';
import type { TdSkeletonProps } from '@td/intel/skeleton/type';
import _Skeleton from './skeleton';

import './style';

export * from '@td/intel/skeleton/type';
export type SkeletonProps = TdSkeletonProps;

export const Skeleton = withInstall<typeof _Skeleton>(_Skeleton);
export default Skeleton;
