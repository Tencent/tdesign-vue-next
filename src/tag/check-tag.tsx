import { defineComponent } from 'vue';
import config from '../config';
import props from './check-tag-props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { TNodeReturnValue } from '../common';

const { prefix } = config;
const name = `${prefix}-tag`;

export default defineComponent({
  name: `${prefix}-check-tag`,
  props: { ...props },
  emits: ['click', 'change'],
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
        this.$emit('change', !this.checked);
      }
    },
  },
  render() {
    // 标签内容
    const tagContent: TNodeReturnValue = renderTNodeJSX(this, 'default') || renderTNodeJSX(this, 'content');

    return (
      <span class={this.tagClass} onClick={this.handleClick}>
        {tagContent}
      </span>
    );
  },
});
