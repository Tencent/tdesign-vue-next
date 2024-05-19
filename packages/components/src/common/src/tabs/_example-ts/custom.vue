<template>
  <t-space>
    <t-tabs v-model="value" theme="card" :addable="true" @add="addTab" @remove="removeTab">
      <t-tab-panel
        v-for="data in panelData"
        :key="data.value"
        :value="data.value"
        :label="data.label"
        :removable="data.removable"
      >
        <p style="padding: 25px">
          {{ data.content }}
        </p>
      </t-tab-panel>
    </t-tabs>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TabsProps } from 'tdesign-vue-next';
let id = 0;
const value = ref('first');
const panelData = ref([
  {
    value: 'first',
    label: '原有选项卡1',
    removable: true,
    content: '原有选项卡1内容',
  },
  {
    value: 'second',
    label: '原有选项卡2',
    removable: true,
    content: '原有选项卡2内容',
  },
]);
const addTab: TabsProps['onAdd'] = () => {
  panelData.value.push({
    value: `${id}`,
    label: `新选项卡${id}`,
    removable: true,
    content: '新选项卡内容',
  });
  value.value = `${id}`;
  id += 1;
};
const removeTab: TabsProps['onRemove'] = ({ value: val, index }) => {
  if (index < 0) return false;
  panelData.value.splice(index, 1);
  if (panelData.value.length === 0) return;
  if (value.value === val) {
    value.value = panelData.value[Math.max(index - 1, 0)].value;
  }
};
</script>
