<template>
  <div>
    <h3>默认在线形外展示进度和状态</h3>
    <div>
      <div class="t-progress-domo-margin">默认样式</div>
      <t-progress theme="line" :percentage="30" />
      <div class="t-progress-domo-margin">100%</div>
      <t-progress theme="line" :percentage="100" />
      <div class="t-progress-domo-margin">进度完成</div>
      <t-progress theme="line" :status="'success'" :percentage="60" />
      <div class="t-progress-domo-margin">进度状态发生重大错误</div>
      <t-progress theme="line" :status="'error'" :percentage="60" />
      <div class="t-progress-domo-margin">进度被中断</div>

      <t-progress theme="line" :status="'warning'" :percentage="60" />
      <div class="t-progress-domo-margin">渐变色</div>
      <t-progress theme="line" :color="{ from: '#0052D9', to: '#00A870' }" :percentage="60" :status="'active'" />
    </div>
    <h3>可以在线形内展示进度信息</h3>
    <div>
      <div class="t-progress-domo-margin">默认样式</div>
      <t-progress theme="plump" :percentage="30" />
      <div class="t-progress-domo-margin">进度0-10%时数字数字位置出现在目前进度的右边区域</div>
      <t-progress theme="plump" :percentage="5" />
    </div>
  </div>
</template>
<script></script>
<style scoped>
h3 {
  margin: 24px 0;
}
div > .t-progress-domo-margin:first-child {
  margin-top: 0;
}

.t-progress-domo-margin {
  margin: 16px 0 4px;
}
</style>
