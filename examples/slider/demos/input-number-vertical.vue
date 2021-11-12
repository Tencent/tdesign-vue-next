<template>
  <div class="demo-slider">
    <div class="number-vertical-block">
      <t-slider v-model="value1" :layout="layout" :show-tooltip="true" :inputNumberProps="inputNumberProps" />
    </div>

    <div class="number-vertical-block">
      <t-slider v-model="value2" :layout="layout" range :show-tooltip="true" :inputNumberProps="inputNumberProps" />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref(12);
    const value2 = ref([30, 70]);

    return {
      value1,
      value2,
      inputNumberProps: { theme: 'column' },
      layout: 'vertical',
    }
  },
});
</script>
<style>
.number-vertical-block {
  display: inline-block;
  padding: 30px 24px;
  height: 300px;
}
</style>
