import { defineComponent, computed, toRefs } from 'vue';
import props from './check-tag-props';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import useVModel from '../hooks/useVModel';
import { useContent } from '../hooks/tnode';

export default defineComponent({
  name: 'TCheckTag',
  props,

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('tag');
    const { SIZE } = useCommonClassName();
    const renderContent = useContent();

    const { checked, modelValue } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(
      checked,
      modelValue,
      props.defaultChecked,
      props.onChange,
      'checked',
    );

    const tagClass = computed(() => {
      return [
        `${COMPONENT_NAME.value}`,
        `${COMPONENT_NAME.value}--check`,
        `${COMPONENT_NAME.value}--default`,
        SIZE.value[props.size],
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

    return () => {
      // 标签内容
      const tagContent = renderContent('default', 'content');

      return (
        <span class={tagClass.value} onClick={handleClick}>
          {tagContent}
        </span>
      );
    };
  },
});
