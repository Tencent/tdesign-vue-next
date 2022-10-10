<template>
  <t-space direction="vertical" size="0">
    <div>默认</div>
    <t-space direction="vertical" size="small" class="t-progress-domo-width t-progress-domo-margin">
      <div class="t-progress-domo-inner">
        <t-progress theme="circle" :percentage="30" />
      </div>
      <div class="t-progress-domo-inner">
        <t-progress theme="circle" :percentage="75" :status="'error'" />
      </div>
      <div class="t-progress-domo-inner">
        <t-progress theme="circle" :percentage="50" :status="'warning'" />
      </div>
      <div class="t-progress-domo-inner">
        <t-progress theme="circle" :percentage="100" :status="'success'" />
      </div>
    </t-space>
    <div>默认不同尺寸</div>
    <t-space direction="vertical" size="small" class="t-progress-domo-width t-progress-domo-margin">
      <div>小尺寸</div>
      <t-progress theme="circle" :percentage="30" :size="'small'" />

      <div>大尺寸</div>
      <t-progress theme="circle" :percentage="75" :size="'large'" />
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
.t-progress-domo-inner {
  margin: 20px;
}
</style>
