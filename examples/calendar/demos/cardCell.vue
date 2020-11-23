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
                :theme="theme"
                :isShowWeekendDefault="isShowWeekendDefault">
      <div class="demo-cell" slot="cell" slot-scope="scope" @click="showCeelData(scope.data)">
        <t-tag shape="round" theme="success" :effect="getCellEffect(scope.data)">
          {{ getDateStr(scope.data) }}
        </t-tag>
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
      const m = cellData.date.getMonth();
      const d = cellData.date.getDate();
      if (cellData.theme === 'full') {
        return `${y}-${m}-${d}`;
      }

      if (cellData.mode === 'month') {
        return `${d}`;
      }

      return `${y}-${m}`;
    },
    getCellEffect(cellData) {
      let re = 'light';
      if (cellData.mode === 'month') {
        if (cellData.belongTo === 0) {
          if (cellData.isCurDate) {
            re = 'dark';
          }
        } else {
          re = 'plain';
        }
      } else { // cellData.mode === 'year'
        if (cellData.isCurYear) {
          if (cellData.isCurMon) {
            re = 'dark';
          }
        } else {
          re = 'plain';
        }
      }
      return re;
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
</style>
