<template>
  <div>
    <!-- 外部控制 -->
    <div style="margin: 12px 0">
      <label>请选择风格：</label>
      <t-select v-model="theme" class="demo-select-base">
        <t-option v-for="item in themeOptions" :key="item.value"
                  :value="item.value" :label="item.label" />
      </t-select>
    </div>

    <t-calendar ref="myCalendar"
                :theme="theme">
      <div class="demo-cell" slot="cell" slot-scope="scope" @click="showCeelData(scope.data)">
        <div class="cellAppend"
             :class="getCellAppendCls(scope.data)">
          {{ getDateStr(scope.data) }}
        </div>
      </div>
    </t-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: 'card',
      themeOptions: [
        { value: 'full', label: '全屏风格' },
        { value: 'card', label: '卡片风格' },
      ],
    };
  },
  methods: {
    getDateStr(cellData) {
      const y = cellData.date.getFullYear();
      const m = cellData.date.getMonth() + 1;
      const d = cellData.date.getDate();
      if (cellData.theme === 'full') {
        return `${y}-${m}-${d}`;
      }

      if (cellData.mode === 'month') {
        return `${d}`;
      }

      return `${y}-${m}`;
    },
    getCellAppendCls(cellData) {
      return {
        belongCurrent: cellData.mode === 'year' || cellData.belongTo === 0,
        actived: cellData.isCurrent,
      };
    },
    showCeelData(cellData) {
      console.info(cellData);
    },
  },
};
</script>

<style scoped>
.demo-select-base {
  width: 200px;
  display: inline-block;
  margin: 0 10px 0 0;
}
.demo-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.cellAppend {
  margin: 10px;
  background-color: #ebf2ff;
  color: #888;
  border-radius: 3px;
  padding: 2px 4px;
}
.cellAppend.belongCurrent {
  color: #0052d9;
}
.cellAppend.actived {
  background-color: #0052d9;
  color: #ebf2ff;
}
</style>
