<template>
  <!-- 高亮：t-is-checked; 灰度：t-is-disabled-->
  <td v-if="item" :class="cellCls" @click="clickCell" @dblclick="dblclick" @contextmenu="contextmenuClick">
    <slot name="cell" :data="item">
      <div class="t-calendar__table-body-cell-value">{{ valueDisplay }}</div>
      <div class="t-calendar__table-body-cell-content">
        <slot v-if="allowSlot" name="cellAppend" :data="item"></slot>
      </div>
    </slot>
  </td>
</template>

<script lang="ts">
import dayjs from 'dayjs';

// 通用库
import { defineComponent } from 'vue';

// 组件的一些常量
import { COMPONENT_NAME } from './const';

// 组件相关的自定义类型
import { CalendarCell } from './type';

export default defineComponent({
  name: `${COMPONENT_NAME}-cell`,
  inheritAttrs: false,
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
  emits: ['click', 'dblclick', 'rightClick'],
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
      const {
        mode, date, formattedDate, isCurrent,
      } = this.item;
      const isNow = mode === 'year' ? new Date().getMonth() === date.getMonth() : formattedDate === dayjs().format('YYYY-MM-DD');
      return [
        't-calendar__table-body-cell',
        {
          't-is-disabled': this.disabled,
          't-is-checked': isCurrent,
          't-is-now': isNow,
        }];
    },
  },
  methods: {
    clickCell(e: MouseEvent) {
      this.$emit('click', e);
    },
    dblclick(e: MouseEvent) {
      this.$emit('dblclick', e);
    },
    contextmenuClick(e: MouseEvent) {
      this.$emit('rightClick', e);
    },
  },
});
</script>
