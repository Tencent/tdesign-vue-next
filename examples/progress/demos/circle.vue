<template>
  <div>
    <div>默认</div>
    <div class="t-progress-demo-box">
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">默认样式</div>
        <t-progress theme="circle" :percentage="30" ></t-progress>
      </div>
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">进度完成</div>
        <t-progress theme="circle" :percentage="100" :status="'success'"></t-progress>
      </div>
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">进度状态发生重大错误</div>
        <t-progress theme="circle" :percentage="75" :status="'error'"></t-progress>
      </div>
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">进度被中断</div>
        <t-progress theme="circle" :percentage="50" :status="'warning'"></t-progress>
      </div>
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">不显示数字</div>
        <t-progress theme="circle" :label="false" :percentage="100" :status="'success'"></t-progress>
      </div>
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">自定义内容</div>
        <t-progress theme="circle" :label="'75day'" :percentage="50" :status="'success'"></t-progress>
      </div>
    </div>
    <div>默认不同尺寸</div>
    <div class="t-progress-demo-box">
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">小尺寸</div>
        <t-progress theme="circle" :percentage="30" :size="'small'"></t-progress>
      </div>
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">默认尺寸</div>
        <t-progress theme="circle" :percentage="30" :size="'medium'"></t-progress>
      </div>

      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">大尺寸</div>
        <t-progress theme="circle" :percentage="75" :size="'large'"></t-progress>
      </div>
      <div class="t-progress-demo-inner">
        <div class="t-progress-demo-margin">自定义尺寸与颜色</div>
        <t-progress theme="circle" :percentage="75" :size="240" :color="'#00f'"  :trackColor="'#0f0' " :stroke-width="30"></t-progress>
      </div>
    </div>
  </div>
</template>

<style scoped>
.t-progress-demo-margin{
  margin-bottom: 10px;
  text-align: center;
}
.t-progress-demo-box{
    margin: 20px 0 10px;
    display: flex;
}
.t-progress-demo-inner{
    margin: 15px;
  &:first-of-type,&:last-of-type{
    margin: 0;
  }
}
</style>
