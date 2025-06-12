import type { VNode } from 'vue';
import { TdDescriptionsItemProps } from './type';

export enum ItemsType {
  props = 'props',
  slots = 'slots',
}

export type TdDescriptionsItem = TdDescriptionsItemProps | VNode;
