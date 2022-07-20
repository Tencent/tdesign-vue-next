import {InjectionKey} from 'vue'

export const TimeLineInjectionKey: InjectionKey<{
  direction: 'vertical' | 'horizontal',
  mode: 'left' | 'alternate' | 'right'
}> = Symbol('TimelineProvide')