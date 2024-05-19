import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref } from '@td/adapter-vue';

import { useCommonClassName, useDisabled, usePrefixClass, useRipple } from '@td/adapter-hooks';
import props from '@td/intel/components/select/option-props';
import type { SelectValue } from '@td/intel/components/select/type';
import { Checkbox } from '@td/component';

// hooks
import { getNewMultipleValue, selectInjectKey } from './helper';

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
    checkAll: Boolean,
  },
  emits: ['row-mounted'],

  setup(props, context) {
    const selectProvider = inject(selectInjectKey);
    const formDisabled = useDisabled();

    const isReachMax = computed(
      () =>
        selectProvider.value.max !== 0
        && selectProvider.value.max <= (selectProvider.value.selectValue as SelectValue[]).length,
    );
    const disabled = computed(
      () =>
        formDisabled.value
        || (props.multiple && isReachMax.value && !isSelected.value && !selectProvider.value.isCheckAll),
    );

    const renderContent = useContent();

    const selectName = usePrefixClass('select');
    const { STATUS, SIZE } = useCommonClassName();
    const liRef = ref<HTMLElement>();

    const isHover = ref(false);

    const isSelected = computed(() => {
      if (selectProvider.value.isCheckAll && !props.disabled) {
        return true;
      }
      return !props.multiple
        ? selectProvider.value.selectValue === props.value
        : (selectProvider.value.selectValue as SelectValue[]).includes(props.value);
    });

    const isIndeterminate = computed(() => {
      if (!props.checkAll) {
        return false;
      }
      return selectProvider.value.indeterminate;
    });

    const classes = computed(() => [
      `${selectName.value}-option`,
      [SIZE.value[selectProvider.value.size]],
      {
        [STATUS.value.disabled]: disabled.value,
        [STATUS.value.selected]: isSelected.value,
        [`${selectName.value}-option__hover`]:
          (isHover.value || selectProvider.value.hoverIndex === props.index) && !disabled.value,
      },
    ]);

    const labelText = computed(() => props.label || props.value);

    const handleClick = (e: MouseEvent | KeyboardEvent) => {
      if (props.disabled || disabled.value) {
        return;
      }
      if (props.multiple) {
        handleCheckboxClick(!isSelected.value, { e });
        e.preventDefault();
        return;
      }

      if (props.createAble) {
        selectProvider.value.handleCreate?.(props.value);
        if (selectProvider.value.multiple) {
          selectProvider.value.handleValueChange(
            [...(selectProvider.value.selectValue as SelectValue[]), props.value],
            {
              selectedOptions: selectProvider.value.getSelectedOptions(),
              trigger: 'check',
              e,
            },
          );
          return;
        }
      }
      const selectedOptions = selectProvider.value.getSelectedOptions(props.value);
      selectProvider.value.handleValueChange(props.value, {
        option: selectedOptions?.[0],
        selectedOptions,
        trigger: 'check',
        e,
      });
      selectProvider.value.handlePopupVisibleChange(false, { e });
    };

    const handleCheckboxClick = (val: boolean, context: { e: MouseEvent | KeyboardEvent }) => {
      if (props.checkAll) {
        selectProvider.value.onCheckAllChange(val);
        return;
      }
      const newValue = getNewMultipleValue(selectProvider.value.selectValue as SelectValue[], props.value);
      const selectedOptions = selectProvider.value.getSelectedOptions(newValue.value);

      selectProvider.value.handleValueChange(newValue.value, {
        option: selectedOptions.find(v => v.value === props.value),
        selectedOptions,
        trigger: val ? 'check' : 'uncheck',
        e: context.e,
      });
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
          title={props.title || `${labelText.value}`}
          onMouseenter={() => (isHover.value = true)}
          onMouseleave={() => (isHover.value = false)}
          onClick={handleClick}
        >
          {selectProvider && props.multiple
            ? (
              <Checkbox
                checked={isSelected.value}
                disabled={disabled.value}
                onChange={handleCheckboxClick}
                indeterminate={isIndeterminate.value}
              >
                {optionChild}
              </Checkbox>
              )
            : (
              <span>{optionChild}</span>
              )}
        </li>
      );
    };
  },
});
