import _Timeline from './timeline';
import _TimelineItem from './TimelineItem';
import withInstall from '../utils/withInstall';

import './style';

export type { TdTimeLineProps } from './type';

export * from './type';

export const Timeline = withInstall(_Timeline);
export const TimelineItem = withInstall(_TimelineItem);

export default Timeline;
