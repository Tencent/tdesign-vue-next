import type { InjectionKey } from '@td/adapter-vue';
import type { TdDescriptionsProps } from '@td/intel/descriptions/type';

export const descriptionsKey: InjectionKey<TdDescriptionsProps> = Symbol('TDescriptions');
