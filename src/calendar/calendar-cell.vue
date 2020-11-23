<template>
  <!-- 高亮：t-is-checked; 灰度：t-is-disabled-->
  <td v-if="item" :class="{
    't-calendar__table-body-cell': true,
    't-is-disabled': disabled,
    't-is-checked': isCurrent
  }"
  >
    <!-- 如果full模式下才支持插槽，就用这段
    <slot v-if="allowSlot" name="cell" :data="item">
      <div class="t-calendar__table-body-cell-value">{{ valueDisplay }}</div>
      <div class="t-calendar__table-body-cell-content">
        <slot v-if="allowSlot" name="cellAppend" :data="item"></slot>
      </div>
    </slot>
    <template v-else>
      <div class="t-calendar__table-body-cell-value">{{ valueDisplay }}</div>
      <div class="t-calendar__table-body-cell-content">
        <slot v-if="allowSlot" name="cellAppend" :data="item"></slot>
      </div>
    </template>
    -->
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
const name = `${prefix}-calendar-cell`;

export default Vue.extend({
  name,
  props: {
    item: {
      type: Object,
      default() {
        return null;
      },
    },
    theme: {
      type: String,
      default() {
        return null;
      },
    },
  },
  data() {
    return { };
  },
  computed: {
    allowSlot(): boolean {
      const tis = this as any;
      return tis.theme === 'full';
    },
    isCurrent(): boolean {
      const tis = this as any;
      return tis.item.mode === 'month' ? tis.item.isCurDate : tis.item.isCurMon;
    },
    disabled(): boolean {
      const tis = this as any;
      return tis.item.mode === 'month' && tis.item.belongTo !== 0;
    },
    valueDisplay(): boolean {
      const tis = this as any;
      return tis.item.mode === 'month' ? tis.item.dateDiaplay : tis.item.monthDiaplay;
    },
  },
});
</script>
