<template>
  <div>
    <t-image-viewer
      v-model:visible="visible"
      :trigger="trigger"
      :images="['https://tdesign.gtimg.com/demo/demo-image-1.png']"
      :z-index="10000"
    >
    </t-image-viewer>
  </div>
</template>

<script lang="jsx" setup>
import { ref } from 'vue';

const visible = ref(false);

const trigger = (h, { open }) => <t-button onClick={open}>预览单张图片</t-button>;
</script>
