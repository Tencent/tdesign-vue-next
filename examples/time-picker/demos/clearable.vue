<template>
  <div class="tdesign-demo-block">
    <h3>具备清空按钮</h3>
    <t-time-picker v-model="time1" />
    <h3>禁止清空按钮</h3>
    <t-time-picker v-model="time2" :clearable="false" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const time1 = ref('11:12:10');
    const time2 = ref('11:12:10');

    return {
      time1,
      time2,
    };
  },
});
</script>
<style lang="less" scoped>
.tdesign-demo-block {
  h3 {
    margin-bottom: 20px;
    font-weight: bold;
  }
  h3:nth-child(3) {
    margin-top: 30px;
  }
}
</style>
