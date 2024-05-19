<template>
  <t-calendar>
    <template #cellAppend="data">
      <div v-if="getShow(data)" class="cell-append-demo-outer">
        <t-tag theme="success" variant="light" size="small" class="activeTag" style="width: 100%">
          {{ data.mode == 'month' ? '我们的纪念日' : '我们的纪念月' }}
        </t-tag>
        <t-tag theme="warning" variant="light" size="small" class="activeTag" style="width: 100%">
          {{ data.mode == 'month' ? '家庭聚会' : '家庭聚会' }}
        </t-tag>
      </div>
    </template>
  </t-calendar>
</template>

<script lang="tsx" setup>
import dayjs from 'dayjs';
import { CalendarCell } from 'tdesign-vue-next';
const getShow = (data: CalendarCell) =>
  data.mode === 'month'
    ? dayjs().format('YYYY-MM-DD') === data.formattedDate
    : data.date.getMonth() === new Date().getMonth();
</script>
