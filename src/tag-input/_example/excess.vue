<template>
  <div class="tdesign-demo-block-column" style="width: 80%">
    <!-- 标签数量超出时，滚动显示 -->
    <t-tag-input v-model="tags" label="Scroll: " clearable />

    <!-- 标签数量超出时，换行显示 -->
    <t-tag-input v-model="tags" label="BreakLine: " excess-tags-display-type="break-line" clearable />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tags = ref(['Vue', 'React']);
</script>
