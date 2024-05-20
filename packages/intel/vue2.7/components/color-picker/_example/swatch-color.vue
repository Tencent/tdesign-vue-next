<template>
  <t-space>
    <t-space direction="vertical" size="10px">
      <h6>自定义系统色</h6>
      <t-color-picker-panel v-model="color" :swatch-colors="systemColors" />
    </t-space>
    <t-space direction="vertical" size="10px">
      <h6>完全不显示系统色</h6>
      <t-color-picker-panel v-model="color" :swatch-colors="null" />
    </t-space>
  </t-space>
</template>
<script>
export default {
  data() {
    return {
      color: '#0052d9',
      systemColors: ['red', 'green', 'yellow', 'blue', 'purple'],
    };
  },
};
</script>
