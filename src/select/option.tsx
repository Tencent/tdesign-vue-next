import { defineComponent, ref, computed, toRefs, inject } from 'vue';

import props from './option-props';
import Checkbox from '../checkbox/index';

// hooks
import { useFormDisabled } from '../form/hooks';
import useRipple from '../hooks/useRipple';
import { useContent } from '../hooks/tnode';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { selectInjectKey } from './constants';
import { SelectValue } from './type';

export default defineComponent({
  name: 'TOption',

  props: { ...props },
  setup(props) {
    const tSelect = inject(selectInjectKey);

    const disabled = useFormDisabled();
    const renderContent = useContent();

    const selectName = usePrefixClass('select');
    const { STATUS, SIZE } = useCommonClassName();
    const liRef = ref<HTMLElement>();

    const isHover = ref(false);
    const formDisabled = ref(undefined);
    const { value, label } = toRefs(props);

    const tDisabled = computed(() => formDisabled.value || disabled.value);

    const selected = computed(() => {
      return !tSelect.value.multiple
        ? tSelect.value.selectValue === value.value
        : (tSelect.value.selectValue as SelectValue[]).includes(value.value);
    });

    const classes = computed(() => [
      `${selectName.value}-option`,
      {
        [STATUS.value.disabled]: tDisabled.value,
        [STATUS.value.selected]: selected.value,
        [SIZE.value[tSelect.value.size]]: tSelect && tSelect.value,
        [`${selectName.value}-option__hover`]: isHover.value,
      },
    ]);

    const labelText = computed(() => label.value || value.value);

    const select = (e: MouseEvent | KeyboardEvent) => {
      e.stopPropagation();

      tSelect.value.onOptionClick(value.value, e);
    };

    useRipple(liRef);

    return () => {
      const children = renderContent('default', 'content');
      const optionChild = children || labelText.value;
      return (
        <li
          ref="liRef"
          class={classes.value}
          title={`${labelText.value}`}
          onMouseenter={() => (isHover.value = true)}
          onMouseleave={() => (isHover.value = false)}
          onClick={(e: MouseEvent) => {
            e.preventDefault();
            select(e);
          }}
        >
          {tSelect && tSelect.value.multiple ? (
            <Checkbox checked={selected.value} disabled={disabled.value}>
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
