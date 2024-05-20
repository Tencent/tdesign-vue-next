<template>
  <t-space direction="vertical" :size="20">
    <div>
      <div>不显示标签</div>
      <t-progress theme="circle" :percentage="84" :label="false"></t-progress>
      <t-progress theme="line" :percentage="84" :label="false"></t-progress>
    </div>
    <div>
      <div>自定义高度</div>
      <t-progress theme="line" :percentage="30" :strokeWidth="30" :color="['#FFC86E', '#E66A72']"></t-progress>
      <div>自定义尺寸</div>
      <t-progress theme="circle" :percentage="30" :size="200" :strokeWidth="20"></t-progress>
    </div>
    <div>
      <div>自定义颜色</div>
      <t-progress theme="plump" :percentage="30" :color="{ '0%': '#7B7BE0', '100%': '#6392F7' }"></t-progress>
      <t-progress theme="circle" :percentage="44" :color="'#52CC8D'" :trackColor="'#aaa'"></t-progress>
    </div>
    <div>
      <div>自定义内容</div>
      <t-progress theme="line" :percentage="30" :label="'<div>45days</div>'"></t-progress>
      <t-progress theme="circle" :percentage="44" :label="'<div>45days</div>'"></t-progress>
    </div>
  </t-space>
</template>

<style scoped></style>
