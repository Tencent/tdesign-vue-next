<template>
  <div class="tdesign-demo-block">
    <t-time-picker class="demos" v-model="time1"> </t-time-picker>
    <t-time-picker class="demos" v-model="time2"> </t-time-picker>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const time1 = ref('20:22');
    const time2 = ref('21:22');
    return {
      time1,
      time2
    }
  }
});
</script>

<style scoped>
.demos {
  margin-top: 20px;
}
</style>
