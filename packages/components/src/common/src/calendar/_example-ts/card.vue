<template>
  <t-space direction="vertical" size="large">
    <t-space size="small" align="center">
      <label>请选择风格：</label>
      <t-select v-model="theme">
        <t-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
      </t-select>
      <t-button theme="primary" @click="toCurrent()"> 今天（当前高亮日期） </t-button>
    </t-space>
    <div>
      <label>日期补零：</label>
      <t-switch v-model="fillWithZero" size="large" />
    </div>
    <t-calendar ref="myCalendar" :theme="theme" :is-show-weekend-default="true" :fill-with-zero="fillWithZero" />
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { CalendarProps, CalendarInstanceFunctions } from 'tdesign-vue-next';
const options = [
  {
    value: 'full',
    label: '全屏风格',
  },
  {
    value: 'card',
    label: '卡片风格',
  },
];
const theme = ref<CalendarProps['theme']>('card');
const myCalendar = ref<CalendarInstanceFunctions>();
const fillWithZero = ref(true);
const toCurrent = () => {
  if (myCalendar.value) {
    myCalendar.value.toCurrent();
  }
};
</script>
