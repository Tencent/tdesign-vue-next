import { computed, defineComponent, provide, toRefs } from '@td/adapter-vue';
import props from '@td/intel/components/collapse/props';
import type { CollapsePanelValue, CollapseValue, TdCollapseProps } from '@td/intel/components/collapse/type';
import { usePrefixClass, useTNodeJSX, useVModel } from '@td/adapter-hooks';

export default defineComponent({
  name: 'TCollapse',
  props,

  setup(props: TdCollapseProps) {
    const componentName = usePrefixClass('collapse');
    const borderlessClass = usePrefixClass('-border-less');
    const renderTNodeJSX = useTNodeJSX();
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
    const getUniqId = (() => {
      let index = 0;
      return () => index++;
    })();

    provide('collapseValue', collapseValue);
    provide('updateCollapseValue', updateCollapseValue);
    provide('collapseProps', toRefs(props));
    provide('getUniqId', getUniqId);
    provide('renderParentTNode', renderTNodeJSX);

    return () => {
      const nodes = renderTNodeJSX('default');
      return <div class={classes.value}>{nodes}</div>;
    };
  },
});
