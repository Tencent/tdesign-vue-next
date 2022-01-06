import { defineComponent, ComponentPublicInstance } from 'vue';
import config from '../config';
import props from './check-tag-props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { TNodeReturnValue } from '../common';
import { emitEvent } from '../utils/event';

const { prefix } = config;
const name = `${prefix}-tag`;

export default defineComponent({
  name: 'TCheckTag',
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
        emitEvent(this, 'click', event);
        emitEvent(this, 'change', !this.checked);
      }
    },
  },
  render() {
    // 标签内容
    const tagContent: TNodeReturnValue =
      renderTNodeJSX(this as ComponentPublicInstance, 'default') ||
      renderTNodeJSX(this as ComponentPublicInstance, 'content');

    return (
      <span class={this.tagClass} onClick={this.handleClick}>
        {tagContent}
      </span>
    );
  },
});
