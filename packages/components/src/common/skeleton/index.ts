import _Skeleton from './skeleton';
import { withInstall } from '@td/adapter-utils';
import type { TdSkeletonProps } from '@td/intel/components/skeleton/type';

import './style';

export * from '@td/intel/components/skeleton/type';
export type SkeletonProps = TdSkeletonProps;

export const Skeleton = withInstall<typeof _Skeleton>(_Skeleton);
export default Skeleton;
