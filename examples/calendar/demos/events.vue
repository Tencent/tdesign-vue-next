<template>
  <div>
    <t-calendar
      @cell-click="cellClick"
      @cell-double-click="cellDoubleClick"
      @cell-right-click="cellRightClick"
      @month-change="monthChange"
      @controller-change="controllerChange"
    />
  </div>
</template>

<script setup>
const cellClick = (options) => {
  console.log(`鼠标左键单击单元格 ${options.cell.formattedDate}`);
};

const cellDoubleClick = (options) => {
  console.log(`鼠标双击单元格 ${options.cell.formattedDate}`);
};

const cellRightClick = (options) => {
  console.log(`鼠标右键点击元格 ${options.cell.formattedDate}`);
};

const monthChange = (options) => {
  console.log(`月份切换 ${options.year}-${options.month}`);
};

const controllerChange = (data) => {
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
