import _Timeline from './timeline';
import _TimelineItem from './timeline-item';
import { withInstall } from '@td/adapter-utils';
import type { TdTimelineProps } from '@td/intel/components/timeline/type';

import './style';

export * from '@td/intel/components/timeline/type';

/**
 * @deprecated use TdTimelineProps instead
 */
export type TdTimeLineProps = TdTimelineProps;

export const Timeline = withInstall(_Timeline);
export const TimelineItem = withInstall(_TimelineItem);

export default Timeline;
