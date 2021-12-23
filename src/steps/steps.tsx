import { defineComponent, VNode } from 'vue';
import { prefix } from '../config';
import props from './props';
import TStepItem from './step-item';
import { ClassName } from '../common';
import mixins from '../utils/mixins';
import getConfigReceiverMixins, { StepsConfig } from '../config-provider/config-receiver';
import { TdStepsProps, TdStepItemProps } from './type';
import { emitEvent } from '../utils/event';

const name = `${prefix}-steps`;

export default defineComponent({
  name: 'TSteps',
  ...mixins(getConfigReceiverMixins<StepsConfig>('datePicker')),
  components: {
    TStepItem,
  },
  provide(): { steps: any } {
    return {
      steps: this,
    };
  },
  props: { ...props },
  data() {
    return {
      stepChildren: [],
      indexMap: {},
    };
  },
  computed: {
    baseClass(): ClassName {
      if (this.direction) {
        console.warn('TDesign Steps Warn: `direction` is going to be deprecated. please use `layout` instead. ');
      }
      const layout = this.layout || this.direction || 'horizontal';
      return [
        name,
        `${name}--${layout}`,
        `${name}--${this.handleTheme()}-anchor`,
        {
          [`${name}--${this.sequence}`]: layout === 'vertical',
        },
      ];
    },
  },
  watch: {
    options: {
      immediate: true,
      handler() {
        if (!this.options) return;
        this.options.forEach((item, index) => {
          if (item.value !== undefined) {
            this.indexMap[item.value] = index;
          }
        });
      },
    },
  },
  methods: {
    getOptions() {
      let options: Array<TdStepItemProps>;
      if (this.options && this.options.length) {
        options = this.options;
      } else {
        const nodes = this.$slots.default && this.$slots.default(null);
        options = this.getOptionListBySlots(nodes);
      }
      return options;
    },
    getOptionListBySlots(nodes: VNode[]) {
      const arr: Array<TdStepItemProps> = [];
      nodes?.forEach((node) => {
        const option = node?.props;
        option && arr.push(option as TdStepItemProps);
      });
      return arr;
    },
    handleTheme() {
      let { theme } = this;
      const options = this.getOptions();
      options.forEach((item) => {
        if (item?.icon !== undefined) {
          // icon > theme
          theme = 'default';
        }
      });
      return theme;
    },
    handleStatus(item: TdStepItemProps, index: number) {
      if (item.status && item.status !== 'default') return item.status;
      if (this.current === 'FINISH') return 'finish';
      // value 不存在时，使用 index 进行区分每一个步骤
      if (item.value === undefined && index < this.current) return 'finish';
      // value 存在，找匹配位置
      if (item.value !== undefined) {
        const matchIndex = this.indexMap[this.current];
        if (matchIndex === undefined) {
          console.warn('TDesign Steps Warn: The current `value` is not exist.');
          return 'default';
        }
        if (index < matchIndex) return 'finish';
      }
      const key = item.value === undefined ? index : item.value;
      if (key === this.current) return 'process';
      return 'default';
    },
    addItem(item: InstanceType<typeof TStepItem>) {
      const index = this.stepChildren.length;
      // eslint-disable-next-line
      item.index = index;
      this.stepChildren.push(item);
    },
    removeItem(item: InstanceType<typeof TStepItem>) {
      this.stepChildren = this.stepChildren.filter((t) => t !== item);
    },
    handleChange(cur: TdStepsProps['current'], prev: TdStepsProps['current'], e: MouseEvent) {
      emitEvent<Parameters<TdStepsProps['onChange']>>(this, 'change', cur, prev, { e });
    },
  },
  render() {
    const options = this.getOptions();
    const content = options.map((item, index) => (
      <t-step-item
        {...{
          ...item,
          status: this.handleStatus(item, index),
        }}
        key={item.value || index}
      ></t-step-item>
    ));
    return <div class={this.baseClass}>{content}</div>;
  },
});
