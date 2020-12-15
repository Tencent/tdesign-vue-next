<template>
  <!-- 高亮：t-is-checked; 灰度：t-is-disabled-->
  <td v-if="item" :class="cellCls">
    <slot name="cell" :data="item">
      <div class="t-calendar__table-body-cell-value">{{ valueDisplay }}</div>
      <div class="t-calendar__table-body-cell-content">
        <slot v-if="allowSlot" name="cellAppend" :data="item"></slot>
      </div>
    </slot>
  </td>
</template>

<script lang="ts">
import Vue from 'vue';
import { prefix } from '../config';

export default Vue.extend({
  name: `${prefix}-calendar-cell`,
  props: {
    item: {
      type: Object,
      default: (): Record<string, any> => null,
    },
    theme: {
      type: String,
      default: (): Record<string, any> => null,
    },
  },
  computed: {
    allowSlot(): boolean {
      return this.theme === 'full';
    },
    isCurrent(): boolean {
      return this.item.mode === 'month' ? this.item.isCurDate : this.item.isCurMon;
    },
    disabled(): boolean {
      return this.item.mode === 'month' && this.item.belongTo !== 0;
    },
    valueDisplay(): boolean {
      return this.item.mode === 'month' ? this.item.dateDiaplay : this.item.monthDiaplay;
    },
    cellCls(): Record<string, any> {
      return [
        't-calendar__table-body-cell',
        {
          't-is-disabled': this.disabled,
          't-is-checked': this.isCurrent,
        }];
    },
  },
});
</script>
