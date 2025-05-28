<template>
  <t-swiper class="tdesign-demo-block--swiper" :duration="300" :interval="2000">
    <t-swiper-item v-for="item in 6" :key="item">
      <div class="demo-item">{{ item }}</div>
    </t-swiper-item>
  </t-swiper>
</template>
