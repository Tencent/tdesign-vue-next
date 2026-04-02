<template>
  <t-transfer v-model:checked="checked" :data="list" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TransferProps } from 'tdesign-vue-next';
const list: TransferProps['data'] = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i,
    label: `内容${i + 1}`,
    disabled: i % 4 < 1,
  });
}
const checked = ref<TransferProps['checked']>(list.map((item) => item.value).filter((v) => v % 2 === 0));
</script>
