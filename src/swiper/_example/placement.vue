<template>
  <t-swiper class="tdesign-demo-block--swiper" :navigation="{ placement: 'outside' }">
    <t-swiper-item v-for="item in 6" :key="item">
      <div class="demo-item">{{ item }}</div>
    </t-swiper-item>
  </t-swiper>
</template>
