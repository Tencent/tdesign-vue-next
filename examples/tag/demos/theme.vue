<template>
  <div class="tdesign-tag-theme">
    <div class="tdesign-demo-block">
      深色
      <t-tag theme="primary">
        标签一
      </t-tag>
      <t-tag theme="success">
        标签二
      </t-tag>
      <t-tag theme="warning">
        标签三
      </t-tag>
      <t-tag theme="danger">
        标签四
      </t-tag>
    </div>
    <div class="tdesign-demo-block light">
      浅色
      <t-tag
        theme="primary"
        variant="light"
      >
        标签一
      </t-tag>
      <t-tag
        theme="success"
        variant="light"
      >
        标签二
      </t-tag>
      <t-tag
        theme="warning"
        variant="light"
      >
        标签三
      </t-tag>
      <t-tag
        theme="danger"
        variant="light"
      >
        标签四
      </t-tag>
    </div>
    <div class="tdesign-demo-block plain">
      朴素
      <t-tag
        variant="plain"
        theme="primary"
      >
        标签一
      </t-tag>
      <t-tag
        variant="plain"
        theme="success"
      >
        标签二
      </t-tag>
      <t-tag
        variant="plain"
        theme="warning"
      >
        标签三
      </t-tag>
      <t-tag
        variant="plain"
        theme="danger"
      >
        标签四
      </t-tag>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tdesign-tag-theme .tdesign-demo-block {
  width: 600px;
  display: flex;
  justify-content: space-around;
}
</style>
