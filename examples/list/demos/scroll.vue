<template>
  <t-list style="max-height: 200px;" @scroll="scrollHandler" :onScroll="onScroll">
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
    <t-list-item>列表内容列表内容</t-list-item>
  </t-list>
</template>

<script>
export default {
  methods: {
    scrollHandler(e) {
      console.log(e);
    },
    onScroll(e) {
      console.log('触发onScroll', e);
    },
  },
};
</script>
