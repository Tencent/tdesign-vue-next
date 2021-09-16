import { defineComponent, ComponentPublicInstance, ComponentOptions } from 'vue';

type VueMixin = ComponentPublicInstance | ComponentOptions<never>;

export type UnionToIntersection<U> = (U extends any
  ? (k: U) => void
  : never) extends (k: infer I) => void
  ? I
  : never;

export type ExtractInstance<T> = T extends ComponentPublicInstance<infer V>
  ? V
  : T extends ComponentOptions<infer V>
    ? V
    : never;

export type MixedVueConstructor<Mixins extends VueMixin[]> = Mixins extends (infer T)[]
  ? ComponentPublicInstance<UnionToIntersection<ExtractInstance<T>> & ComponentPublicInstance>
  : never;

export default function mixins<Mixins extends VueMixin[]>(
  ...mixins: Mixins
): MixedVueConstructor<Mixins>;

export default function mixins(...mixins: (ComponentPublicInstance | ComponentOptions<ComponentPublicInstance>)[]):
any {
  return defineComponent({ mixins });
}
