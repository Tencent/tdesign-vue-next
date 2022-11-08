import { InjectionKey, ComputedRef } from 'vue';
import { TdTimeLineProps } from './type';

export const DefaultAlign = {
  vertical: ['left', 'right'],
  horizontal: ['top', 'bottom'],
};

export const TimelineInjectKey: InjectionKey<
  ComputedRef<{
    theme: TdTimeLineProps['theme'];
    reverse: TdTimeLineProps['reverse'];
    itemsStatus: string[];
    layout: TdTimeLineProps['layout'];
    globalAlign?: TdTimeLineProps['labelAlign'];
    mode?: TdTimeLineProps['mode'];
    renderAlign: string;
  }>
> = Symbol('timeLineProvide');
