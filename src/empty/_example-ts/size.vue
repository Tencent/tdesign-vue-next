<template>
  <t-space direction="vertical">
    <t-radio-group variant="default-filled" :value="size" @change="onChange">
      <t-radio-button value="small">small</t-radio-button>
      <t-radio-button value="medium">medium</t-radio-button>
      <t-radio-button value="large">large</t-radio-button>
    </t-radio-group>
    <div style="margin-top: '20px'; height: '100px'">
      <t-row :gutter="40">
        <t-col>
          <t-empty type="empty" :size="size"></t-empty>
        </t-col>
        <t-col>
          <t-empty type="maintenance" :size="size"></t-empty>
        </t-col>
        <t-col>
          <t-empty type="network-error" :size="size"></t-empty>
        </t-col>
        <t-col>
          <t-empty type="success" :size="size"></t-empty>
        </t-col>
        <t-col>
          <t-empty type="fail" :size="size"></t-empty>
        </t-col>
      </t-row>
    </div>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { EmptyProps } from 'tdesign-vue-next';

const size = ref<EmptyProps['size']>('medium');

const onChange = (value: EmptyProps['size']) => {
  size.value = value;
};
</script>
