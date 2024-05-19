<template>
  <div class="tdesign-demo-block--swiper">
    <t-swiper :current="current" :navigation="{ showSlideBtn: 'never' }">
      <t-swiper-item>
        <div class="demo-item">1</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item">2</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item">3</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item">4</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item">5</div>
      </t-swiper-item>
      <t-swiper-item>
        <div class="demo-item">6</div>
      </t-swiper-item>
    </t-swiper>
    <div class="tdesign-demo-block-row">
      <t-button size="small" @click="current = current + 2 > 6 ? 0 : current + 1">
        跳转到第 {{ current + 2 >= 7 ? 1 : current + 2 }} 项
      </t-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
    };
  },
};
</script>
