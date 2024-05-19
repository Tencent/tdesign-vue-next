import _Skeleton from './skeleton';
import withInstall from '../utils/withInstall';
import { TdSkeletonProps } from './type';

import './style';

export * from './type';
export type SkeletonProps = TdSkeletonProps;

export const Skeleton = withInstall<typeof _Skeleton>(_Skeleton);
export default Skeleton;
