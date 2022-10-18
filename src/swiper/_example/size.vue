<template>
  <div class="tdesign-demo-block--swiper" :style="{ width: '600px' }">
    <h3>large</h3>
    <t-swiper :navigation="{ size: 'large' }">
      <t-swiper-item v-for="item in 6" :key="item">
        <div class="demo-item">{{ item }}</div>
      </t-swiper-item>
    </t-swiper>
  </div>
  <div class="tdesign-demo-block--swiper" :style="{ width: '600px', marginTop: '20px' }">
    <h3>small</h3>
    <t-swiper :navigation="{ size: 'small' }">
      <t-swiper-item v-for="item in 6" :key="item">
        <div class="demo-item">{{ item }}</div>
      </t-swiper-item>
    </t-swiper>
  </div>
</template>
