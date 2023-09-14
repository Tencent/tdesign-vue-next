<template>
  <t-space :size="32" direction="vertical" class="tdesign-tree-demo">
    <t-space :size="10" direction="vertical">
      <h3 class="title">默认为空状态</h3>
      <t-tree :data="[]" />
    </t-space>
    <t-space :size="10" direction="vertical">
      <h3 class="title">设置 empty 属性为指定字符串</h3>
      <t-tree :data="[]" empty="😊 空数据（string）" /><br />
    </t-space>
    <t-space :size="10" direction="vertical">
      <h3 class="title">jsx 形式</h3>
      <t-tree :data="[]" :empty="empty" />
    </t-space>
    <t-space :size="10" direction="vertical">
      <h3 class="title">slot 形式</h3>
      <t-tree :data="[]">
        <div slot="empty">😊 空数据（slot）</div>
      </t-tree>
    </t-space>
  </t-space>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      empty(h) {
        return <div>😊 空数据（ empty props ）</div>;
      },
    };
  },
};
</script>
