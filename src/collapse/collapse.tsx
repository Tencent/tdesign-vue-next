import { defineComponent, VNode, toRefs, provide } from 'vue';
import useDefaultValue from '../hooks/useDefaultValue';
import { prefix } from '../config';
import props from './props';
import { CollapseValue } from './type';
import { CollapseProps } from '.';

const preName = `${prefix}-collapse`;

export default defineComponent({
  name: 'TCollapse',
  props,
  setup(props: CollapseProps, context) {
    const { value, expandMutex } = toRefs(props);
    const [collapseValue, setCollapseValue] = useDefaultValue(
      value,
      props.defaultValue,
      props.onChange,
      context.emit,
      'value',
    );
    const updateCollapseValue = (value: CollapseValue) => {
      let newValue: CollapseValue = [].concat(collapseValue.value || []);
      const index = newValue.indexOf(value);
      if (index >= 0) {
        newValue.splice(index, 1);
      } else if (expandMutex.value) {
        newValue = [value];
      } else {
        newValue.push(value);
      }
      setCollapseValue(newValue);
    };
    provide('collapseValue', collapseValue);
    provide('updateCollapseValue', updateCollapseValue);
    provide('collapseProps', toRefs(props));
  },
  render(): VNode {
    const nodes = this.$slots.default && this.$slots.default(null);
    return <div class={preName}>{nodes}</div>;
  },
});
