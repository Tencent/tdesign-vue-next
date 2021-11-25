<template>
  <div class="t-progress-domo-margin">默认样式</div>
  <t-progress theme="plump" :percentage="30" />
  <div class="t-progress-domo-margin">进度0-10%时数字数字位置出现在目前进度的右边区域</div>
  <t-progress theme="plump" :percentage="5" />
  <div class="t-progress-domo-margin">100%</div>
  <t-progress theme="plump" :percentage="100" />
  <div class="t-progress-domo-margin">进度完成</div>
  <t-progress theme="plump" :status="'success'" :percentage="30" />
  <div class="t-progress-domo-margin">进度状态发生重大错误</div>
  <t-progress theme="plump" :status="'error'" :percentage="30" />
  <div class="t-progress-domo-margin">进度被中断</div>
  <t-progress theme="plump" :status="'warning'" :percentage="30" />
  <div class="t-progress-domo-margin">渐变色</div>
  <t-progress theme="plump" :color="{ from: '#0052D9', to: '#00A870' }" :percentage="30" :status="'active'" />
</template>
<script></script>

<style scoped>
div > .t-progress-domo-margin:first-child {
  margin-top: 0;
}

.t-progress-domo-margin {
  margin: 15px 0 10px;
}
</style>
