<template>
  <div>
    <div class="tdesign-demo-block--swiper" :style="{ width: '1000px' }">
      <h3>large</h3>
      <t-swiper :navigation="{ size: 'large' }">
        <t-swiper-item>
          <div class="demo-item demo-large">1</div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="demo-item demo-large">2</div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="demo-item demo-large">3</div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="demo-item demo-large">4</div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="demo-item demo-large">5</div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="demo-item demo-large">6</div>
        </t-swiper-item>
      </t-swiper>
    </div>
    <div class="tdesign-demo-block--swiper-new" :style="{ width: '500px', marginTop: '20px' }">
      <h3>small</h3>
      <t-swiper :navigation="{ size: 'small' }">
        <t-swiper-item>
          <div class="demo-item demo-small">1</div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="demo-item demo-small">2</div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="demo-item demo-small">3</div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="demo-item demo-small">4</div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="demo-item demo-small">5</div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="demo-item demo-small">6</div>
        </t-swiper-item>
      </t-swiper>
    </div>
  </div>
</template>
