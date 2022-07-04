<template>
  <!-- 开启虚拟滚动 请为select的panel设定好height 通过popupProps进行透传 -->
  <t-select
    v-model="value"
    :options="options"
    placeholder="请选择"
    :scroll="{ type: 'virtual' }"
    :popup-props="{ overlayInnerStyle: { height: '300px' } }"
  />
</template>

<script setup>
const options = [];
for (let i = 0; i < 5000; i++) {
  options.push({ label: `选项${i + 1}`, value: String(i) });
}

const value = '';
</script>
