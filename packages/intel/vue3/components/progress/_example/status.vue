<template>
  <t-space direction="vertical" size="0">
    <t-space direction="vertical" size="small" class="t-progress-domo-width">
      <div>进度完成：</div>
      <t-progress class="t-progress-domo-margin" theme="line" :status="'success'" :percentage="80" />
      <t-progress class="t-progress-domo-margin" theme="plump" :status="'success'" :percentage="80" />
      <t-progress class="t-progress-domo-margin" theme="circle" :status="'warning'" :percentage="80" />
    </t-space>
    <div>
      <div>进度状态出现重大错误（如下载的文件有损）：</div>
      <t-progress class="t-progress-domo-margin" theme="line" :status="'error'" :percentage="80" />
      <t-progress class="t-progress-domo-margin" theme="plump" :status="'error'" :percentage="80" />
      <t-progress class="t-progress-domo-margin" theme="circle" :status="'error'" :percentage="80" />
    </div>
    <t-space direction="vertical" size="small" class="t-progress-domo-width">
      <div>进度被中断（如失去网络连接）</div>
      <t-progress class="t-progress-domo-margin" theme="line" :status="'warning'" :percentage="80" />
      <t-progress class="t-progress-domo-margin" theme="plump" :status="'warning'" :percentage="80" />
      <t-progress class="t-progress-domo-margin" :percentage="80" :status="'warning'" />
      <t-progress class="t-progress-domo-margin" theme="circle" :status="'warning'" :percentage="80" />
    </t-space>
  </t-space>
</template>

<style scoped>
.t-progress-domo-width {
  width: 100%;
}

.t-progress-domo-margin {
  margin: 20px 0 10px;
}
</style>
