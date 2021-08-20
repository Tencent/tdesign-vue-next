<template>
  <div>
    <div style="margin: 12px 0">
      <label>禁用单元格右键菜单：</label>
      <t-switch v-model="preventCellContextmenu"></t-switch>
    </div>
    <t-calendar
      :value="value"
      :preventCellContextmenu="preventCellContextmenu"
      :onClickCell="cellClick"
      :onDoubleClickCell="cellDoubleClick"
      :onRightClickCell="cellRightClick"
      :onControllerChange="controllerChange"
    ></t-calendar>

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
export default {
  data() {
    return {
      preventCellContextmenu: false,
      histories: [],
      value: null,
      options: [
        { value: true, label: '禁用' },
        { value: false, label: '不禁用' },
      ],
    };
  },
  methods: {
    cellClick(options) {
      this.appendHistories(`鼠标左键单击单元格 ${options.cell.formattedDate}`, options);
    },
    cellDoubleClick(options) {
      this.appendHistories(`鼠标双击单元格 ${options.cell.formattedDate}`, options);
    },
    cellRightClick(options) {
      this.appendHistories(`鼠标右键点击元格 ${options.cell.formattedDate}`, options);
    },
    controllerChange(data) {
      this.appendHistories('控件值变化', data);
    },
    appendHistories(content, options) {
      this.histories.unshift(content);
      console.info(options);
    },
  },
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
