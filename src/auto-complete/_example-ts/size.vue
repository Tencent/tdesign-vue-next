<template>
  <t-space direction="vertical">
    <t-auto-complete
      v-model="value1"
      size="small"
      :input-props="{ label: '小尺寸：' }"
      :options="['第一个联想词', '第二个联想词', '第三个联想词']"
    />

    <t-auto-complete
      v-model="value2"
      :input-props="{ label: '中尺寸：' }"
      :options="['第一个联想词', '第二个联想词', '第三个联想词']"
    />

    <t-auto-complete
      v-model="value3"
      size="large"
      :input-props="{ label: '大尺寸：' }"
      :options="['第一个联想词', '第二个联想词', '第三个联想词']"
    />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
</script>
