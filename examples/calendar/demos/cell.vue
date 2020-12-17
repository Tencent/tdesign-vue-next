<template>
  <t-calendar>
    <div slot="cell" slot-scope="scope" class="my-cell">
      <span class="num">{{ diaplayNum(scope.data) }}</span>
      <t-tag class="cur-date-tag" shape="mark" theme="danger" v-if="checkIsCur(scope.data)" size="small">
        当前
      </t-tag>
      <t-tag class="cell-date-tag" theme="primary" :effect="getCellEffect(scope.data)" size="small">
        {{ getDateStr(scope.data) }}
      </t-tag>
    </div>
  </t-calendar>
</template>

<script>
export default {
  methods: {
    getDateStr(cellData) {
      const y = cellData.date.getFullYear();
      const m = cellData.date.getMonth();
      const d = cellData.date.getDate();
      return `${y}-${m}-${d}`;
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
    diaplayNum(cellData) {
      if (cellData.mode === 'month') {
        return cellData.date.getDate();
      }
      // cellData.mode === 'year'
      return cellData.month;
    },
    checkIsCur(cellData) {
      if (cellData.mode === 'month') {
        return cellData.isCurDate;
      }
      // cellData.mode === 'year'
      return cellData.isCurMon;
    },
  },
};
</script>

<style scoped>
.my-cell {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 24px 0 0 0;
}
.num {
  font-weight: 700;
  font-size: 18px;
  position: absolute;
  right: 6px;
  top: 6px;
}
.cur-date-tag {
  position: absolute;
  left: 0;
  top: 26px;
}
.cell-date-tag {
  position: absolute;
  right: 6px;
  bottom: 10px;
}
</style>
