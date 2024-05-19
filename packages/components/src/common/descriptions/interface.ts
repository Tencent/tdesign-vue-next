import type { VNode } from '@td/adapter-vue';
import type { TdDescriptionItemProps } from '@td/intel/components/descriptions/type';

export enum ItemsType {
  props = 'props',
  slots = 'slots',
}

export type TdDescriptionItem = TdDescriptionItemProps | VNode;
