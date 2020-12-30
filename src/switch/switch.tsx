import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import TIconLoading from '../icon/loading';
import { SwitchValue } from '../../types/switch/TdSwitchProps';
import props from '../../types/switch/props';

const name = `${prefix}-switch`;

export default Vue.extend({
  name,
  props: { ...props },
  model: {
    prop: 'value',
    event: 'change',
  },
  data() {
    return {
      currentValue: this.defaultValue,
    };
  },
  computed: {
    classes(): ClassName {
      return [
        `${name}`,
        CLASSNAMES.SIZE[this.size],
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
          [CLASSNAMES.STATUS.loading]: this.loading,
          [CLASSNAMES.STATUS.checked]: this.currentValue === this.activeValue,
        },
      ];
    },
    nodeClasses(): ClassName {
      return [
        `${name}__handle`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
          [CLASSNAMES.STATUS.loading]: this.loading,
        },
      ];
    },
    contentClasses(): ClassName {
      return [
        `${name}__content`,
        CLASSNAMES.SIZE[this.size],
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
        },
      ];
    },
    activeValue(): SwitchValue {
      if (this.customValue && this.customValue.length > 0) {
        return this.customValue[0];
      }
      return true;
    },
    inactiveValue(): SwitchValue {
      if (this.customValue && this.customValue.length > 1) {
        return this.customValue[1];
      }
      return false;
    },
    content(): TNodeReturnValue {
      if (this.$scopedSlots.label) {
        return this.$scopedSlots.label({ value: this.currentValue });
      }
      if (typeof this.label === 'function') {
        return this.label(this.$createElement, { value: this.currentValue });
      }
      if (typeof this.label === 'string') {
        return this.label;
      }
      if (this.label instanceof Array) {
        const label = this.currentValue === this.activeValue ? this.label[0] : this.label[1];
        if (!label) return;
        if (typeof label === 'string') {
          return label;
        }
        if (typeof label === 'function') {
          return label(this.$createElement);
        }
        return null;
      }
      return null;
    },
    _value(): SwitchValue {
      return this.value || this.currentValue;
    },
  },
  watch: {
    _value: {
      handler(val: SwitchValue): void {
        if (this.customValue && this.customValue.length && !this.customValue.includes(val)) {
          throw `value is not in ${JSON.stringify(this.customValue)}`;
        }
        this.currentValue = val;
      },
      immediate: true,
    },
  },
  methods: {
    handleToggle(): void {
      const checked = this.currentValue === this.activeValue
        ? this.inactiveValue : this.activeValue;
      this.currentValue = checked;
      typeof this.onChange === 'function' && this.onChange(this.currentValue);
      this.$emit('change', this.currentValue);
    },
    toggle(event: MouseEvent): void {
      event.preventDefault();
      if (this.disabled) {
        return;
      }
      this.handleToggle();
    },
  },
  render(): VNode {
    const {
      loading,
      disabled,
      content,
      nodeClasses,
      classes,
      toggle,
      contentClasses } = this;

    let switchContent: TNodeReturnValue;
    let loadingContent: TNodeReturnValue;

    if (loading) {
      loadingContent = <TIconLoading/>;
    } else if (content) {
      switchContent = content;
    }

    return (
      <button
        class={classes}
        disabled={disabled}
        onClick={toggle}
        >
          <span class={nodeClasses}>{loadingContent}</span>
          <div class={contentClasses}>{switchContent}</div>
      </button>
    );
  },
});
