<template>
  <t-space :break-line="true" :size="16">
    <t-space v-for="item in mode" :key="item" direction="vertical" align="start">
      <t-image
        src="https://tdesign.gtimg.com/demo/demo-image-1.png"
        :fit="item"
        :style="{ width: '120px', height: '120px' }"
        @error="onError"
      />
      <span>{{ item }}</span>
    </t-space>
  </t-space>
</template>

<script setup>
const mode = ['fill', 'contain', 'cover', 'none', 'scale-down'];
const onError = () => {
  console.log('onError');
};
</script>
