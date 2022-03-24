import { defineComponent, VNode, toRefs, provide } from 'vue';
import useDefaultValue from '../hooks/useDefaultValue';
import { prefix } from '../config';
import props from './props';
import { CollapseValue } from './type';

const preName = `${prefix}-collapse`;

export default defineComponent({
  name: 'TCollapse',
  props,
  setup(props, context) {
    const { value, expandMutex, defaultExpandAll, disabled, expandIcon } = toRefs(props);
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
    provide('defaultExpandAll', defaultExpandAll);
    provide('disableAll', disabled);
    provide('expandIcon', expandIcon);
  },
  render(): VNode {
    const nodes = this.$slots.default && this.$slots.default(null);
    return <div>{nodes}</div>;
  },
});
