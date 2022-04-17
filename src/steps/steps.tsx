import { computed, defineComponent, provide, reactive, ref, toRefs, VNode, watchEffect } from 'vue';
import props from './props';
import TStepItem, { StepItemExposed } from './step-item';
import { StepsInjectionKey } from './constants';
import { ClassName } from '../common';
import { TdStepItemProps } from './type';

import { usePrefixClass } from '../hooks/useConfig';
import useVModel from '../hooks/useVModel';
import { useChildComponentSlots } from '../hooks';

export default defineComponent({
  name: 'TSteps',
  props: { ...props },

  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('steps');

    const { current, modelValue } = toRefs(props);
    const [innerCurrent, setInnerCurrent] = useVModel(current, modelValue, props.defaultCurrent, props.onChange);

    const stepsChildren = ref<StepItemExposed[]>([]);
    const addItem = (instanceExposed: StepItemExposed) => {
      instanceExposed.index.value = stepsChildren.value.length;
      // unpack
      stepsChildren.value.push({ index: instanceExposed.index.value });
    };
    const removeItem = ({ index }: StepItemExposed) => {
      stepsChildren.value = stepsChildren.value.filter((item) => item.index !== index.value);
    };

    provide(
      StepsInjectionKey,
      reactive({
        current: innerCurrent,
        readonly: props.readonly,
        theme: props.theme,
        setCurrent: setInnerCurrent,
        addItem,
        removeItem,
      }),
    );

    const indexMap = ref({});
    watchEffect(() => {
      if (!props.options) return;
      props.options?.forEach((item, index) => {
        if (item.value !== undefined) indexMap.value[item.value] = index;
      });
    });

    const handleStatus = (itemProps: TdStepItemProps, index: number) => {
      if (itemProps.status && itemProps.status !== 'default') return itemProps.status;
      if (innerCurrent.value === 'FINISH') return 'finish';
      // value 不存在时，使用 index 进行区分每一个步骤
      if (itemProps.value === undefined && index < innerCurrent.value) return 'finish';
      // value 存在，找匹配位置
      if (itemProps.value !== undefined) {
        const matchIndex = indexMap.value[innerCurrent.value];
        if (matchIndex === undefined) {
          console.warn('TDesign Steps Warn: The current `value` is not exist.');
          return 'default';
        }
        if (index < matchIndex) return 'finish';
      }
      const key = itemProps.value === undefined ? index : itemProps.value;
      if (key === innerCurrent.value) return 'process';
      return 'default';
    };

    const getChildComponentByName = useChildComponentSlots();

    const getOptionListBySlots = (nodes: VNode[]) => {
      const arr: Array<TdStepItemProps> = [];
      nodes?.forEach((node) => {
        const option = node?.props;
        option && arr.push(option as TdStepItemProps);
      });
      return arr;
    };
    const getOptions = () => {
      let options: Array<TdStepItemProps>;
      if (props.options?.length) {
        options = props.options;
      } else {
        const nodes: VNode[] = getChildComponentByName('TStepItem') as VNode[];
        options = getOptionListBySlots(nodes);
      }
      return options;
    };

    const renderContent = () => {
      let content = null;
      const options = getOptions();
      // 优先级 slot > options
      if (slots.default) {
        content = getChildComponentByName('TStepItem');

        content?.forEach((item: VNode, index: number) => {
          item.props.status = handleStatus(item.props as TdStepItemProps, index);
        });
        return content;
      }
      content = options.map((item, index) => (
        <t-step-item {...item} status={handleStatus(item, index)} key={item.value || index} />
      ));
      return content;
    };

    /** class calculate */
    const handleTheme = () => {
      let { theme } = props;
      const options = getOptions();
      options.forEach((item) => {
        if (item?.icon !== undefined) {
          // icon > theme
          theme = 'default';
        }
      });
      return theme;
    };
    const baseClass = computed<ClassName>(() => {
      if (props.direction) {
        console.warn('TDesign Steps Warn: `direction` is going to be deprecated. please use `layout` instead. ');
      }
      const layout = props.layout || props.direction || 'horizontal';
      return [
        COMPONENT_NAME.value,
        `${COMPONENT_NAME.value}--${layout}`,
        `${COMPONENT_NAME.value}--${handleTheme()}-anchor`,
        {
          [`${COMPONENT_NAME.value}--${props.sequence}`]: layout === 'vertical',
        },
      ];
    });
    /** class calculate END */

    return () => <div class={baseClass.value}>{renderContent()}</div>;
  },
});
