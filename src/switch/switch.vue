<template>
  <button :class="classes" @click="toggle" :disabled="disabled">
    <span :class="nodeClasses">
      <i v-if="loading" class="t-icon t-icon-loading"></i>
    </span>
    <div :class="contentClasses">
      <slot name="open" v-if="currentValue === activeValue"></slot>
      <slot name="close" v-if="currentValue === inactiveValue"></slot>
    </div>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import config from '../config';
import CLASSNAMES from '../utils/classnames';
const { prefix } = config;
const name = `${prefix}-switch`;

export default Vue.extend({
  name,
  props: {
    /**
     * @description 当前选择的值
     * @attribute value
     */
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    /**
     * @description 打开的值
     * @attribute activeValue
     */
    activeValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    /**
     * @description 关闭的值
     * @attribute inactiveValue
     */
    inactiveValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    /**
     * @description 是否禁用
     * @attribute disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 是否加载
     * @attribute loading
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
    * @description 大小
    * @attribute size
    */
    size: {
      type: String,
      default: 'default',
      validator(v: string): boolean {
        return ['large', 'default', 'small'].indexOf(v) > -1;
      },
    },
  },
  data() {
    return {
      currentValue: this.value,
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
          [`${prefix}-is-checked`]: this.currentValue === this.activeValue,
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
  },
  watch: {
    value(val: string|number|boolean): void{
      if (val !== this.activeValue && val !== this.inactiveValue) {
        throw 'Value should be activeValue or inactiveValue.';
      }
      this.currentValue = val;
    },
  },
  methods: {
    handleToggle(): void {
      const checked = this.currentValue === this.activeValue
        ? this.inactiveValue : this.activeValue;

      this.$emit('click', this.currentValue);
      this.currentValue = checked;
      this.$emit('input', checked);
      this.$emit('change', checked);
    },

    toggle(event: Event): void {
      event.preventDefault();
      if (this.disabled) {
        return;
      }
      this.handleToggle();
    },
  },
});

</script>
