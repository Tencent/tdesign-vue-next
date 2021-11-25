<template>
  <div>
    <div>默认</div>
    <div class="t-progress-domo-flex t-progress-domo-margin">
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
    </div>
    <div>默认不同尺寸</div>
    <div class="t-progress-domo-margin">
      <div>小尺寸</div>
      <t-progress theme="circle" :percentage="30" :size="'small'" />

      <div>大尺寸</div>
      <t-progress theme="circle" :percentage="75" :size="'large'" />
    </div>
  </div>
</template>
<script></script>

<style scoped>
.t-progress-domo-margin {
  margin: 20px 0 10px;
}
.t-progress-domo-flex {
  display: flex;
}
.t-progress-domo-inner {
  margin: 20px;
}
</style>
