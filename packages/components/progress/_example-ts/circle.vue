<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const percent = ref(10);
let timer: number | undefined;

onMounted(() => {
  timer = window.setInterval(() => {
    percent.value = (percent.value % 100) + 10;
  }, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <t-space direction="vertical">
    <div>默认</div>
    <!-- 重要：strokeWidth 大小不能超过 size 的一半，否则无法渲染出环形 -->
    <t-space class="t-progress-demo-box" size="large">
      <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">默认样式</div>
        <t-progress theme="circle" :percentage="percent" />
      </t-space>
      <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">不显示数字</div>
        <t-progress theme="circle" :label="false" :percentage="percent" />
      </t-space>
      <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">自定义内容</div>
        <t-progress theme="circle" :percentage="percent">
          <template #label>
            <div>{{ percent }}day</div>
          </template>
        </t-progress>
      </t-space>
    </t-space>
    <t-space class="t-progress-demo-box" size="large">
      <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">进度状态完成</div>
        <t-progress theme="circle" :percentage="100" :status="'success'" />
      </t-space>
      <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">进度状态发生重大错误</div>
        <t-progress theme="circle" :percentage="75" :status="'error'" />
      </t-space>
      <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">进度状态被中断</div>
        <t-progress theme="circle" :percentage="50" :status="'warning'" />
      </t-space>
    </t-space>
    <div>默认不同尺寸</div>
    <t-space class="t-progress-demo-box" size="large">
      <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">小尺寸</div>
        <t-progress theme="circle" :percentage="30" :size="'small'" />
      </t-space>
      <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">默认尺寸</div>
        <t-progress theme="circle" :percentage="30" :size="'medium'" />
      </t-space>
      <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner" style="margin-left: 60px">
        <div class="t-progress-demo-margin">大尺寸</div>
        <t-progress theme="circle" :percentage="75" :size="'large'" />
      </t-space>
    </t-space>
  </t-space>
</template>

<style lang="less" scoped>
.t-progress-demo-margin {
  margin-bottom: 10px;
}
.t-progress-demo-box {
  margin: 20px 0 10px;

  .t-progress-demo-inner {
    margin: 15px;
    min-width: 160px;
  }
}
</style>
