<template>
  <t-space direction="vertical">
    <!-- 标签数量超出时，滚动显示 -->
    <t-tag-input v-model="tags" label="Scroll: " style="width: 600px" excess-tags-display-type="scroll" clearable />

    <!-- 标签数量超出时，换行显示 -->
    <t-tag-input v-model="tags" label="BreakLine: " style="width: 600px" clearable />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const tags = ref(['Vue', 'React', 'Miniprogram', 'Angular', 'Flutter', 'More', 'More', 'And More']);
</script>
