<template>
  <t-space direction="vertical">
    <p style="margin: 10px 0">默认暂无数据</p>
    <t-transfer :data="list" />
    <p style="margin: 10px">自定义空状态</p>
    <t-transfer :data="list" empty="No Data" />
  </t-space>
</template>
<script>
const initialList = [];
export default {
  data() {
    return {
      list: initialList,
    };
  },
};
</script>
