import { TdDescriptionItemProps } from './type';

import type { VNode } from 'vue';

export enum ItemsType {
  props = 'props',
  slots = 'slots',
}

export type TdDescriptionItem = TdDescriptionItemProps | VNode;
