<template>
  <div class="tdesign-demo-image-viewer__base">
    <t-image-viewer :images="[img]" :z-index="10000"></t-image-viewer>
  </div>
</template>
<script setup>
const img = 'https://tdesign.gtimg.com/demo/demo-image-1.png';
</script>
<style scoped>
.tdesign-demo-image-viewer__base {
  width: 160px;
  height: 160px;
  margin: 10px;
  border: 4px solid var(--td-bg-color-secondarycontainer);
  border-radius: var(--td-radius-medium);
}
</style>
