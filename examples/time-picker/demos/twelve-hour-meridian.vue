<template>
  <div class="tdesign-demo-block">
    <t-time-picker
      v-model="value"
      format="A hh:mm:ss"
      placeholder="选择时间"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('PM 10:20:30');
    return {
      value,
    };
  },
});
</script>
<style lang="less" scoped>
.tdesign-demo-block {
  h1 {
    margin-bottom: 20px;
    font-weight: bold;
    color: rgba(0, 0, 0, .5);
  }
  h1:nth-child(3) {
    margin-top: 30px;
  }
}
</style>
