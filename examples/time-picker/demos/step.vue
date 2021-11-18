<template>
  <div class="tdesign-demo-block">
    <t-time-picker
      v-model="time1"
      :steps="[1,2,3]"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const time1 = ref('09:18:17');
    return {
      time1,
    };
  },
});
</script>
