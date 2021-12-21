import { defineComponent } from 'vue';
import { renderContent } from '../utils/render-tnode';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import checkboxProps from './props';
import { ClassName } from '../common';
import { emitEvent } from '../utils/event';
import { TdCheckboxProps } from './type';

const name = `${prefix}-checkbox`;

export default defineComponent({
  name: 'TCheckbox',
  inject: {
    checkboxGroup: { default: undefined },
  },
  inheritAttrs: false,
  props: { ...checkboxProps },
  emits: ['change', 'checked-change'],
  computed: {
    labelClasses(): ClassName {
      const { class: className } = this.$attrs;
      return [
        `${name}`,
        `${className}`,
        {
          [CLASSNAMES.STATUS.checked]: this.checked$,
          [CLASSNAMES.STATUS.disabled]: this.disabled$,
          [CLASSNAMES.STATUS.indeterminate]: this.indeterminate$,
        },
      ];
    },
    disabled$(): boolean {
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
    return (
      <label class={this.labelClasses} {...this.$attrs}>
        <input
          type="checkbox"
          class={`${name}__former`}
          disabled={this.disabled$}
          readonly={this.readonly}
          indeterminate={this.indeterminate}
          name={this.name$}
          value={this.value}
          checked={this.checked$}
          onChange={this.handleChange}
        ></input>
        <span class={`${name}__input`}></span>
        <span class={`${name}__label`}>{renderContent(this, 'default', 'label')}</span>
      </label>
    );
  },
});
