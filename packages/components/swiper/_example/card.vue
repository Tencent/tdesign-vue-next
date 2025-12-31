<template>
  <div class="tdesign-demo-block--swiper">
    <t-space direction="vertical" :size="50" style="width: 100%">
      <t-space direction="vertical" style="width: 100%">
        <t-tag theme="primary" variant="outline">卡片缩放比例</t-tag>
        <t-slider v-model="cardScale" :min="0" :max="1" :step="0.01" :marks="marks" />
      </t-space>

      <t-swiper type="card" :height="280" :autoplay="false" :card-scale="cardScale">
        <t-swiper-item v-for="i in 6" :key="i">
          <div class="demo-item">{{ i }}</div>
        </t-swiper-item>
      </t-swiper>
    </t-space>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const DEFAULT_SCALE = 210 / 332;
const cardScale = ref(DEFAULT_SCALE);
const marks = {
  [DEFAULT_SCALE]: 'Default',
};
</script>
