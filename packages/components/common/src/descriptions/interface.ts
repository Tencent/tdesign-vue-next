import type { VNode } from 'vue';
import { TdDescriptionItemProps } from '@td/intel/descriptions/type';

export enum ItemsType {
  props = 'props',
  slots = 'slots',
}

export type TdDescriptionItem = TdDescriptionItemProps | VNode;
