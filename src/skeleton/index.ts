import withInstall from '../utils/withInstall';

import _Skeleton from './skeleton';
import { TdSkeletonProps } from './type';

import './style';

export * from './type';
export type SkeletonProps = TdSkeletonProps;

export const Skeleton = withInstall<typeof _Skeleton>(_Skeleton);
export default Skeleton;
