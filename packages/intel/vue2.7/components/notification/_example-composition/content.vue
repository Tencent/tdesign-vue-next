<template>
  <t-space direction="vertical" :size="20">
    <t-notification title="自定义内容(字符串)" content="这是一条消息通知" />
    <t-notification title="自定义内容(函数)" :content="content" />
    <t-notification title="自定义内容(插槽)">
      <span>这是一条消息通知</span>
    </t-notification>
  </t-space>
</template>

<script setup lang="jsx">
const content = () => <div>这是一条消息通知</div>;
</script>
