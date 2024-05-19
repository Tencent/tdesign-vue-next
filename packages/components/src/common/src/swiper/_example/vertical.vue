<template>
  <t-swiper
    class="tdesign-demo-block--swiper"
    direction="vertical"
    :navigation="{ showSlideBtn: 'never' }"
    :height="280"
    :autoplay="false"
  >
    <t-swiper-item v-for="item in 6" :key="item">
      <div class="demo-item">{{ item }}</div>
    </t-swiper-item>
  </t-swiper>
</template>
