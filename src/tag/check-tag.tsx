import { defineComponent, computed } from 'vue';
import { useEmitEvent } from '../hooks/event';
import config from '../config';
import props from './check-tag-props';
import { renderContent } from '../utils/render-tnode';

const { prefix } = config;
const name = `${prefix}-tag`;

export default defineComponent({
  name: 'TCheckTag',
  props,
  emits: ['click', 'change'],
  setup(props, { emit }) {
    const emitEvent = useEmitEvent(props, emit);
    const tagClass = computed(() => {
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
        emitEvent('click', { e });
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
    const tagContent = renderContent(this, 'default', 'content');

    return (
      <span class={this.tagClass} onClick={this.handleClick}>
        {tagContent}
      </span>
    );
  },
});
