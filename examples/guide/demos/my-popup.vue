<template>
  <div class="my-popup">
    <ArrowUpIcon class="pop-icon" />
    <p class="popup-desc">自定义的图形或说明文案，用来解释或指导该功能使用。</p>
    <div class="popup-action">
      <t-button class="action-skip" theme="default" size="small"> 跳过 </t-button>
      <t-button theme="primary" size="small"> 下一步 </t-button>
    </div>
  </div>
</template>

<script setup>
import { ArrowUpIcon } from 'tdesign-icons-vue-next';
</script>

<style>
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

.action-skip {
  margin-right: 8px;
}
</style>
