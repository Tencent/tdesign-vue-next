<template>
  <div>
    <t-input-number
      v-model="value"
      placeholder="输入"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(undefined);
    return {
      value,
    };
  },
});
</script>
