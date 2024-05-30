import { withInstall } from '@td/adapter-vue';
import _Skeleton from '@td/components-common/src/skeleton/skeleton';
import type { TdSkeletonProps } from './type';

import '@td/components-common/src/skeleton/style';

export * from './type';
export type SkeletonProps = TdSkeletonProps;

export const Skeleton = withInstall<typeof _Skeleton>(_Skeleton);
export default Skeleton;
