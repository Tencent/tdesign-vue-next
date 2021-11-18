<template>
  <div>
    <t-input-number
      v-model="value1"
      size="small"
      :max="15"
      :min="-2"
    />

    <t-input-number
      v-model="value2"
      style="margin: 0 50px;"
      :max="15"
      :min="-2"
    />

    <t-input-number
      v-model="value3"
      size="large"
      :max="15"
      :min="-2"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref(3);
    const value2 = ref(3);
    const value3 = ref(3);
    return {
      value1,
      value2,
      value3,
    };
  },
});
</script>
