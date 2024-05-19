import type { InjectionKey } from '@td/adapter-vue';
import type { TdDescriptionsProps } from '../type';

export const descriptionsKey: InjectionKey<TdDescriptionsProps> = Symbol('TDescriptions');
