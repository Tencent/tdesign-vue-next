<template>
  <t-image
    src="https://tdesign.gtimg.com/demo/demo-image-1.png"
    :style="{ width: '284px', height: '160px' }"
    :overlay-content="renderMask"
    overlay-trigger="hover"
  />
</template>

<script lang="tsx" setup>
import { ImageProps } from 'tdesign-vue-next';
const renderMask: ImageProps['overlayContent'] = () => (
  <div
    style={{
      background: 'rgba(0,0,0,.4)',
      color: '#fff',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    预览
  </div>
);
</script>
