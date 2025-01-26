<template>
  <t-space direction="vertical">
    <t-notification theme="info" title="标题名称" content="这是一条消息通知" />
    <t-notification
      v-if="show"
      theme="info"
      title="标题名称"
      content="这是一条消息通知（展示 5 秒后消失）"
      :duration="5000"
      @duration-end="show = false"
    />
    <t-button v-if="!show" variant="outline" @click="show = true">点击打开计时通知</t-button>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const show = ref(true);
</script>
