import { defineComponent, ref, computed, inject } from 'vue';

import cloneDeep from 'lodash/cloneDeep';
import props from './option-props';
import Checkbox from '../checkbox/index';

// hooks
import { useFormDisabled } from '../form/hooks';
import useRipple from '../hooks/useRipple';
import { useContent } from '../hooks/tnode';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { selectInjectKey } from './helper';
import { SelectValue } from './type';

export default defineComponent({
  name: 'TOption',

  props: { ...props, createAble: Boolean, multiple: Boolean, index: Number },
  setup(props) {
    const tSelect = inject(selectInjectKey);
    const formDisabled = useFormDisabled();

    const disabled = computed(() => {
      if (props.multiple) {
        return (
          (tSelect.value.max <= (tSelect.value.selectValue as SelectValue[]).length && tSelect.value.max !== 0) ||
          formDisabled.value
        );
      }
      return formDisabled.value;
    });

    const renderContent = useContent();

    const selectName = usePrefixClass('select');
    const { STATUS, SIZE } = useCommonClassName();
    const liRef = ref<HTMLElement>();

    const isHover = ref(false);

    const isSelected = computed(() => {
      return !props.multiple
        ? tSelect.value.selectValue === props.value
        : (tSelect.value.selectValue as SelectValue[]).includes(props.value);
    });

    const classes = computed(() => [
      `${selectName.value}-option`,
      [SIZE.value[tSelect.value.size]],
      {
        [STATUS.value.disabled]: disabled.value,
        [STATUS.value.selected]: isSelected.value,
        [`${selectName.value}-option__hover`]:
          (isHover.value || tSelect.value.hoverIndex === props.index) && !disabled.value && !isSelected.value,
      },
    ]);

    const labelText = computed(() => props.label || props.value);

    const handleClick = (e: MouseEvent | KeyboardEvent) => {
      if (props.multiple) return;
      e.stopPropagation();

      if (props.createAble) {
        tSelect.value.handleCreate?.(props.value);
        if (tSelect.value.multiple) {
          (tSelect.value.selectValue as SelectValue[]).push(props.value);
          tSelect.value.handleValueChange(tSelect.value.selectValue, {
            e,
            trigger: 'check',
          });
          return;
        }
      }

      tSelect.value.handleValueChange(props.value, { e, trigger: 'check' });
      tSelect.value.handlePopupVisibleChange(false, { e });
    };

    const handleCheckboxClick = (val: boolean, context: { e: MouseEvent | KeyboardEvent }) => {
      const selectValue = cloneDeep(tSelect.value.selectValue) as SelectValue[];
      const valueIndex = selectValue.indexOf(props.value);
      if (valueIndex < 0) {
        selectValue.push(props.value);
      } else {
        selectValue.splice(valueIndex, 1);
      }
      tSelect.value.handleValueChange(selectValue, { e: context.e, trigger: val ? 'check' : 'uncheck' });
      if (!tSelect.value.reserveKeyword) {
        tSelect.value.handlerInputChange('');
      }
    };

    useRipple(liRef);

    return () => {
      const optionChild = renderContent('default', 'content') || labelText.value;
      return (
        <li
          ref="liRef"
          class={classes.value}
          title={`${labelText.value}`}
          onMouseenter={() => (isHover.value = true)}
          onMouseleave={() => (isHover.value = false)}
          onClick={handleClick}
        >
          {tSelect && props.multiple ? (
            <Checkbox
              checked={isSelected.value}
              disabled={disabled.value && !isSelected.value}
              onChange={handleCheckboxClick}
            >
              {optionChild}
            </Checkbox>
          ) : (
            <span>{optionChild}</span>
          )}
        </li>
      );
    };
  },
});
