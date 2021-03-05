<template>
  <div>
    <div>
      <div class="t-progress-domo-margin">默认样式</div>
      <t-progress theme="line" :percentage="30" ></t-progress>
      <div class="t-progress-domo-margin">100%</div>
      <t-progress theme="line" :percentage="100" ></t-progress>
      <div class="t-progress-domo-margin">进度完成</div>
      <t-progress theme="line" :status="'success'" :percentage="30" ></t-progress>
      <div class="t-progress-domo-margin">进度状态发生重大错误</div>
      <t-progress theme="line" :status="'error'" :percentage="30" ></t-progress>
      <div class="t-progress-domo-margin">进度被中断</div>
      <t-progress theme="line" :status="'warning'" :percentage="30" ></t-progress>
      <div class="t-progress-domo-margin">active</div>
      <t-progress theme="line" :status="'active'" :percentage="30" ></t-progress>
      <div class="t-progress-domo-margin">不显示数字</div>
      <t-progress theme="line" :label="false" :status="'active'" :percentage="30" ></t-progress>
      <div class="t-progress-domo-margin">自定义内容</div>
      <t-progress theme="line" :label="'75day'" :status="'active'" :percentage="30" ></t-progress>
      <div class="t-progress-domo-margin">自定义颜色与高度</div>
      <t-progress theme="line" :strokeWidth="30" :color="'#00f'" :trackColor="'#0f0'" :status="'active'" :percentage="30" ></t-progress>
      <div class="t-progress-domo-margin">渐变色</div>
      <t-progress theme="line" :color="['#f00', '#0ff', '#f0f']" :status="'active'" :percentage="30" ></t-progress>
      <br/>
      <t-progress theme="line" :color="{ '0%': '#f00', '100%': '#0ff' }" :status="'active'" :percentage="30" ></t-progress>
      <br />
      <t-progress theme="line" :color="{ from: '#f00', to: '#0f0' }" :percentage="30" :status="'active'"></t-progress>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      style: { margin: '20px 0 10px' },
    };
  },
};
</script>
<style scoped>
.t-progress-domo-margin{
  margin: 10px 0 5px
}
</style>
