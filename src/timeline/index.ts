import _TimeLine from './timeline';
import withInstall from '../utils/withInstall';

import './style';

export type { TdTimeLineProps } from './type';

export * from './type';

export const TimeLine = withInstall(_TimeLine);

export default TimeLine;
