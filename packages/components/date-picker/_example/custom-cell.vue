<template>
  <t-space direction="vertical">
    <t-date-picker v-model="date1">
      <template #cell="{ value }">
        <div v-if="getCellStyle(value)" class="custom-cell" :style="getCellStyle(value)">
          {{ value.getDate() }}
          <span class="special-day"> 纪念日 </span>
        </div>
        <span v-else>{{ value.getDate() }}</span>
      </template>
    </t-date-picker>

    <t-date-range-picker v-model="date2">
      <template #cell="{ value }">
        <div v-if="isSpecialDay(value)" class="custom-range-cell">
          <t-badge count="New" dot style="width: 100%">
            {{ value.getDate() }}
          </t-badge>
        </div>
        <span v-else>
          {{ value.getDate() }}
        </span>
      </template>
    </t-date-range-picker>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const date1 = ref('');
const date2 = ref(['', '']);

function getCellStyle(date) {
  if (date.getDate() === 15) {
    return {
      color: 'red',
    };
  }
  return null;
}

function isSpecialDay(date) {
  return date.getDate() === 1 || date.getDate() === 15;
}
</script>

<style>
.custom-cell {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  line-height: 14px;
}

.custom-range-cell {
  width: 100%;
}

.special-day {
  font-size: 10px;
  line-height: 8px;
}

.t-date-picker__cell-inner:has(.custom-cell) {
  width: var(--td-comp-size-l);
}

.t-date-picker__cell--active .t-date-picker__cell-inner .t-badge {
  color: var(--td-text-color-anti);
}
</style>
