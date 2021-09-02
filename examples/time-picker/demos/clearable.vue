<template>
  <div class="tdesign-demo-block">
    <h1>具备清空按钮</h1>
    <t-time-picker v-model="time1" />
    <h1>禁止清空按钮</h1>
    <t-time-picker v-model="time2" :clearable="disabledClear" />
  </div>
</template>

<script>
export default {
  name: 'clearable',
  data() {
    return {
      time1: '11:12:10',
      time2: '11:12:10',
      disabledClear: false,
    };
  },
  methods: {
    onClear() {
      this.time1 = null;
    },
  },
};
</script>
<style lang="less" scoped>
.tdesign-demo-block {
  h1 {
    margin-bottom: 20px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.5);
  }
  h1:nth-child(3) {
    margin-top: 30px;
  }
}
</style>
