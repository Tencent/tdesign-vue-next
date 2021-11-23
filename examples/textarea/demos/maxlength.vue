<template>
  <div>
    <t-textarea
      v-model="value"
      placeholder="请输入描述文案，最多20字符"
      :maxlength="20"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');
    return {
      value,
    };
  },
});
</script>
