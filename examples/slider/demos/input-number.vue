<template>
  <div class="demo-slider">
    <div class="block">
      <t-slider v-model="value1" :show-tooltip="true" :input-number-props="inputNumberProps" />
    </div>
    <div class="block">
      <t-slider v-model="value2" range :show-tooltip="true" :input-number-props="inputNumberProps" />
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
    };
  },
});
</script>
<style>
.block {
  padding: 30px 24px;
}
</style>
