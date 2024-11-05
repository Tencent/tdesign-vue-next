<template>
  <t-space direction="vertical" :size="16">
    <t-space align="center">
      <span>layout:</span>
      <t-radio-group v-model="layout" variant="default-filled">
        <t-radio-button value="vertical">vertical</t-radio-button>
        <t-radio-button value="horizontal">horizontal</t-radio-button>
      </t-radio-group>
    </t-space>
    <t-space align="center">
      <span>size:</span>
      <t-radio-group v-model="size" variant="default-filled">
        <t-radio-button value="small">small</t-radio-button>
        <t-radio-button value="medium">medium</t-radio-button>
        <t-radio-button value="large">large</t-radio-button>
      </t-radio-group>
    </t-space>
    <t-pagination-mini :layout="layout" :size="size" :tips="tips" />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { PaginationMiniProps } from 'tdesign-vue-next';
const layout = ref<PaginationMiniProps['layout']>('vertical');
const size = ref<PaginationMiniProps['size']>('medium');
const tips = ref<PaginationMiniProps['tips']>({
  prev: '前尘忆梦',
  current: '回到现在',
  next: '展望未来',
});
</script>
