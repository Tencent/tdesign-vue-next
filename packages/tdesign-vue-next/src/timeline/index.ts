import { withInstall } from '@td/adapter-vue';
import type { TdTimelineProps } from './type';
import _Timeline from '@td/components-common/src/timeline/timeline';
import _TimelineItem from '@td/components-common/src/timeline/timeline-item';

import '@td/components-common/src/timeline/style';

export * from './type';

export type TimelineProps = TdTimelineProps;

export const Timeline = withInstall(_Timeline);
export const TimelineItem = withInstall(_TimelineItem);

export default Timeline;
