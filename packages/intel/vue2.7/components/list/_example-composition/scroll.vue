<template>
  <t-list style="max-height: 200px" @scroll="scrollHandler" :onScroll="onScroll">
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
    <t-list-item>列表内容的描述性文字</t-list-item>
  </t-list>
</template>

<script setup>
const scrollHandler = (e) => {
  console.log(e);
};
const onScroll = (e) => {
  console.log('触发onScroll', e);
};
</script>
