<template>
  <div>
    <t-image-viewer v-model:visible="visible" :images="['https://tdesign.gtimg.com/demo/demo-image-1.png']">
      <template #trigger>
        <t-button @click="() => (visible = true)">预览单张图片</t-button>
      </template>
    </t-image-viewer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>
