<template>
  <t-list style="max-height: 200px;" @scroll="scrollHandler">
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
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      scrollHandler(e) {
        console.log(e);
      }
    }
  }
});
</script>
