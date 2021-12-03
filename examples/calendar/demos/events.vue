<template>
  <div>
    <t-calendar
      :value="value"
      @click-cell="cellClick"
      @double-click-cell="cellDoubleClick"
      @right-click-cell="cellRightClick"
      @controller-change="controllerChange"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = null;

    const cellClick = (options) => {
      console.log(`鼠标左键单击单元格 ${options.cell.formattedDate}`);
    };

    const cellDoubleClick = (options) => {
      console.log(`鼠标双击单元格 ${options.cell.formattedDate}`);
    };

    const cellRightClick = (options) => {
      console.log(`鼠标右键点击元格 ${options.cell.formattedDate}`);
    };

    const controllerChange = (data) => {
      console.log('控件值变化', data);
    };

    return {
      value,
      cellClick,
      cellDoubleClick,
      cellRightClick,
      controllerChange,
    };
  },
});
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
