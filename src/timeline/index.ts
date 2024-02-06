import _Timeline from './timeline';
import _TimelineItem from './timeline-item';
import withInstall from '../utils/withInstall';
import { TdTimelineProps } from './type';

import './style';

export * from './type';

export type TimelineProps = TdTimelineProps;

export const Timeline = withInstall(_Timeline);
export const TimelineItem = withInstall(_TimelineItem);

export default Timeline;
