<template>
  <t-list style="max-height: 200px" @scroll="scrollHandler">
    <t-list-item v-for="index in 15" :key="`scroll${index}`">列表内容的描述性文字</t-list-item>
  </t-list>
</template>

<script lang="ts" setup>
import { ListProps } from 'tdesign-vue-next';
const scrollHandler: ListProps['onScroll'] = (e) => console.log(e);
</script>
