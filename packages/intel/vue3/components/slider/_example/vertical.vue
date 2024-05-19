<template>
  <t-space size="200px" class="slider-demo-container">
    <t-slider v-model="value1" :layout="layout" :show-tooltip="true" />

    <t-slider v-model="value2" :layout="layout" range :show-tooltip="true" />
  </t-space>
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
      layout: 'vertical',
    };
  },
});
</script>
<style>
.slider-demo-container {
  padding: 30px 24px;
  height: 300px;
}
</style>
