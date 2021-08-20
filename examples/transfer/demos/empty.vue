<template>
  <div>
    <p style="margin: 10px 0px;">默认暂无数据</p>
    <t-transfer
      :data="list"
    />
    <p style="margin: 10px">自定义空状态</p>
    <t-transfer
      :data="list"
      empty="No Data"
    />
  </div>
</template>
<script>
const list = [];
export default {
  data() {
    return {
      list,
    };
  },
};
</script>
