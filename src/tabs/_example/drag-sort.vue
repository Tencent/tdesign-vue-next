<template>
  <div class="tdesign-demo-block-column-large">
    <div>
      <t-radio-group v-model="theme" variant="default-filled">
        <t-radio-button value="normal"> 常规型 </t-radio-button>
        <t-radio-button value="card"> 卡片型 </t-radio-button>
      </t-radio-group>
    </div>

    <t-tabs drag-sort :value="value" :theme="theme" @drag-sort="onDragend" @change="(newValue) => (value = newValue)">
      <t-tab-panel v-for="data in panelData" :key="data.value" :value="data.value" :label="data.label">
        <p style="padding: 25px">
          {{ data.content }}
        </p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';

const theme = ref('normal');

const value = ref('first');

const panelData = ref([
  {
    value: 'first',
    label: '选项卡1',
    content: '选项卡1内容',
  },
  {
    value: 'second',
    label: '选项卡2',
    content: '选项卡2内容',
  },
  {
    value: 'third',
    label: '选项卡3',
    content: '选项卡2内容',
  },
]);

const onDragend = ({ currentIndex, current, targetIndex, target }) => {
  [panelData.value[currentIndex], panelData.value[targetIndex]] = [
    panelData.value[targetIndex],
    panelData.value[currentIndex],
  ];
};
</script>
