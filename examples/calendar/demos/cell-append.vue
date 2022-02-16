<template>
  <t-calendar>
    <template #cellAppend="data">
      <div v-if="getShow(data)" class="cell-append-demo-outer">
        <t-tag theme="primary" size="small" class="activeTag">
          {{ data.mode == 'month' ? '今天' : '本月' }}
        </t-tag>
      </div>
    </template>
  </t-calendar>
</template>

<script setup>
import dayjs from 'dayjs';

const getShow = (data) =>
  data.mode === 'month'
    ? dayjs().format('YYYY-MM-DD') === data.formattedDate
    : data.date.getMonth() === new Date().getMonth();
</script>
