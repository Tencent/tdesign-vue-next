import { withInstall } from '@td/adapter-utils';
import type { TdTimelineProps } from '@td/intel/timeline/type';
import _Timeline from './timeline';
import _TimelineItem from './timeline-item';

import './style';

export * from '@td/intel/timeline/type';

export type TimelineProps = TdTimelineProps;

export const Timeline = withInstall(_Timeline);
export const TimelineItem = withInstall(_TimelineItem);

export default Timeline;
