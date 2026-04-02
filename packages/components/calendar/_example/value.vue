<template>
  <t-space direction="vertical">
    <t-form layout="inline">
      <t-form-item label="自己指定年：">
        <t-input v-model="year" />
      </t-form-item>
      <t-form-item label="自己指定年月：">
        <t-input v-model="month" />
      </t-form-item>
    </t-form>

    <h2>单个高亮日期</h2>
    <t-calendar :value="value" :year="year" :month="month" />

    <br />

    <h2>多个高亮日期</h2>
    <!-- 这里请注意 multiple 属性（需要设为 true） -->
    <t-calendar multiple :value="valueList" :year="year" :month="month" />
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { CalendarProps } from 'tdesign-vue-next';
const value: CalendarProps['value'] = '1998-11-11'; // new Date(1998, 10, 11)
const year = ref<CalendarProps['year']>('1998');
const month = ref<CalendarProps['month']>('11');
const valueList: CalendarProps['value'] = ['1998-10-27', '1998-11-11', '1998-11-12', '1998-11-13', '1998-12-05'];
</script>
