<template>
  <div class="tdesign-demo-block">
    <h3>允许输入</h3>
    <t-time-picker v-model="time1" allow-input @blur="blur" @focus="focus" />
    <h3>禁止输入</h3>
    <t-time-picker v-model="time2" :allow-input="false" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const time1 = ref('20:22:33');
    const time2 = ref('22:22:22');
    return {
      time1,
      time2,
      blur(v) {
        console.log('blur');
        console.log(v);
      },
      focus(v) {
        console.log('focus');
        console.log(v);
      },
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
