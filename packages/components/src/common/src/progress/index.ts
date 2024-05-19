import _Progress from './progress';
import withInstall from '../utils/withInstall';
import { TdProgressProps } from './type';

import './style';

export type ProgressProps = TdProgressProps;
export * from './type';

export const Progress = withInstall(_Progress);

export default Progress;
