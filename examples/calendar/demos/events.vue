<template>
  <t-calendar
    preventCellContextmenu
    @cellClick="onCellClick"
    @cellDoubleClick="onCellDoubleClick"
    @cellRightClick="onCellRightClick"
    @controllerChange="onControllerChange"></t-calendar>
</template>

<script>
export default {
  methods: {
    onCellClick(cellData) {
      const output = this.getDateStr(cellData.data);
      console.info('鼠标左键单击单元格', output);
    },
    onCellDoubleClick(cellData) {
      const output = this.getDateStr(cellData.data);
      console.info('鼠标双击单元格', output);
    },
    onCellRightClick(cellData) {
      const output = this.getDateStr(cellData.data);
      console.info('鼠标右键点击元格', output);
    },
    onControllerChange(data) {
      console.info('控件值变化', data);
    },
    getDateStr(date) {
      const y = date.getFullYear();
      const m = date.getMonth();
      const d = date.getDate();
      const output = `${y}-${m}-${d}`;
      return output;
    },
  },
};
</script>
