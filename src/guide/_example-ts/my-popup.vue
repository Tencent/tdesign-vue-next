<template>
  <div class="my-popup">
    <ArrowUpIcon class="pop-icon" />
    <p class="popup-desc">自定义的图形或说明文案，用来解释或指导该功能使用。</p>
    <div class="popup-action">
      <t-button theme="default" size="small" @click="handleSkip"> 跳过 </t-button>
      <t-button v-if="current !== 0" theme="default" size="small" @click="handlePrev"> 上一步 </t-button>
      <t-button v-if="current + 1 < total" theme="primary" size="small" @click="handleNext"> 下一步 </t-button>
      <t-button v-if="current + 1 === total" theme="primary" size="small" @click="handleFinish"> 完成 </t-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowUpIcon } from 'tdesign-icons-vue-next';
defineProps({
  handlePrev: Function,
  handleNext: Function,
  handleSkip: Function,
  handleFinish: Function,
  current: Number,
  total: Number,
});
</script>

<style scoped>
.my-popup {
  width: 240px;
}

.pop-icon {
  margin-top: 10px;
  color: white;
  font-size: 30px;
  font-weight: bold;
}

.popup-desc {
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  line-height: 20px;
}

.popup-action {
  margin-top: 10px;
  text-align: right;
}

.popup-action button {
  margin-left: 8px;
}
</style>
