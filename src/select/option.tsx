import { defineComponent, ref, computed, inject, reactive, onMounted, onBeforeUnmount, toRefs, Ref } from 'vue';

import props from './option-props';
import Checkbox from '../checkbox/index';

// hooks
import { useFormDisabled } from '../form/hooks';
import useRipple from '../hooks/useRipple';
import { useContent } from '../hooks/tnode';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { selectInjectKey, getNewMultipleValue } from './helper';
import { SelectValue } from './type';

export default defineComponent({
  name: 'TOption',

  props: {
    ...props,
    createAble: Boolean,
    multiple: Boolean,
    index: Number,
    rowIndex: Number,
    trs: Map,
    scrollType: String,
    isVirtual: Boolean,
    bufferSize: Number,
  },
  emits: ['row-mounted'],

  setup(props, context) {
    const selectProvider = inject(selectInjectKey);
    const formDisabled = useFormDisabled();

    const optionNode = ref(null);

    const disabled = computed(
      () =>
        formDisabled.value ||
        (props.multiple &&
          selectProvider.value.max <= (selectProvider.value.selectValue as SelectValue[]).length &&
          selectProvider.value.max !== 0),
    );

    const renderContent = useContent();

    const selectName = usePrefixClass('select');
    const { STATUS, SIZE } = useCommonClassName();
    const liRef = ref<HTMLElement>();

    const isHover = ref(false);

    const isSelected = computed(() => {
      return !props.multiple
        ? selectProvider.value.selectValue === props.value
        : (selectProvider.value.selectValue as SelectValue[]).includes(props.value);
    });

    const classes = computed(() => [
      `${selectName.value}-option`,
      [SIZE.value[selectProvider.value.size]],
      {
        [STATUS.value.disabled]: disabled.value,
        [STATUS.value.selected]: isSelected.value,
        [`${selectName.value}-option__hover`]:
          (isHover.value || selectProvider.value.hoverIndex === props.index) && !disabled.value && !isSelected.value,
      },
    ]);

    const labelText = computed(() => props.label || props.value);

    const handleClick = (e: MouseEvent | KeyboardEvent) => {
      if (props.multiple || props.disabled) return;
      e.stopPropagation();

      if (props.createAble) {
        selectProvider.value.handleCreate?.(props.value);
        if (selectProvider.value.multiple) {
          (selectProvider.value.selectValue as SelectValue[]).push(props.value);
          selectProvider.value.handleValueChange(selectProvider.value.selectValue, {
            e,
            trigger: 'check',
          });
          return;
        }
      }

      selectProvider.value.handleValueChange(props.value, { e, trigger: 'check' });
      selectProvider.value.handlePopupVisibleChange(false, { e });
    };

    const handleCheckboxClick = (val: boolean, context: { e: MouseEvent | KeyboardEvent }) => {
      const newValue = getNewMultipleValue(selectProvider.value.selectValue as SelectValue[], props.value);
      selectProvider.value.handleValueChange(newValue.value, { e: context.e, trigger: val ? 'check' : 'uncheck' });
      if (!selectProvider.value.reserveKeyword) {
        selectProvider.value.handlerInputChange('');
      }
    };

    // 处理虚拟滚动节点挂载
    onMounted(() => {
      const { trs, rowIndex, isVirtual } = props;
      if (isVirtual) {
        trs.set(rowIndex, liRef.value);
        context.emit('row-mounted');
      }
    });

    // 处理虚拟滚动节点移除
    onBeforeUnmount(() => {
      if (props.isVirtual) {
        const { trs, rowIndex } = props;
        trs.delete(rowIndex);
      }
    });

    useRipple(liRef);

    return () => {
      const optionChild = renderContent('default', 'content') || labelText.value;

      return (
        <li
          ref={liRef}
          class={classes.value}
          title={`${labelText.value}`}
          onMouseenter={() => (isHover.value = true)}
          onMouseleave={() => (isHover.value = false)}
          onClick={handleClick}
        >
          {selectProvider && props.multiple ? (
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
