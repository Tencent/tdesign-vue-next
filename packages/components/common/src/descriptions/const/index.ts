import type { InjectionKey } from '@td/adapter-vue';
import { TdDescriptionsProps } from '../type';

export const descriptionsKey: InjectionKey<TdDescriptionsProps> = Symbol('TDescriptions');
