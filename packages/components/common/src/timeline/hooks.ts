import { InjectionKey, ComputedRef, computed } from 'vue';
import { TdTimelineProps } from '@td/intel/timeline/type';

export const DefaultAlign = {
  vertical: ['left', 'right'],
  horizontal: ['top', 'bottom'],
};

export interface TimelineProvider {
  theme: TdTimelineProps['theme'];
  reverse: TdTimelineProps['reverse'];
  itemsStatus: string[];
  layout: TdTimelineProps['layout'];
  globalAlign?: TdTimelineProps['labelAlign'];
  mode?: TdTimelineProps['mode'];
  renderAlign: string;
}

export const TimelineInjectKey: InjectionKey<ComputedRef<TimelineProvider>> = Symbol('timeLineProvide');

export const DEFAULT_PROVIDER = computed<TimelineProvider>(() => ({
  theme: 'default',
  reverse: false,
  itemsStatus: [],
  layout: 'horizontal',
  renderAlign: 'left',
  mode: 'alternate',
}));
