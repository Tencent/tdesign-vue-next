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
<script setup>
import { ref } from 'vue';

const value1 = ref('first');
const value2 = ref('first');

const onTabChange1 = (newValue) => (value1.value = newValue);
const onTabChange2 = (newValue) => (value2.value = newValue);
</script>
