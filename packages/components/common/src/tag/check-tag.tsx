import { defineComponent, computed, toRefs } from 'vue';
import props from './check-tag-props';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import useVModel from '../hooks/useVModel';
import { useContent } from '../hooks/tnode';
import Tag from './tag';
import { TdCheckTagProps, TdTagProps } from '@td/intel/tag/type';
import { ENTER_REG, SPACE_REG } from '../_common/js/common';

export default defineComponent({
  name: 'TCheckTag',

  props,

  setup(props: TdCheckTagProps) {
    const componentName = usePrefixClass('tag');
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
        `${componentName.value}`,
        `${componentName.value}--check`,
        SIZE.value[props.size],
        {
          [`${componentName.value}--checked`]: innerChecked.value,
          [`${componentName.value}--disabled`]: props.disabled,
        },
      ];
    });

    const checkTagProps = computed(() => {
      const checkedProps: TdTagProps = { theme: 'primary', ...props.checkedProps };
      const uncheckedProps: TdTagProps = { ...props.uncheckedProps };
      return innerChecked.value ? checkedProps : uncheckedProps;
    });

    const handleClick = ({ e }: { e: MouseEvent }) => {
      if (!props.disabled) {
        props.onClick?.({ e });
        setInnerChecked(!innerChecked.value, { e, value: props.value });
      }
    };

    const keyboardEventListener = (e: KeyboardEvent) => {
      const code = e.code || e.key?.trim();
      const isCheckedCode = SPACE_REG.test(code) || ENTER_REG.test(code);
      if (isCheckedCode) {
        e.preventDefault();
        setInnerChecked(!innerChecked.value, { e, value: props.value });
      }
    };

    const onCheckboxFocus = (e: FocusEvent) => {
      e.currentTarget.addEventListener('keydown', keyboardEventListener);
    };

    const onCheckboxBlur = (e: FocusEvent) => {
      e.currentTarget.removeEventListener('keydown', keyboardEventListener);
    };

    return () => {
      const tagContent = renderContent('default', 'content');
      return (
        <Tag
          class={tagClass.value}
          disabled={props.disabled}
          tabindex={props.disabled ? undefined : '0'}
          onFocus={onCheckboxFocus}
          onBlur={onCheckboxBlur}
          {...checkTagProps.value}
          onClick={handleClick}
        >
          {tagContent}
        </Tag>
      );
    };
  },
});
