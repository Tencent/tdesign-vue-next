import { defineComponent, ref, toRefs, inject, watch, computed } from 'vue';
import props from '@td/intel/../../vue3/src/checkbox/props';
import useVModel from '../hooks/useVModel';
import useRipple from '../hooks/useRipple';
import { useContent } from '../hooks/tnode';
import { useCommonClassName, usePrefixClass } from '../hooks/useConfig';
import { CheckboxGroupInjectionKey } from './constants';
import useCheckboxLazyLoad from './hooks/useCheckboxLazyLoad';
import useKeyboardEvent from './hooks/useKeyboardEvent';
import { useDisabled } from '../hooks/useDisabled';

export default defineComponent({
  name: 'TCheckbox',
  props: {
    ...props,
    needRipple: Boolean,
    stopLabelTrigger: Boolean,
    index: Number,
    // 传递给 Checkbox 组件额外的数据
    data: Object,
  },

  setup(props) {
    const labelRef = ref<HTMLElement>();
    if (props.needRipple) {
      useRipple(labelRef);
    }
    const { STATUS } = useCommonClassName();

    const { checked, modelValue, lazyLoad } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(
      checked,
      modelValue,
      props.defaultChecked,
      props.onChange,
      'checked',
    );

    const checkboxGroupData = inject(CheckboxGroupInjectionKey, undefined);

    /**
     * Warn: Do not use computed to set tName,
     * otherwise checkbox group will render all checkbox items on every checked or unchecked.
     */
    const tName = ref<string>();
    watch(
      () => [props.name, checkboxGroupData?.value.name].join('_'),
      () => {
        const name = props.name || checkboxGroupData?.value.name;
        if (name) {
          tName.value = name;
        }
      },
      { immediate: true },
    );

    // checked
    const tChecked = ref(false);
    const getChecked = () => {
      const { value, checkAll } = props;
      if (checkAll) return checkboxGroupData?.value.isCheckAll;
      return checkboxGroupData?.value ? checkboxGroupData.value.checkedValues.includes(value) : innerChecked.value;
    };
    watch(
      () => [
        innerChecked.value,
        checkboxGroupData?.value.isCheckAll,
        checkboxGroupData?.value.checkedValues?.join(','),
      ],
      () => {
        tChecked.value = getChecked();
      },
      { immediate: true },
    );

    //  Checkbox.disabled > CheckboxGroup.disabled > Form.disabled
    const beforeDisabled = computed(() => {
      if (!props.checkAll && !tChecked.value && checkboxGroupData?.value.maxExceeded) {
        return true;
      }
      return null;
    });
    const afterDisabled = computed(() => {
      return checkboxGroupData?.value.disabled;
    });
    const isDisabled = useDisabled({ beforeDisabled, afterDisabled });

    const tIndeterminate = ref(false);
    watch(
      () => [props.checkAll, props.indeterminate, checkboxGroupData?.value.indeterminate],
      () => {
        tIndeterminate.value = props.checkAll ? checkboxGroupData?.value.indeterminate : props.indeterminate;
      },
      { immediate: true },
    );

    /** update labelClasses, do not use computed to get labelClasses */
    const COMPONENT_NAME = usePrefixClass('checkbox');
    const labelClasses = ref({});
    watch(
      [tChecked, isDisabled, tIndeterminate],
      () => {
        labelClasses.value = [
          `${COMPONENT_NAME.value}`,
          {
            [STATUS.value.checked]: tChecked.value,
            [STATUS.value.disabled]: isDisabled.value,
            [STATUS.value.indeterminate]: tIndeterminate.value,
          },
        ];
      },
      { immediate: true },
    );

    const handleChange = (e: Event) => {
      if (props.readonly) return;
      const checked = !tChecked.value;
      setInnerChecked(checked, { e });
      if (checkboxGroupData?.value.handleCheckboxChange) {
        checkboxGroupData.value.onCheckedChange({ checked, checkAll: props.checkAll, e, option: props });
      }
    };

    const renderContent = useContent();

    const handleLabelClick = (e: MouseEvent) => {
      // 在tree等组件中使用  阻止label触发checked 与expand冲突
      if (props.stopLabelTrigger) e.preventDefault();
    };

    const { showCheckbox } = useCheckboxLazyLoad(labelRef, lazyLoad);
    const { onCheckboxFocus, onCheckboxBlur } = useKeyboardEvent(handleChange);

    return () => {
      return (
        <label
          ref={labelRef}
          class={labelClasses.value}
          tabindex={isDisabled.value ? undefined : '0'}
          onFocus={onCheckboxFocus}
          onBlur={onCheckboxBlur}
        >
          {!showCheckbox.value
            ? null
            : [
                <input
                  type="checkbox"
                  tabindex="-1"
                  class={`${COMPONENT_NAME.value}__former`}
                  disabled={isDisabled.value}
                  readonly={props.readonly}
                  indeterminate={tIndeterminate.value}
                  name={tName.value}
                  value={props.value ? props.value : undefined}
                  checked={tChecked.value}
                  onChange={handleChange}
                  key="input"
                ></input>,
                <span class={`${COMPONENT_NAME.value}__input`} key="input-span"></span>,
                <span class={`${COMPONENT_NAME.value}__label`} key="label" onClick={handleLabelClick}>
                  {renderContent('default', 'label')}
                </span>,
              ]}
        </label>
      );
    };
  },
});
