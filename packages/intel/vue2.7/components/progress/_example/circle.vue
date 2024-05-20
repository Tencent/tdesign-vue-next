<template>
  <t-space direction="vertical" :size="36">
    <div>默认</div>
    <!-- 重要：strokeWidth 大小不能超过 size 的一半，否则无法渲染出环形 -->
    <t-space :size="78" class="ml-36px">
      <t-space direction="vertical" align="center" :size="10">
        <div>默认样式</div>
        <t-progress theme="circle" :percentage="30"></t-progress>
      </t-space>
      <t-space direction="vertical" align="center" :size="10">
        <div>不显示数字</div>
        <t-progress theme="circle" :label="false" :percentage="100" :status="'success'"></t-progress>
      </t-space>
      <t-space direction="vertical" align="center" :size="10">
        <div>自定义内容</div>
        <t-progress theme="circle" :label="'75day'" :percentage="50" :status="'success'"></t-progress>
      </t-space>
    </t-space>

    <t-space :size="78" class="ml-36px">
      <t-space direction="vertical" align="center" :size="10">
        <div>进度完成</div>
        <t-progress theme="circle" :percentage="100" :status="'success'"></t-progress>
      </t-space>
      <t-space direction="vertical" align="center" :size="10">
        <div>进度状态发生错误</div>
        <t-progress theme="circle" :percentage="75" :status="'error'"></t-progress>
      </t-space>
      <t-space direction="vertical" align="center" :size="10">
        <div>进度被中断</div>
        <t-progress theme="circle" :percentage="50" :status="'warning'"></t-progress>
      </t-space>
    </t-space>

    <div>默认不同尺寸</div>
    <t-space :size="110" class="ml-44px">
      <t-space direction="vertical" align="center" :size="10">
        <div>小尺寸</div>
        <t-progress theme="circle" :percentage="30" :size="'small'"></t-progress>
      </t-space>
      <t-space direction="vertical" align="center" :size="10">
        <div>默认尺寸</div>
        <t-progress theme="circle" :percentage="30" :size="'medium'"></t-progress>
      </t-space>
      <t-space direction="vertical" align="center" :size="10">
        <div>大尺寸</div>
        <t-progress theme="circle" :percentage="75" :size="'large'"></t-progress>
      </t-space>
    </t-space>
  </t-space>
</template>

<style lang="less" scoped>
.ml-36px {
  margin-left: 36px;
}
.ml-44px {
  margin-left: 44px;
}
</style>
