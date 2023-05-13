<template>
  <t-space>
    <!-- 开启虚拟滚动 请为select的panel设定好height 通过popupProps进行透传 -->
    <t-select
      v-model="value"
      :options="options"
      placeholder="请选择"
      style="width: 300px"
      :scroll="{ type: 'virtual' }"
      :popup-props="{ overlayInnerStyle: { height: '300px' } }"
    />
    <t-select
      v-model="value2"
      :options="options"
      placeholder="请选择"
      style="width: 300px"
      :scroll="{ type: 'virtual' }"
      :popup-props="{ overlayInnerStyle: { height: '300px' } }"
    >
      <t-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></t-option>
    </t-select>
  </t-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Option = { label: string; value: string };

const options: Option[] = [];
for (let i = 0; i < 10000; i++) {
  options.push({ label: `选项${i + 1}`, value: String(i) });
}

const value = ref('');
const value2 = ref('');
</script>
