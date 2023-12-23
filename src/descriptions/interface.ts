import type { InjectionKey } from 'vue';
import { TdDescriptionsProps } from './type';

type Align = 'left' | 'right' | 'top';

// export interface DescriptionsInject {
//   bordered: boolean;
//   column: number;
//   direction: 'horizontal' | 'vertical';
//   itemDirection: 'horizontal' | 'vertical';
//   size: 'small' | 'medium' | 'large';
//   colon: boolean;
//   labelAlign: Align;
//   contentAlign: Align;
// }

export const descriptionsKey: InjectionKey<TdDescriptionsProps> = Symbol('TDescriptions');
