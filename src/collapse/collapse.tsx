import { defineComponent, toRefs, provide, computed } from 'vue';
import props from './props';
import { CollapseValue, TdCollapseProps, CollapsePanelValue } from './type';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TCollapse',
  props,

  setup(props: TdCollapseProps) {
    const componentName = usePrefixClass('collapse');
    const borderlessClass = usePrefixClass('-border-less');
    // const renderTNodeJSX = useTNodeJSX();
    const { value, expandMutex, borderless, modelValue } = toRefs(props);
    const [collapseValue, setCollapseValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const updateCollapseValue = (value: CollapsePanelValue) => {
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
        componentName.value,
        {
          [borderlessClass.value]: !!borderless.value,
        },
      ];
    });

    const uniqIdGenerator = (() => {
      let index = 0;

      const getUniqId = () => {
        return index++;
      };
      const reset = () => {
        index = 0;
      };

      return { getUniqId, reset };
    })();

    provide('collapseValue', collapseValue);
    provide('updateCollapseValue', updateCollapseValue);
    provide('collapseProps', toRefs(props));
    provide('uniqIdGenerator', uniqIdGenerator);
    // provide('renderParentTNode', () => renderTNodeJSX);

    return () => {
      const renderTNodeJSX = useTNodeJSX();

      const nodes = renderTNodeJSX('default');
      uniqIdGenerator.reset();

      return <div class={classes.value}>{nodes}</div>;
    };
  },
});
