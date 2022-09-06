<template>
  <t-space direction="vertical">
    <div class="cascader-demo-panel-container">
      <t-cascader-panel v-model="value" :options="options" />
    </div>
    <div class="cascader-demo-panel-container">
      <t-cascader-panel v-model="value2" :options="options" multiple />
    </div>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const options = [
  {
    label: '选项一',
    value: '1',
    children: [
      {
        label: '子选项一',
        value: '1.1',
      },
      {
        label: '子选项二',
        value: '1.2',
      },
      {
        label: '子选项三',
        value: '1.3',
      },
    ],
  },
  {
    label: '选项二',
    value: '2',
    children: [
      {
        label: '子选项一',
        value: '2.1',
      },
      {
        label: '子选项二',
        value: '2.2',
      },
    ],
  },
];

const value = ref('');
const value2 = ref([]);
</script>
<style>
.cascader-demo-panel-container {
  border: 1px solid #eee;
  width: 100%;
}
</style>
