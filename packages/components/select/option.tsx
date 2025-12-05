import { defineComponent, ref, computed, inject, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue';

import props from './option-props';
import Checkbox from '../checkbox/index';

// hooks
import { useRipple, useContent, useDisabled, usePrefixClass, useCommonClassName } from '@tdesign/shared-hooks';

import { getNewMultipleValue } from './utils';
import { selectInjectKey } from './consts';
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
    checkAll: Boolean,
  },
  emits: ['row-mounted'],

  setup(props, context) {
    const selectProvider = inject(selectInjectKey);
    const formDisabled = useDisabled();
    const { vnode } = getCurrentInstance();

    const isReachMax = computed(
      () =>
        selectProvider.value.max !== 0 &&
        selectProvider.value.max <= (selectProvider.value.selectValue as SelectValue[]).length,
    );
    const disabled = computed(
      () =>
        formDisabled.value ||
        (props.multiple && isReachMax.value && !isSelected.value && !selectProvider.value.isCheckAll),
    );

    const renderContent = useContent();

    const selectName = usePrefixClass('select');
    const { STATUS, SIZE } = useCommonClassName();
    const liRef = ref<HTMLElement>();

    const isHover = ref(false);

    const isSelected = computed(() => {
      if (selectProvider.value.isCheckAll && !props.disabled) return true;
      return !props.multiple
        ? selectProvider.value.selectValue === props.value
        : (selectProvider.value.selectValue as SelectValue[]).includes(props.value);
    });

    const isIndeterminate = computed(() => {
      if (!props.checkAll) return false;
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
      if (props.disabled || disabled.value) return;
      if (props.multiple) {
        handleCheckboxClick(!isSelected.value, { e });
        e.preventDefault();
        return;
      }

      if (props.createAble) {
        selectProvider.value.handleCreate?.(props.value);
        // When creating a new option with async onCreate (e.g., setTimeout to check with backend),
        // construct the option from props since the option may not exist in optionsList yet
        const createdOption = { value: props.value, label: labelText.value };
        if (selectProvider.value.multiple) {
          const currentSelectedOptions = selectProvider.value.getSelectedOptions();
          selectProvider.value.handleValueChange(
            [...(selectProvider.value.selectValue as SelectValue[]), props.value],
            {
              option: createdOption,
              selectedOptions: [...currentSelectedOptions, createdOption],
              trigger: 'check',
              e,
            },
          );
          return;
        }
        selectProvider.value.handleValueChange(props.value, {
          option: createdOption,
          selectedOptions: [createdOption],
          trigger: 'check',
          e,
        });
        selectProvider.value.handlePopupVisibleChange(false, { e });
        selectProvider.value.emitBlur(e);
        return;
      }
      const selectedOptions = selectProvider.value.getSelectedOptions(props.value);
      selectProvider.value.handleValueChange(props.value, {
        option: selectedOptions?.[0],
        selectedOptions: selectedOptions,
        trigger: 'check',
        e,
      });
      selectProvider.value.handlePopupVisibleChange(false, { e });
      selectProvider.value.emitBlur(e);
    };

    const handleCheckboxClick = (val: boolean, context: { e: MouseEvent | KeyboardEvent }) => {
      if (props.checkAll) {
        selectProvider.value.onCheckAllChange(val);
        return;
      }
      const newValue = getNewMultipleValue(selectProvider.value.selectValue as SelectValue[], props.value);
      const selectedOptions = selectProvider.value.getSelectedOptions(newValue.value);

      const currentOption = selectProvider.value.getSelectedOptions(props.value)?.[0];
      selectProvider.value.handleValueChange(newValue.value, {
        option: currentOption,
        selectedOptions,
        trigger: val ? 'check' : 'uncheck',
        e: context.e,
      });
    };

    const renderTitle = () => {
      const vProps = vnode.props || {};
      // 如果设置了title 说明希望自己控制title的展示
      if (Reflect.has(vProps, 'title')) {
        return props.title;
      }
      if (typeof labelText.value === 'string') return labelText.value;

      return null;
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
          title={renderTitle()}
          onMouseenter={() => (isHover.value = true)}
          onMouseleave={() => (isHover.value = false)}
          onClick={handleClick}
        >
          {selectProvider && props.multiple ? (
            <Checkbox
              checked={isSelected.value}
              disabled={disabled.value}
              onChange={handleCheckboxClick}
              indeterminate={isIndeterminate.value}
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
