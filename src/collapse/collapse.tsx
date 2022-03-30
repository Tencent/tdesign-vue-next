import { defineComponent, VNode, toRefs, provide, computed } from 'vue';
import { prefix } from '../config';
import props from './props';
import { CollapseValue } from './type';
import { CollapseProps } from '.';
import useVModel from '../hooks/useVModel';

const preName = `${prefix}-collapse`;
const BORDERLESS_CLASS = `${prefix}--border-less`;

export default defineComponent({
  name: 'TCollapse',
  props,
  setup(props: CollapseProps, context) {
    const { value, expandMutex, borderless, modelValue } = toRefs(props);
    const [collapseValue, setCollapseValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
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
    const classes = computed(() => {
      return [
        preName,
        {
          [BORDERLESS_CLASS]: !!borderless.value,
        },
      ];
    });
    provide('collapseValue', collapseValue);
    provide('updateCollapseValue', updateCollapseValue);
    provide('collapseProps', toRefs(props));
    return {
      classes,
    };
  },
  render(): VNode {
    const { classes } = this;
    const nodes = this.$slots.default && this.$slots.default(null);
    nodes.forEach((node, index) => {
      const { props, type } = node;
      if ((type as any)?.name === 'TCollapsePanel' && props?.value === undefined) {
        if (props) {
          props.value = index;
        }
      }
    });
    return <div class={classes}>{nodes}</div>;
  },
});
