<template>
  <t-space direction="vertical" size="large">
    <t-space>
      <t-radio-group v-model="theme" variant="default-filled">
        <t-radio-button value="normal">常规型</t-radio-button>
        <t-radio-button value="card">卡片型</t-radio-button>
      </t-radio-group>
    </t-space>

    <t-tabs drag-sort :value="value" :theme="theme" @drag-sort="onDragend" @change="onTabChange">
      <t-tab-panel
        v-for="data in panelData"
        :key="data.value"
        :value="data.value"
        :label="data.label"
        :draggable="data.draggable"
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
const theme = ref<TabsProps['theme']>('normal');
const value = ref<TabsProps['value']>('first');
const panelData = ref([
  {
    value: 'first',
    label: '固定的选项卡1',
    content: '选项卡1内容',
    draggable: false,
  },
  {
    value: 'second',
    label: '可拖拽选项卡2',
    content: '选项卡2内容',
  },
  {
    value: 'third',
    label: '可拖拽的选项卡3',
    content: '选项卡2内容',
  },
]);
const onDragend: TabsProps['onDragSort'] = ({ currentIndex, targetIndex }) => {
  [panelData.value[currentIndex], panelData.value[targetIndex]] = [
    panelData.value[targetIndex],
    panelData.value[currentIndex],
  ];
};
const onTabChange: TabsProps['onChange'] = (newValue) => (value.value = newValue);
</script>
