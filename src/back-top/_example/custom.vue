<template>
  <t-space style="position: relative" direction="vertical">
    <t-space>
      <t-back-top style="position: relative" :visible-height="0" size="medium" :offset="[0, 0]">
        <backtop-icon size="24"></backtop-icon>
        <div>返回顶部</div>
      </t-back-top>
      <t-back-top
        style="position: relative"
        :visible-height="0"
        size="medium"
        :offset="[0, 0]"
        content="返回顶部"
      ></t-back-top>
      <t-back-top
        style="position: relative"
        :visible-height="0"
        size="medium"
        :offset="[0, 0]"
        default="返回顶部"
      ></t-back-top>
    </t-space>
  </t-space>
</template>
<script setup lang="ts">
import { BacktopIcon } from 'tdesign-icons-vue-next';
</script>
