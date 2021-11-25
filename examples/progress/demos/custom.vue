<template>
  <div>
    <div>
      <div>不显示标签</div>
      <t-progress theme="circle" :percentage="84" :label="false" />
      <t-progress theme="line" :percentage="84" :label="false" />
    </div>
    <div class="t-progress-domo-margin">
      <div>自定义高度</div>
      <t-progress theme="line" :percentage="30" :stroke-width="30" :color="['#FFC86E', '#E66A72']" />
      <div>自定义尺寸</div>
      <t-progress theme="circle" :percentage="30" :size="200" :stroke-width="20" />
    </div>
    <div class="t-progress-domo-margin">
      <div>自定义颜色</div>
      <t-progress theme="plump" :percentage="30" :color="{ '0%': '#7B7BE0', '100%': '#6392F7' }" />
      <t-progress theme="circle" :percentage="44" :color="'#52CC8D'" :track-color="'#aaa'" />
    </div>
    <div class="t-progress-domo-margin">
      <div>自定义内容</div>
      <t-progress theme="line" :percentage="30" :label="'<div>45days</div>'" />
      <t-progress theme="circle" :percentage="44" :label="'<div>45days</div>'" />
    </div>
  </div>
</template>
<script></script>
<style scoped>
.t-progress-domo-margin {
  margin-top: 20px;
}
</style>
