import { defineComponent, computed, toRefs } from 'vue';
import props from './check-tag-props';
import { renderContent } from '../utils/render-tnode';
import CLASSNAMES from '../utils/classnames';
import { usePrefixClass } from '../hooks/useConfig';
import useVModel from '../hooks/useVModel';

export default defineComponent({
  name: 'TCheckTag',
  props,
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('tag');

    const { checked, modelValue } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(checked, modelValue, props.defaultChecked, props.onChange);

    const tagClass = computed(() => {
      return [
        `${COMPONENT_NAME.value}`,
        `${COMPONENT_NAME.value}--check`,
        `${COMPONENT_NAME.value}--default`,
        CLASSNAMES.SIZE[props.size],
        {
          [`${COMPONENT_NAME.value}--checked`]: !props.disabled && innerChecked.value,
          [`${COMPONENT_NAME.value}--disabled`]: props.disabled,
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
