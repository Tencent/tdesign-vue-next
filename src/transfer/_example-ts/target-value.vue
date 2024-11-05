<template>
  <t-transfer v-model="targetValue" :data="list" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TransferProps } from 'tdesign-vue-next';
const list: TransferProps['data'] = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
  });
}
const targetValue = ref(list.map((item) => item.value).filter((v) => parseInt(v, 10) % 2 === 0));
</script>
