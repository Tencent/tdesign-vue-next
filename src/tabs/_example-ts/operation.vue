<template>
  <t-space>
    <t-space>
      <p>可以动态增加选项卡，仅支持卡片型</p>
    </t-space>

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
    label: '原有选项卡',
    removable: false,
    content: '原有选项卡内容',
  },
  {
    value: 'second',
    label: '原有选项卡',
    removable: true,
    content: '原有选项卡内容',
  },
]);
const addTab: TabsProps['onAdd'] = () => {
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
const removeTab: TabsProps['onRemove'] = ({ value: val }) => {
  const index = panelData.value.findIndex((data) => data.value === val);
  if (index < 0) return false;
  panelData.value.splice(index, 1);
  if (value.value === val) {
    value.value = panelData.value[index - 1].value;
  }
};
</script>
