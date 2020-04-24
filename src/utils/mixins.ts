import Vue, { VueConstructor, ComponentOptions } from 'vue';

type VueMixin = VueConstructor | ComponentOptions<never>

type UnionToIntersection<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never

type ExtractInstance<T> = T extends VueConstructor<infer V>
  ? V
  : T extends ComponentOptions<infer V>
  ? V
  : never

type MixedVueConstructor<Mixins extends VueMixin[]> = Mixins extends (infer T)[]
  ? VueConstructor<UnionToIntersection<ExtractInstance<T>> & Vue>
  : never

export default function mixins<Mixins extends VueMixin[]>(
  ...mixins: Mixins
): MixedVueConstructor<Mixins>;
export default function mixins(...mixins: (VueConstructor | ComponentOptions<Vue>)[]): 
VueConstructor {
  return Vue.extend({ mixins });
}
