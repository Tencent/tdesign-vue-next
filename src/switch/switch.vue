<template>
  <button :class="classes" @click="toggle" :disabled="disabled">
    <span :class="nodeClasses">
      <t-icon-loading v-if="loading"/>
    </span>
    <div :class="contentClasses">
      <template v-if="currentValue === activeValue">
        <template v-if="typeof activeContent === 'string'">
          {{ activeContent }}
        </template>
        <render-component :render="activeContent"
                          v-else-if="typeof activeContent === 'function'" />
        <slot name="label" :value="currentValue" v-else></slot>
      </template>
      <template v-if="currentValue === inactiveValue">
        <template v-if="typeof inactiveContent === 'string'">
          {{ inactiveContent }}
        </template>
        <render-component :render="inactiveContent"
                          v-else-if="typeof inactiveContent === 'function'" />
        <slot name="label" :value="currentValue" v-else></slot>
      </template>

    </div>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import config from '../config';
import CLASSNAMES from '../utils/classnames';
import RenderComponent from '../utils/render-component';
import TIconLoading from '../icon/loading';
import props from '../../types/switch/props';

const { prefix } = config;
const name = `${prefix}-switch`;

export default Vue.extend({
  name,
  components: {
    RenderComponent,
    TIconLoading,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: { ...props },
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
    activeValue():  string|number|boolean {
      if (this.customValue && this.customValue[0]) {
        return this.customValue[0];
      }
      return true;
    },
    inactiveValue(): string|number|boolean {
      if (this.customValue && this.customValue[1]) {
        return this.customValue[1];
      }
      return false;
    },
    activeContent(): string|Function|null {
      if (this.label && this.label[0]) {
        return this.label[0];
      }
      return null;
    },
    inactiveContent(): string|Function|null {
      if (this.label && this.label[1]) {
        return this.label[1];
      }
      return null;
    },
  },
  watch: {
    value(val: string|number|boolean): void{
      if (this.customValue && this.customValue.length === 2 && !this.customValue.includes(val)) {
        throw `value is not in ${JSON.stringify(this.customValue)}`;
      }
      this.currentValue = val;
    },
  },
  methods: {
    handleToggle(): void {
      const checked = this.currentValue === this.activeValue
        ? this.inactiveValue : this.activeValue;

      this.currentValue = checked;
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
