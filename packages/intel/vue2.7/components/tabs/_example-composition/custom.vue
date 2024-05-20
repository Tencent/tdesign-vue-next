<template>
  <t-tabs
    :value="value"
    theme="card"
    :addable="true"
    @add="addTab"
    @remove="removeTab"
    @change="changeTab"
    style="width: 100%"
  >
    <t-tab-panel
      v-for="data in panelData"
      :key="data.value"
      :value="data.value"
      :label="data.label"
      :removable="data.removable"
    >
      <p style="padding: 25px">{{ data.content }}</p>
    </t-tab-panel>
  </t-tabs>
</template>

<script setup>
import { ref } from 'vue';

let id = 0;
const value = ref('first');
const panelData = ref([
  {
    value: 'first',
    label: '原有选项卡',
    removable: true,
    content: '原有选项卡内容',
  },
  {
    value: 'second',
    label: '原有选项卡',
    removable: true,
    content: '原有选项卡内容',
  },
]);
const addTab = () => {
  panelData.value = [
    ...panelData.value,
    {
      value: `${id}`,
      label: '新选项卡',
      removable: true,
      content: '新选项卡内容',
    },
  ];
  value.value = `${id}`;
  id += 1;
};
const removeTab = (item) => {
  const index = panelData.value.findIndex((data) => data.value === item.value);
  if (index < 0) return false;
  panelData.value.splice(index, 1);
  if (value.value === item.value && panelData.value.length) {
    value.value = panelData.value[Math.max(index - 1, 0)].value;
  }
};
const changeTab = (newValue) => {
  value.value = newValue;
};
</script>
