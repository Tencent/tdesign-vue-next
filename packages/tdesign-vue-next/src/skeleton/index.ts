import { withInstall } from '@td/adapter-vue';
import type { TdSkeletonProps } from '@td/components/skeleton/type';
import _Skeleton from './skeleton';

import './style';

export * from '@td/components/skeleton/type';
export type SkeletonProps = TdSkeletonProps;

export const Skeleton = withInstall<typeof _Skeleton>(_Skeleton);
export default Skeleton;
