<template>
  <t-space>
    <t-space direction="vertical">
      <t-tabs :value="value1" size="medium" @change="onTabChange1">
        <t-tab-panel value="first" label="选项卡1">
          <p style="padding: 25px">选项卡1</p>
        </t-tab-panel>
        <t-tab-panel value="second" label="选项卡2">
          <p style="padding: 25px">选项卡2</p>
        </t-tab-panel>
        <t-tab-panel value="third" label="选项卡3">
          <p style="padding: 25px">选项卡3</p>
        </t-tab-panel>
      </t-tabs>

      <t-tabs :value="value2" size="large" @change="onTabChange2">
        <t-tab-panel value="first" label="选项卡1">
          <p style="padding: 25px">选项卡1</p>
        </t-tab-panel>
        <t-tab-panel value="second" label="选项卡2">
          <p style="padding: 25px">选项卡2</p>
        </t-tab-panel>
        <t-tab-panel value="third" label="选项卡3">
          <p style="padding: 25px">选项卡3</p>
        </t-tab-panel>
      </t-tabs>
    </t-space>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TabsProps } from 'tdesign-vue-next';
const value1 = ref<TabsProps['value']>('first');
const value2 = ref<TabsProps['value']>('first');
const onTabChange1: TabsProps['onChange'] = (newValue) => (value1.value = newValue);
const onTabChange2: TabsProps['onChange'] = (newValue) => (value2.value = newValue);
</script>
