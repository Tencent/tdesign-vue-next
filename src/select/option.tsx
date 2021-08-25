import { defineComponent, VNode } from 'vue';
import { renderTNodeJSX } from '../utils/render-tnode';
import get from 'lodash/get';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import props from './option-props';
import { Options } from './type';
import Checkbox from '../checkbox/index';
import { ClassName } from '../common';

const name = `${prefix}-option`;
const selectName = `${prefix}-select`;

export default defineComponent({
  name,
  components: {
    TCheckbox: Checkbox,
  },
  inject: {
    tSelect: {
      default: undefined,
    },
  },
  props: { ...props },
  data() {
    return {
      isHover: false,
    };
  },
  computed: {
    multiLimitDisabled(): boolean {
      if (this.tSelect && this.tSelect.multiple && this.tSelect.max) {
        if (
          this.tSelect.value instanceof Array
          && this.tSelect.value.indexOf(this.value) === -1
          && this.tSelect.max <= this.tSelect.value.length
        ) {
          return true;
        }
      }
      return false;
    },
    classes(): ClassName {
      return [
        `${prefix}-select-option`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled || this.multiLimitDisabled,
          [CLASSNAMES.STATUS.selected]: this.selected,
          [`${CLASSNAMES.STATUS.selected}-multiple`]: this.tSelect && this.tSelect.multiple,
          [CLASSNAMES.SIZE[this.tSelect && this.tSelect.size]]: this.tSelect && this.tSelect.size,
        },
      ];
    },
    show(): boolean {
      if (this.tSelect) {
        const target = this.tSelect.displayOptions.filter((option: Options) => get(option, this.tSelect.realValue) === this.value);
        const isCreated = this.tSelect.creatable && this.value === this.tSelect.searchInput;
        return target.length > 0 || isCreated;
      }
      return false;
    },
    labelText(): string {
      return this.label || String(this.value);
    },
    selected(): boolean {
      let flag = false;
      if (!this.tSelect) return false;
      if (this.tSelect.value instanceof Array) {
        if (this.tSelect.labelInValue) {
          flag = this.tSelect.value.map((item: string|number|Options) => get(item, this.tSelect.realValue)).indexOf(this.value) !== -1;
        } else {
          flag = this.tSelect.value.indexOf(this.value) !== -1;
        }
      } else if (typeof this.tSelect.value === 'object') {
        flag = get(this.tSelect.value, this.tSelect.realValue) === this.value;
      } else {
        flag = this.tSelect.value === this.value;
      }
      return flag;
    },
  },
  mounted() {
    this.tSelect && this.tSelect.getOptions(this);
  },
  methods: {
    select(e: MouseEvent) {
      e.stopPropagation();
      if (this.disabled || this.multiLimitDisabled) {
        return false;
      }
      const parent = this.$el.parentNode as HTMLElement;
      if (parent && parent.className.indexOf(`${selectName}-create-option`) !== -1) {
        this.tSelect && this.tSelect.createOption(this.value);
      }
      this.tSelect && this.tSelect.onOptionClick(this.value, e);
    },
    mouseEvent(v: boolean) {
      this.isHover = v;
    },
  },
  render(): VNode {
    const {
      classes, labelText, selected, disabled, multiLimitDisabled, show,
    } = this;
    const children = renderTNodeJSX(this, 'default');
    const optionChild = children || labelText;
    return (
      <li
        v-show={show}
        class={classes}
        title={labelText}
        onMouseenter={ this.mouseEvent.bind(true) }
        onMouseleave={ this.mouseEvent.bind(false) }
        onClick={ (e: MouseEvent) => {
          e.preventDefault();
          this.select(e);
        } }
      >
        {
          this.tSelect && this.tSelect.multiple
            ? <t-checkbox
                checked={selected}
                disabled={disabled || multiLimitDisabled}
              >
                {optionChild}
              </t-checkbox>
            : optionChild
        }
      </li>
    );
  },
});
