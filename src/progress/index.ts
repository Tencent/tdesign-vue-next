import withInstall from '../utils/withInstall';

import _Progress from './progress';
import { TdProgressProps } from './type';

import './style';

export type ProgressProps = TdProgressProps;
export * from './type';

export const Progress = withInstall(_Progress);

export default Progress;
