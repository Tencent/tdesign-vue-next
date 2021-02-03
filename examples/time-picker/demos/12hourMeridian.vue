<template>
  <div class="tdesign-demo-block">
    <h1>后置展示</h1>
    <t-time-picker  format="hh:mm:ss a" />
    <h1>前置展示</h1>
    <t-time-picker  format="a hh:mm:ss" />
  </div>
</template>

<script>
export default {
  name: 'twelveHours',
  data() {
    return {
    };
  },
};
</script>
<style lang="less" scoped>
.tdesign-demo-block {
  h1 {
    margin-bottom: 20px;
    font-weight: bold;
    color: rgba(0,0,0,.5)
  }
  h1:nth-child(3) {
    margin-top: 30px;
  }
}
</style>
