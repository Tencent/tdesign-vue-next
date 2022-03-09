import { defineComponent, computed, toRefs } from 'vue';
import props from './check-tag-props';
import { renderContent } from '../utils/render-tnode';
import CLASSNAMES from '../utils/classnames';
import { useConfig } from '../config-provider';
import useVModel from '../hooks/useVModel';

export default defineComponent({
  name: 'TCheckTag',
  props,
  setup(props, context) {
    const { classPrefix: prefix } = useConfig('tag');
    const name = computed(() => {
      return `${prefix.value}-tag`;
    });

    const { checked, modelValue } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(checked, modelValue, props.defaultChecked, props.onChange);

    const tagClass = computed(() => {
      return [
        `${name.value}`,
        `${name.value}--check`,
        `${name.value}--default`,
        CLASSNAMES.SIZE[props.size],
        {
          [`${name.value}--checked`]: !props.disabled && innerChecked.value,
          [`${name.value}--disabled`]: props.disabled,
        },
      ];
    });

    const handleClick = (e: MouseEvent) => {
      if (!props.disabled) {
        props.onClick?.({ e });
        setInnerChecked(!innerChecked.value);
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
