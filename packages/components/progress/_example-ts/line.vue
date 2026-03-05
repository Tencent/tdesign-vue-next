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
  <t-space direction="vertical" size="0">
    <h3>动态更新示例</h3>
    <t-space direction="vertical" size="small" class="t-progress-demo-width">
      <div class="t-progress-demo-margin">进度正常更新</div>
      <t-progress :percentage="percent" />
      <div class="t-progress-demo-margin">不显示数字</div>
      <t-progress theme="line" :percentage="percent" :label="false" />
      <div class="t-progress-demo-margin">自定义内容</div>
      <t-progress theme="line" :percentage="percent">
        <template #label>
          <div>自定义文本</div>
        </template>
      </t-progress>
    </t-space>

    <h3>默认在线形外展示进度和状态</h3>
    <t-space direction="vertical" size="small" class="t-progress-demo-width">
      <div class="t-progress-demo-margin">默认样式</div>
      <t-progress theme="line" :percentage="30" />
      <div class="t-progress-demo-margin">100%</div>
      <t-progress theme="line" :percentage="100" />
      <div class="t-progress-demo-margin">进度状态完成</div>
      <t-progress theme="line" :status="'success'" :percentage="60" />
      <div class="t-progress-demo-margin">进度状态发生重大错误</div>
      <t-progress theme="line" :status="'error'" :percentage="60" />
      <div class="t-progress-demo-margin">进度状态被中断</div>

      <t-progress theme="line" :status="'warning'" :percentage="60" />
      <div class="t-progress-demo-margin">渐变色</div>
      <t-progress theme="line" :color="{ from: '#0052D9', to: '#00A870' }" :percentage="60" :status="'active'" />
    </t-space>

    <h3>可以在线形内展示进度信息</h3>
    <t-space direction="vertical" size="small" class="t-progress-demo-width">
      <div class="t-progress-demo-margin">默认样式</div>
      <t-progress theme="plump" :percentage="30" />
      <div class="t-progress-demo-margin">进度条内部宽度不足以展示其内容时，该内容会自动显示在进度条右侧</div>
      <t-progress theme="plump" :percentage="percent">
        <template #label>
          <div>当前进度为：{{ percent }}%</div>
        </template>
      </t-progress>
    </t-space>
  </t-space>
</template>

<style scoped>
.t-progress-demo-width {
  width: 100%;
}

h3 {
  margin: 24px 0;
}

div > .t-progress-demo-margin:first-child {
  margin-top: 0;
}

.t-progress-demo-margin {
  margin: 16px 0 4px;
}
</style>
