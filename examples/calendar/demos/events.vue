<template>
  <div>
    <div style="margin: 12px 0">
      <label>禁用单元格右键菜单：</label>
      <t-switch v-model="preventCellContextmenu"></t-switch>
    </div>
    <t-calendar
      :preventCellContextmenu="preventCellContextmenu"
      @cellClick="onCellClick"
      @cellDoubleClick="onCellDoubleClick"
      @cellRightClick="onCellRightClick"
      @controllerChange="onControllerChange"></t-calendar>

    <t-alert  v-if="!histories || histories.length === 0"
              theme="warning" message="暂无数据，您可以点击一下日历的单元格看看 :)" />
    <t-list v-else class="demo-list">
      <t-list-item v-for="(item, index) in histories" :key="index">
        {{ item }}
        并得到组件传出的参数（您看控制台）...
      </t-list-item>
    </t-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      preventCellContextmenu: false,
      histories: [],
      options: [
        { value: true, label: '禁用' },
        { value: false, label: '不禁用' },
      ],
    };
  },
  methods: {
    onCellClick(cellEmitData) {
      const output = this.getDateStr(cellEmitData.data);
      this.appendHistories(`鼠标左键单击单元格 ${output}`, cellEmitData);
    },
    onCellDoubleClick(cellEmitData) {
      const output = this.getDateStr(cellEmitData.data);
      this.appendHistories(`鼠标双击单元格 ${output}`, cellEmitData);
    },
    onCellRightClick(cellEmitData) {
      const output = this.getDateStr(cellEmitData.data);
      this.appendHistories(`鼠标右键点击元格 ${output}`, cellEmitData);
    },
    onControllerChange(data) {
      this.appendHistories('控件值变化', data);
    },
    appendHistories(content, data) {
      this.histories.unshift(`${content} [${new Date().getTime()}]`);
      console.info(JSON.stringify(data, null, 2));
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

<style scoped>
.demo-list {
  max-height: 130px;
}
</style>
