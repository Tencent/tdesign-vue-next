<template>
  <!-- 开启虚拟滚动请为select的panel设定好height 通过popupProps进行透传 -->
  <t-space>
    <t-select
      v-model="value1"
      :options="options"
      filterable
      placeholder="请选择"
      :style="{ width: '300px' }"
      :scroll="{ type: 'virtual' }"
      :popup-props="{ overlayInnerStyle: { height: '300px' } }"
    />
    <!-- 开启虚拟滚动请为select的panel设定好height 通过popupProps进行透传 -->
    <t-select
      v-model="value2"
      placeholder="请选择"
      :style="{ width: '300px' }"
      :scroll="{ type: 'virtual' }"
      :popup-props="{ overlayInnerStyle: { height: '300px' } }"
    >
      <t-option v-for="item in options" :value="item.value" :label="item.label" :key="item.value"></t-option>
    </t-select>
  </t-space>
</template>

<script setup lang="jsx">
import { ref } from 'vue';

const initialOptions = [];
for (let i = 0; i < 10000; i++) {
  options.push({
    label: `选项${i + 1}`,
    value: String(i),
  });
}
const value1 = ref('');
const value2 = ref('');
const options = ref(initialOptions);
</script>
