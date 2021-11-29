<template>
  <div>
    <div style="margin: 12px 0">
      <label>禁用单元格右键菜单：</label>
      <t-switch v-model="preventCellContextmenu" />
    </div>
    <t-calendar
      :value="value"
      :prevent-cell-contextmenu="preventCellContextmenu"
      @click-cell="cellClick"
      @double-click-cell="cellDoubleClick"
      @right-click-cell="cellRightClick"
      @controller-change="controllerChange"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  { value: true, label: '禁用' },
  { value: false, label: '不禁用' },
];

export default defineComponent({
  setup() {
    const preventCellContextmenu = ref(false);
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
      preventCellContextmenu,
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
