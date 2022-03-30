import { defineComponent, VNode, toRefs, provide, computed } from 'vue';
import { prefix } from '../config';
import props from './props';
import { CollapseValue, TdCollapseProps } from './type';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../config-provider';

export default defineComponent({
  name: 'TCollapse',
  props,
  setup(props: TdCollapseProps, context) {
    const COMPONENT_NAME = usePrefixClass('collapse');
    const BORDERLESS_CLASS = usePrefixClass('-border-less');
    const renderTNodeJSX = useTNodeJSX();
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
        COMPONENT_NAME.value,
        {
          [BORDERLESS_CLASS.value]: !!borderless.value,
        },
      ];
    });
    provide('collapseValue', collapseValue);
    provide('updateCollapseValue', updateCollapseValue);
    provide('collapseProps', toRefs(props));
    return () => {
      const nodes = renderTNodeJSX('default');
      if (Array.isArray(nodes)) {
        nodes.forEach((node, index) => {
          const { props, type } = node;
          if ((type as any)?.name === 'TCollapsePanel' && props?.value === undefined) {
            if (props) {
              props.value = index;
            }
          }
        });
      }
      return <div class={classes.value}>{nodes}</div>;
    };
  },
});
