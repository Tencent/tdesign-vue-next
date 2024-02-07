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

<script lang="ts" lang="tsx" setup>
import { ImageViewerProps } from 'tdesign-vue-next';
import { ref } from 'vue';
const visible = ref(false);
const trigger: ImageViewerProps['trigger'] = (
  h,
  {
    open,
  }: {
    open: () => void;
  },
) => <t-button onClick={open}>预览单张图片</t-button>;
</script>
