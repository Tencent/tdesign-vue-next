import Vue, { VNode } from 'vue';
import RenderComponent from '../utils/render-component';
import config from '../config';
import props from '../../types/check-tag/props';

const { prefix } = config;
const name = `${prefix}-tag`;

export default Vue.extend({
  name: `${prefix}-check-tag`,
  components: {
    RenderComponent,
  },
  props: { ...props },
  computed: {
    tagClass(): Array<any> {
      return [
        `${name}`,
        `${name}--check`,
        `${name}--default`,
        {
          [`${name}--checked`]: !this.disabled && this.checked,
          [`${name}--disabled`]: this.disabled,
        },
      ];
    },
  },
  methods: {
    handleClick(event: MouseEvent): void {
      if (!this.disabled) {
        this.$emit('click', event);
        if (typeof this.onClick === 'function') this.onClick(event);
      }
    },
  },
  render() {
    // 标签内容
    const tagContent: VNode[] | VNode | string = this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';

    return (
      <span class={this.tagClass} onClick={this.handleClick}>
        {tagContent}
      </span>
    );
  },
});
