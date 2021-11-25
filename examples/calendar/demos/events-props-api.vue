<template>
  <div>
    <div style="margin: 12px 0">
      <label>禁用单元格右键菜单：</label>
      <t-switch v-model="preventCellContextmenu" />
    </div>
    <t-calendar
      :value="value"
      :prevent-cell-contextmenu="preventCellContextmenu"
      :on-click-cell="cellClick"
      :on-double-click-cell="cellDoubleClick"
      :on-right-click-cell="cellRightClick"
      :on-controller-change="controllerChange"
    />

    <t-alert
      v-if="!histories || histories.length === 0"
      theme="warning"
      message="暂无数据，您可以点击一下日历的单元格看看（双击会改变当前选中日期）😀"
    />
    <div v-else class="demo-list">
      <t-list>
        <t-list-item v-for="(item, index) in histories" :key="index">
          【{{ histories.length - index }}】{{ item }}，并得到组件传出的参数（您看控制台）...
        </t-list-item>
      </t-list>
    </div>
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
    const histories = ref([]);
    const value = null;

    const appendHistories = (content, options) => {
      histories.value.unshift(content);
      console.info(options);
    };

    const cellClick = (options) => {
      appendHistories(`鼠标左键单击单元格 ${options.cell.formattedDate}`, options);
    };

    const cellDoubleClick = (options) => {
      appendHistories(`鼠标双击单元格 ${options.cell.formattedDate}`, options);
    };

    const cellRightClick = (options) => {
      appendHistories(`鼠标右键点击元格 ${options.cell.formattedDate}`, options);
    };

    const controllerChange = (data) => {
      appendHistories('控件值变化', data);
    };

    return {
      preventCellContextmenu,
      histories,
      value,
      options,
      cellClick,
      cellDoubleClick,
      cellRightClick,
      controllerChange,
      appendHistories,
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
