import type { InjectionKey } from '@td/adapter-vue';
import type { TdDescriptionsProps } from '@td/intel/components/descriptions/type';

const descriptionsKey: InjectionKey<TdDescriptionsProps> = Symbol('TDescriptions');

export default descriptionsKey;
