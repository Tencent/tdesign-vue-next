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
// 通用库
import { defineComponent } from 'vue';

// 组件的一些常量
import { COMPONENT_NAME } from './const';

// 组件相关的自定义类型
import { CalendarCell } from './type';

export default defineComponent({
  name: `${COMPONENT_NAME}-cell`,
  props: {
    item: {
      type: Object,
      default: (): CalendarCell => null,
    },
    theme: {
      type: String,
      default: (): string => null,
    },
    t: Function,
    locale: Object,
  },
  computed: {
    allowSlot(): boolean {
      return this.theme === 'full';
    },
    disabled(): boolean {
      return this.item.mode === 'month' && this.item.belongTo !== 0;
    },
    valueDisplay(): string {
      if (this.item.mode === 'month') {
        const dateNum = this.item.date.getDate();
        return (dateNum > 9 ? `${dateNum}` : `0${dateNum}`);
      }
      const map = this.t(this.locale.cellMonth).split(',');
      return map[(this.item.date.getMonth()).toString()];
    },
    cellCls(): Record<string, any> {
      return [
        't-calendar__table-body-cell',
        {
          't-is-disabled': this.disabled,
          't-is-checked': this.item.isCurrent,
        }];
    },
  },
});
</script>
