import { computed, defineComponent, getCurrentInstance, provide, reactive } from 'vue';
import props from './props';
import Radio from './radio';
import { camelCase, omit, pick } from 'lodash-es';
import { RadioButtonInjectionKey } from './constants';

import { useContent } from '@tdesign/shared-hooks';

export default defineComponent({
  name: 'TRadioButton',
  inheritAttrs: false,
  props,
  setup(props, { attrs }) {
    provide(RadioButtonInjectionKey, reactive({}));

    const instance = getCurrentInstance();

    /**
     * 只转发调用方显式传入的声明 prop。
     *
     * Radio 内部的 useVModel 是按 vnode.props 中是否存在 modelValue / checked 这个 key
     * 来判断受控模式的，而 Vue 会把所有声明过的 prop 都标准化进 props，没传的也带着
     * undefined。直接展开 props 会让内层 Radio 永远认为 modelValue 是受控的，
     * checked、defaultChecked 和非受控点击结果都被忽略（issue #6885）。
     *
     * 这里按调用方真实的 vnode.props 取交集，同时保留「显式传 undefined」的语义；
     * 不走值是否为 undefined 的判断。key / ref / 生命周期钩子不在 props 声明里，
     * 取交集时已天然排除。
     */
    const explicitPropNames = Object.keys(instance?.vnode.props ?? {}).map((key) => camelCase(key));

    const radioProps = computed(() => {
      const res = {
        ...pick(props, explicitPropNames),
        ...omit(
          attrs,
          Object.keys(attrs).filter((key) => key.startsWith('on')),
        ),
      };

      return res;
    });

    const renderContent = useContent();

    return () => <Radio {...radioProps.value}>{renderContent('default', 'label')}</Radio>;
  },
});
