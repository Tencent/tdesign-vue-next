import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from './props';
import TStepItem from './step-item';
import { ClassName } from '../common';
import { TdStepsProps } from './type';
import { emitEvent } from '../utils/event';
import { renderTNodeJSX } from '../utils/render-tnode';

import mixins from '../utils/mixins';
import getLocalRecevierMixins from '../locale/local-receiver';

const name = `${prefix}-steps`;

export default defineComponent({
  ...mixins(getLocalRecevierMixins('steps')),
  name,
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
      const layout = this.layout || this.direction;
      return [
        name,
        `${name}--${layout}`,
        `${name}--${this.theme}-anchor`,
        {
          [`${name}--${this.sequence}`]: layout === 'vertical',
        },
      ];
    },
  },
  methods: {
    addItem(item: InstanceType<typeof TStepItem>) {
      const index = this.stepChildren.length;
      // eslint-disable-next-line
      item.index = index;
      if (item.value !== undefined) {
        this.indexMap[item.value] = index;
      }
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
    let content;
    if (this.options && this.options.length) {
      content = this.options.map((item, index) => (
        <t-step-item {...item} current={this.current} key={item.value || index}></t-step-item>
      ));
    } else {
      content = renderTNodeJSX(this, 'default');
    }
    return <div class={this.baseClass}>{content}</div>;
  },
});
