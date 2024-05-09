import type { VNode } from 'vue';

import { TdDescriptionItemProps } from './type';

export enum ItemsType {
  props = 'props',
  slots = 'slots',
}

export type TdDescriptionItem = TdDescriptionItemProps | VNode;
