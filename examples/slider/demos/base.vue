<template>
  <div class="demo-slider">
    <div class="block">
      <t-slider v-model="value1" />
    </div>

    <div class="block">
      <t-slider v-model="value2" range :tooltip-props="{}" />
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
      tooltipProps: {},
    };
  },
});
</script>
<style>
.block {
  padding: 30px 24px;
}
</style>
