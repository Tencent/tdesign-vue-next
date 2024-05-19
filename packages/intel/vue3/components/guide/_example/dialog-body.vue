<template>
  <div class="dialog-body">
    <div class="img-wrapper">
      <img src="https://tdesign.gtimg.com/demo/demo-image-1.png" alt="demo" />
    </div>
    <p>此处显示本页引导的说明文案，可按需要撰写，如内容过多可折行显示。图文也可按需自由设计。</p>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.dialog-body {
  .img-wrapper {
    border-radius: var(--td-radius-default);
    overflow: hidden;
    img {
      vertical-align: bottom;
      width: 100%;
    }
  }

  p {
    margin-top: 24px;
    color: var(--td-text-color-secondary);
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    line-height: 22px;
  }
}
</style>
