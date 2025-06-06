import _Skeleton from './skeleton';
import { withInstall } from '@tdesign/shared-utils';
import { TdSkeletonProps } from './type';

import './style';

export * from './type';
export type SkeletonProps = TdSkeletonProps;

export const Skeleton = withInstall<typeof _Skeleton>(_Skeleton);
export default Skeleton;
