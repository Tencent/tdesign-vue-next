import { defineComponent, ComponentPublicInstance, computed } from 'vue';
import { useEmitEvent } from '../hooks/event';
import config from '../config';
import props from './check-tag-props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { TNodeReturnValue } from '../common';

const { prefix } = config;
const name = `${prefix}-tag`;

export default defineComponent({
  name: 'TCheckTag',
  props,
  emits: ['click', 'change'],
  setup(props, { emit }) {
    const emitEvent = useEmitEvent(props, emit);
    const tagClass = computed<Array<string | object>>(() => {
      return [
        `${name}`,
        `${name}--check`,
        `${name}--default`,
        {
          [`${name}--checked`]: !props.disabled && props.checked,
          [`${name}--disabled`]: props.disabled,
        },
      ];
    });

    const handleClick = (e: MouseEvent) => {
      if (!props.disabled) {
        emitEvent('click', e);
        emitEvent('change', !props.checked);
      }
    };

    return {
      tagClass,
      handleClick,
    };
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
