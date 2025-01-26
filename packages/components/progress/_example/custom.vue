<template>
  <t-space direction="vertical" size="0">
    <t-space direction="vertical" size="small" class="t-progress-domo-width">
      <div>不显示标签</div>
      <t-progress theme="circle" :percentage="84" :label="false" />
      <t-progress theme="line" :percentage="84" :label="false" />
    </t-space>
    <t-space direction="vertical" size="small" class="t-progress-domo-margin t-progress-domo-width">
      <div>自定义高度</div>
      <t-progress theme="line" :percentage="30" :stroke-width="30" :color="['#FFC86E', '#E66A72']" />
      <div>自定义尺寸</div>
      <t-progress theme="circle" :percentage="30" :size="200" :stroke-width="20" />
    </t-space>
    <t-space direction="vertical" size="small" class="t-progress-domo-margin t-progress-domo-width">
      <div>自定义颜色</div>
      <t-progress theme="plump" :percentage="30" :color="{ '0%': '#7B7BE0', '100%': '#6392F7' }" />
      <t-progress theme="circle" :percentage="44" :color="'#52CC8D'" :track-color="'#aaa'" />
    </t-space>
    <t-space direction="vertical" size="small" class="t-progress-domo-margin t-progress-domo-width">
      <div>自定义内容</div>
      <t-progress theme="line" :percentage="30" :label="'<div>45days</div>'" />
      <t-progress theme="circle" :percentage="44" :label="'<div>45days</div>'" />
    </t-space>
  </t-space>
</template>

<style scoped>
.t-progress-domo-width {
  width: 100%;
}

.t-progress-domo-margin {
  margin-top: 20px;
}
</style>
