<template>
  <div class="demo-slider">
    <div class="vertical-block">
      <t-slider v-model="value1" :layout="layout" :show-tooltip="true" :input-number-props="false" />
    </div>

    <div class="vertical-block">
      <t-slider v-model="value2" :layout="layout" range :show-tooltip="true" :input-number-props="false" />
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
      layout: 'vertical',
    };
  },
});
</script>
<style>
.vertical-block {
  display: inline-block;
  padding: 30px 24px;
  height: 300px;
}
</style>
