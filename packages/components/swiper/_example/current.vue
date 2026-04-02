<template>
  <t-swiper class="tdesign-demo-block--swiper" :current="current" :navigation="{ showSlideBtn: 'never' }">
    <t-swiper-item v-for="item in 6" :key="item">
      <div class="demo-item">{{ item }}</div>
    </t-swiper-item>
  </t-swiper>
  <div class="tdesign-demo-block-row">
    <t-button size="small" @click="current = current + 2 > 6 ? 0 : current + 1">
      跳转到第 {{ current + 2 >= 7 ? 1 : current + 2 }} 项
    </t-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const current = ref(0);
</script>
