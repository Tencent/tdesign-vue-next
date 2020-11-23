<template>
  <t-calendar>

    <div slot="cellAppend" slot-scope="scope">
      <t-tag class="demo-tag" shape="round" theme="primary" :effect="getCellEffect(scope.data)">
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
        if (cellData.isCurMon) {
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
  },
};
</script>


<style scoped>
.demo-tag {
  margin: 10px;
}
</style>
