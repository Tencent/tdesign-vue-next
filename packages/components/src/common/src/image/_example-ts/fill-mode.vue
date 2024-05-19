<template>
  <t-space :break-line="true" :size="16">
    <t-space v-for="item in mode" :key="item" direction="vertical" align="start">
      <t-image :src="asyncImageUrl" :fit="item" :style="{ width: '120px', height: '120px' }" @error="onError" />
      <span>{{ item }}</span>
    </t-space>
  </t-space>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { ImageProps } from 'tdesign-vue-next';
const mode = ['fill', 'contain', 'cover', 'none', 'scale-down'];
const asyncImageUrl = ref<ImageProps['src']>('');
onBeforeMount(() => {
  const timer = setTimeout(() => {
    asyncImageUrl.value = 'https://tdesign.gtimg.com/demo/demo-image-1.png';
    clearTimeout(timer);
  }, 90);
});
const onError: ImageProps['onError'] = () => {
  console.log('onError');
};
</script>
