import { defineComponent, ref, toRefs, computed, inject } from 'vue';
import { renderContent } from '../utils/render-tnode';
import checkboxProps from './props';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import props from './props';
import { ClassName } from '../common';

// hooks
import useVModel from '../hooks/useVModel';
import { useFormDisabled } from '../form/hooks';
import useRipple from '../hooks/useRipple';
import { usePrefixClass, useCommonClassName } from '../config-provider';
import { useConfig } from '../config-provider/useConfig';
import { CheckboxGroupInjectionKey } from './type';

export default defineComponent({
  name: 'TCheckbox',
  inheritAttrs: false,
  props,

  setup(props, { emit }) {
    const formDisabled = useFormDisabled();
    const labelRef = ref<HTMLElement>();
    const COMPONENT_NAME = usePrefixClass('checkbox');
    const { STATUS } = useCommonClassName();

    if (props.needRipple) {
      useRipple(labelRef);
    }
    return {
      COMPONENT_NAME,
      STATUS,
      formDisabled,
      labelRef,
    };
  },

  computed: {
    labelClasses(): ClassName {
      return [
        `${this.COMPONENT_NAME}`,
        {
          [this.STATUS.checked]: this.checked$,
          [this.STATUS.disabled]: this.disabled$,
          [this.STATUS.indeterminate]: this.indeterminate$,
        },
      ];
    },
    disabled$(): boolean {
      if (this.formDisabled) return this.formDisabled;
      if (!this.checkAll && !this.checked$ && this.checkboxGroup?.maxExceeded) {

    const { checked, modelValue } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(
      checked,
      modelValue,
      props.defaultChecked,
      props.onChange,
      emit,
      'checked',
    );

    // inject
    const checkboxGroup = inject(CheckboxGroupInjectionKey, undefined);

    // computed
    const name$ = computed<string>(() => props.name || checkboxGroup?.name);

    const checked$ = computed<boolean>(() => {
      if (props.checkAll) return checkboxGroup?.isCheckAll;
      return checkboxGroup ? !!checkboxGroup.checkedMap[props.value] : innerChecked.value;
    });

    const disabled$ = computed<boolean>(() => {
      if (formDisabled) return formDisabled.value;
      if (!props.checkAll && !checked$.value && checkboxGroup?.maxExceeded) {
        return true;
      }
      if (props.disabled !== undefined) return props.disabled;
      return !!checkboxGroup?.disabled;
    });

    const indeterminate$ = computed<boolean>(() => {
      if (props.checkAll) return checkboxGroup?.indeterminate;
      return props.indeterminate;
    });

    /** 样式计算相关逻辑 */
    const { classPrefix } = useConfig('classPrefix');
    const classPrefixName = `${classPrefix.value}-checkbox`;
    const labelClasses = computed<ClassName>(() => [
      `${classPrefixName}`,
      {
        [`${classPrefix.value}-is-checked`]: checked$.value,
        [`${classPrefix.value}-is-disabled`]: disabled$.value,
        [`${classPrefix.value}-is-indeterminate`]: indeterminate$.value,
      },
    ]);

    // methods
    const handleChange = (e: Event) => {
      const checked = !checked$.value;
      setInnerChecked(checked, { e });
      if (checkboxGroup && checkboxGroup.handleCheckboxChange) {
        checkboxGroup.onCheckedChange({ checked, checkAll: props.checkAll, e, option: props });
      }
    };

    return {
      formDisabled,
      labelRef,
      checkboxGroup,
      name$,
      checked$,
      disabled$,
      indeterminate$,
      classPrefixName,
      labelClasses,
      handleChange,
    };
  },
  render() {
    const { COMPONENT_NAME } = this;
    return (
      <label class={this.labelClasses} {...this.$attrs} ref="labelRef">
        <input
          type="checkbox"
          class={`${COMPONENT_NAME}__former`}
          disabled={this.disabled$}
          readonly={this.readonly}
          indeterminate={this.indeterminate}
          name={this.name$}
          value={this.value}
          checked={this.checked$}
          onChange={this.handleChange}
        ></input>
        <span class={`${COMPONENT_NAME}__input`}></span>
        <span class={`${COMPONENT_NAME}__label`}>{renderContent(this, 'default', 'label')}</span>
      </label>
    );
  },
});
