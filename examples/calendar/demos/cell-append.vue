<template>
  <t-calendar>
    <template #cellAppend="{ data }">
      <div v-if="getShow(data)" class="cell-append-demo-outer">
        <t-tag theme="primary" size="small" class="activeTag">{{data.mode == "month" ? '今天' : '本月'}}</t-tag>
      </div>
    </template>
  </t-calendar>
</template>

<script>
import { defineComponent } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
  setup() {
    const getShow = (data) => {
      return data.mode === 'month' ? dayjs().format('YYYY-MM-DD') === data.formattedDate : data.date.getMonth() === new Date().getMonth();
    }

    return {
      getShow
    }
  },
});
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
