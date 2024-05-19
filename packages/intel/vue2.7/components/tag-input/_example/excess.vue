<template>
  <t-space direction="vertical" style="width: 80%">
    <!-- 标签数量超出时，滚动显示 -->
    <t-tag-input v-model="tags" label="Scroll: " excess-tags-display-type="scroll" clearable />

    <!-- 标签数量超出时，换行显示 -->
    <t-tag-input v-model="tags" label="BreakLine: " clearable />
  </t-space>
</template>
<script>
export default {
  data() {
    return {
      tags: ['Vue', 'React', 'VueNext', 'MiniProgram', 'Angular', 'Starter Kit'],
    };
  },
};
</script>
