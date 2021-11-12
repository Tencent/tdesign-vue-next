<template>
  <div class="tdesign-demo-block">
    <t-time-picker v-model="time1" :disabled="true" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: 'disabled',
  setup() {
    const time1 = ref('11:12:10');

    return {
      time1,
    }
  }
});
</script>
