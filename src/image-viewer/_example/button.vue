<template>
  <div>
    <t-image-viewer
      v-model:visible="visible"
      :trigger="trigger"
      :images="['https://tdesign.gtimg.com/demo/demo-image-1.png']"
    >
    </t-image-viewer>
  </div>
</template>

<script setup lang="tsx">
import { VNode, ref } from 'vue';

const visible = ref(false);

const trigger = (h: VNode, { open }: { open: () => void }) => <t-button onClick={open}>预览单张图片</t-button>;
</script>
