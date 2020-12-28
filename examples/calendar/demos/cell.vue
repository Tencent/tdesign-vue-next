<template>
  <t-calendar>
    <div slot="cell" slot-scope="scope" class="my-cell">
      <div class="cellNum">{{ diaplayNum(scope.data) }}</div>
      <div class="cellAppend"
           :class="getCellAppendCls(scope.data)">
        {{ getDateStr(scope.data) }}
      </div>
    </div>
  </t-calendar>
</template>

<script>
export default {
  methods: {
    getDateStr(cellData) {
      const y = cellData.date.getFullYear();
      const m = cellData.date.getMonth() + 1;
      if (cellData.mode === 'year') {
        return `${y}-${m}`;
      }
      const d = cellData.date.getDate();
      return `${y}-${m}-${d}`;
    },
    diaplayNum(cellData) {
      if (cellData.mode === 'month') {
        return cellData.date.getDate();
      }
      // cellData.mode === 'year'
      return cellData.month;
    },
    getCellAppendCls(cellData) {
      return {
        belongCurrent: cellData.mode === 'year' || cellData.belongTo === 0,
        actived: cellData.isCurDate || cellData.isCurMon,
      };
    },
  },
};
</script>

<style scoped>
.cellNum {
  margin-right: 10px;
  text-align: right;
  font-weight: 700;
  font-size: 16px;
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
