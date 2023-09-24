import { defineComponent, computed, toRefs } from 'vue';
import props from './check-tag-props';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import useVModel from '../hooks/useVModel';
import { useContent } from '../hooks/tnode';
import Tag from './tag';
import { TdCheckTagProps, TdTagProps } from './type';

export default defineComponent({
  name: 'TCheckTag',
  props,

  setup(props: TdCheckTagProps) {
    const prefix = usePrefixClass();
    const COMPONENT_NAME = usePrefixClass('check-tag');
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
        SIZE.value[props.size],
        `${COMPONENT_NAME.value}--${innerChecked.value ? 'checked' : 'unchecked'}`,
        {
          [`${COMPONENT_NAME.value}--disabled`]: props.disabled,
        },
        /** the follow class name is going to be deprecated */
        // `${prefix.value}-tag--check`,
        // {
        //   [`${prefix.value}-tag--checked`]: !props.disabled && innerChecked.value,
        //   [`${prefix.value}-tag--disabled`]: props.disabled,
        // }
      ];
    });

    const checkTagProps = computed(() => {
      const checkedProps: TdTagProps = { theme: 'primary', variant: 'dark', ...props.checkedProps };
      const uncheckedProps: TdTagProps = { theme: 'default', variant: 'light', ...props.uncheckedProps };
      return innerChecked.value ? checkedProps : uncheckedProps;
    });

    const handleClick = ({ e }: { e: MouseEvent }) => {
      if (!props.disabled) {
        props.onClick?.({ e });
        setInnerChecked(!innerChecked.value);
      }
    };

    return () => {
      const tagContent = renderContent('default', 'content');
      return (
        <Tag class={tagClass.value} disabled={props.disabled} {...checkTagProps.value} onClick={handleClick}>
          {tagContent}
        </Tag>
      );
    };
  },
});
