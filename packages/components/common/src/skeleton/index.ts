import _Skeleton from './skeleton';
import withInstall from '../utils/withInstall';
import { TdSkeletonProps } from '@td/intel/skeleton/type';

import './style';

export * from '@td/intel/skeleton/type';
export type SkeletonProps = TdSkeletonProps;

export const Skeleton = withInstall<typeof _Skeleton>(_Skeleton);
export default Skeleton;
