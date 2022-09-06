<template>
  <div>
    <div>默认</div>
    <!-- 重要：strokeWidth 大小不能超过 size 的一半，否则无法渲染出环形 -->
    <div class="t-progress-demo-box">
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">默认样式</div>
        <t-progress theme="circle" :percentage="30" />
      </div>
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">不显示数字</div>
        <t-progress theme="circle" :label="false" :percentage="100" :status="'success'" />
      </div>
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">自定义内容</div>
        <t-progress theme="circle" :label="'75day'" :percentage="50" :status="'success'" />
      </div>
    </div>
    <div class="t-progress-demo-box">
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">进度完成</div>
        <t-progress theme="circle" :percentage="100" :status="'success'" />
      </div>
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">进度状态发生重大错误</div>
        <t-progress theme="circle" :percentage="75" :status="'error'" />
      </div>
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">进度被中断</div>
        <t-progress theme="circle" :percentage="50" :status="'warning'" />
      </div>
    </div>
    <div>默认不同尺寸</div>
    <div class="t-progress-demo-box">
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">小尺寸</div>
        <t-progress theme="circle" :percentage="30" :size="'small'" />
      </div>
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">默认尺寸</div>
        <t-progress theme="circle" :percentage="30" :size="'medium'" />
      </div>
      <div class="t-progress-demo-inner" style="margin-left: 60px">
        <div class="t-progress-demo-margin">大尺寸</div>
        <t-progress theme="circle" :percentage="75" :size="'large'" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.t-progress-demo-margin {
  margin-bottom: 10px;
  text-align: center;
}
.t-progress-demo-box {
  margin: 20px 0 10px;
  display: flex;

  .t-progress-demo-inner {
    margin: 15px;
    min-width: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
