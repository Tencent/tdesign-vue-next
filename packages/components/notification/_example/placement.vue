<template>
  <t-space direction="vertical">
    <t-space>
      <t-input v-model="offsetX" placeholder="请输入横向偏移量"></t-input>
      <t-input v-model="offsetY" placeholder="请输入纵向偏移量"></t-input>
    </t-space>
    <t-space direction="vertical" size="large">
      <t-space size="large">
        <t-button variant="outline" @click="$notify.info(infoList[0])">左上角</t-button>
        <t-button variant="outline" @click="$notify.info(infoList[1])">右上角</t-button>
      </t-space>
      <t-space size="large">
        <t-button variant="outline" @click="$notify.info(infoList[2])">左下角</t-button>
        <t-button variant="outline" @click="$notify.info(infoList[3])">右下角</t-button>
      </t-space>
    </t-space>
  </t-space>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
const offsetX = ref('');
const offsetY = ref('');
const infoList = computed(() =>
  [
    {
      placement: 'top-left',
    },
    {
      placement: 'top-right',
    },
    {
      placement: 'bottom-left',
    },
    {
      placement: 'bottom-right',
    },
  ].map((item) => ({
    title: '标题名称',
    content: '这是一条可以自动关闭的消息通知',
    duration: 3000,
    offset: [offsetX.value, offsetY.value],
    ...item,
  })),
);
</script>
