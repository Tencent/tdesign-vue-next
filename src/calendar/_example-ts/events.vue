<template>
  <t-calendar
    @cell-click="cellClick"
    @cell-double-click="cellDoubleClick"
    @cell-right-click="cellRightClick"
    @month-change="monthChange"
    @controller-change="controllerChange"
  />
</template>

<script lang="tsx" setup>
import { CalendarProps } from 'tdesign-vue-next';
// 单元格单击和双击事件共存的时候，双击事件会触发单击事件（两次），这“可能不是”正确的效果，
// 这种场景下建议对单击事件进行延迟处理（详见下面 cellClick 和 cellDoubleClick 的代码）
let cellClickTimmer: NodeJS.Timeout = null;
const cellClick: CalendarProps['onCellClick'] = (options) => {
  clearTimeout(cellClickTimmer); // 用于在双击事件中取消掉额外触发的一次单击事件
  cellClickTimmer = setTimeout(() => {
    console.log(`鼠标左键单击单元格 ${options.cell.formattedDate}`);
  }, 300);
};
const cellDoubleClick: CalendarProps['onCellDoubleClick'] = (options) => {
  clearTimeout(cellClickTimmer); // 用于在双击事件中取消掉额外触发另外一次单击事件
  console.log(`鼠标双击单元格 ${options.cell.formattedDate}`);
};
const cellRightClick: CalendarProps['onCellRightClick'] = (options) => {
  console.log(`鼠标右键点击元格 ${options.cell.formattedDate}`);
};
const monthChange: CalendarProps['onMonthChange'] = (options) => {
  console.log(`月份切换 ${options.year}-${options.month}`);
};
const controllerChange: CalendarProps['onControllerChange'] = (data) => {
  console.log('控件值变化', data);
};
</script>

<style scoped>
.demo-list {
  max-height: 130px;
  overflow: auto;
  border: 1px solid #eeeeee;
  border-top: none 0;
  border-bottom: none 0;
}
</style>
