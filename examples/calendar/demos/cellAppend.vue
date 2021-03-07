<template>
  <t-calendar>
    <div slot="cellAppend" slot-scope="scope">
      <div class="cellAppend" @click="showCellData(scope.data)"
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
    getCellAppendCls(cellData) {
      return {
        belongCurrent: cellData.mode === 'year' || cellData.belongTo === 0,
        actived: cellData.isCurrent,
      };
    },
    showCellData(cellData) {
      console.info(cellData);
    },
  },
};
</script>


<style scoped>
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
