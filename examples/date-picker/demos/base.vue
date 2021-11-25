<template>
  <div class="tdesign-demo-item--datepicker">
    <t-date-picker v-model="date" theme="primary" mode="date" clearable />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const date = ref('2021-11-10');
    return {
      date,
    };
  },
});
</script>
