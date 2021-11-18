<template>
  <div class="tdesign-demo-block">
    <h1>具备清空按钮</h1>
    <t-time-picker
      v-model="time1"
      clearable
    />
    <h1>禁止清空按钮</h1>
    <t-time-picker :clearable="false" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const time1 = ref('11:12:10');

    return {
      time1,
    };
  },
});
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
