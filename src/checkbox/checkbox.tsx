import { defineComponent, ref } from 'vue';
import { renderContent } from '../utils/render-tnode';
import checkboxProps from './props';
import { ClassName } from '../common';
import { emitEvent } from '../utils/event';
import { TdCheckboxProps } from './type';

// hooks
import { useFormDisabled } from '../form/hooks';
import useRipple from '../hooks/useRipple';
import { usePrefixClass, useCommonClassName } from '../config-provider';

export default defineComponent({
  name: 'TCheckbox',
  inject: {
    checkboxGroup: { default: undefined },
  },

  inheritAttrs: false,
  props: { ...checkboxProps, needRipple: Boolean },
  emits: ['change', 'checked-change'],

  setup(props) {
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
        return true;
      }
      if (this.disabled !== undefined) return this.disabled;
      return !!this.checkboxGroup?.disabled;
    },
    name$(): string {
      return this.name || this.checkboxGroup?.name;
    },
    checked$(): boolean {
      if (this.checkAll) return this.checkboxGroup?.isCheckAll;
      return this.checkboxGroup ? !!this.checkboxGroup.checkedMap[this.value] : this.checked;
    },
    indeterminate$(): boolean {
      if (this.checkAll) return this.checkboxGroup?.indeterminate;
      return this.indeterminate;
    },
  },

  methods: {
    handleChange(e: Event) {
      const value = !this.checked$;
      emitEvent<Parameters<TdCheckboxProps['onChange']>>(this, 'change', value, { e });
      e.stopPropagation();
      if (this.checkboxGroup && this.checkboxGroup.handleCheckboxChange && !this.isCheckAllOption) {
        this.checkboxGroup.onCheckedChange({ checked: value, checkAll: this.checkAll, e, option: this.$props });
      }
    },
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
