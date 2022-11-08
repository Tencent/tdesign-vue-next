import _Timeline from './TimeLine';
import _TimelineItem from './TimelineItem';
import withInstall from '../utils/withInstall';

import './style';

export type { TdTimeLineProps } from './type';

export * from './type';

export const Timeline = withInstall(_Timeline);
export const TimelineItem = withInstall(_TimelineItem);

export default Timeline;
