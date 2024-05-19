<template>
  <t-space :breakLine="true" :size="16">
    <t-space v-for="item in mode" direction="vertical" align="start" :key="item">
      <t-image
        src="https://tdesign.gtimg.com/demo/demo-image-1.png"
        :fit="item"
        :style="{ width: '120px', height: '120px' }"
      />
      <span>{{ item }}</span>
    </t-space>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const mode = ref(['fill', 'contain', 'cover', 'none', 'scale-down']);
</script>
