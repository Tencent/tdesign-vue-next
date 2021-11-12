<template>
  <div class="demo-slider">
    <div class="block">
      <t-slider v-model="value1" :show-tooltip="true" :marks="marks1" :inputNumberProps="false" />
    </div>

    <div class="block">
      <t-slider v-model="value2" range :show-tooltip="true" :marks="marks2" :inputNumberProps="false" />
    </div>
  </div>
</template>
<script lang='jsx'>
import { defineComponent, ref } from 'vue';

export default {
  setup() {
    const value1 = ref(12);
    const value2 = ref([30, 70]);

    return {
      value1,
      value2,
      marks1: {
        0: '0°C',
        20: '20°C',
        40: '40°C',
        60: '60°C',
        80: <span style="color: #0052d9">80°C</span>,
        100: <span style="color: #0052d9">100°C</span>,
      },
      marks2: {
        0: '0°C',
        20: '20°C',
        40: '40°C',
        60: '60°C',
        80: <span style="color: #0052d9">80°C</span>,
        100: '100°C',
      },
    }
  },
};
</script>
<style>
.block {
  padding: 30px 24px;
}
</style>
