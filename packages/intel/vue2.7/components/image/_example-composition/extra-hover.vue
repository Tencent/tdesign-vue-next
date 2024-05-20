<template>
  <t-image
    src="https://tdesign.gtimg.com/demo/demo-image-1.png"
    :style="{ width: '284px', height: '160px' }"
    :overlayContent="renderMask"
    overlayTrigger="hover"
  />
</template>

<script setup lang="jsx">
import { ref } from 'vue';
// renderMask 支持插槽
// eslint-disable-next-line
const renderMask = ref((h) => (
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
));
</script>
