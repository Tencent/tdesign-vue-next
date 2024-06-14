<template>
  <t-space direction="vertical" size="large">
    <t-space>
      <t-radio-group v-model="theme" variant="default-filled">
        <t-radio-button value="normal">常规型</t-radio-button>
        <t-radio-button value="card">卡片型</t-radio-button>
      </t-radio-group>
    </t-space>

    <t-tabs :value="value" :theme="theme" @change="(newValue) => (value = newValue)">
      <t-tab-panel value="first" :label="`选项卡1`">
        <p style="padding: 25px">{{ `选项卡1的内容` }}</p>
      </t-tab-panel>
      <t-tab-panel value="second" :label="`选项卡2`" :disabled="true">
        <p style="padding: 25px">{{ `选项卡2的内容` }}</p>
      </t-tab-panel>
      <t-tab-panel value="third" :label="`选项卡3`">
        <p style="padding: 25px">{{ `选项卡3的内容` }}</p>
      </t-tab-panel>
    </t-tabs>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TabsProps } from 'tdesign-vue-next';
const value = ref<TabsProps['value']>('first');
const theme = ref<TabsProps['theme']>('normal');
</script>
