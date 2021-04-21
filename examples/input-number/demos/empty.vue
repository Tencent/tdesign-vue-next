<template>
  <div>
    <t-input-number
      v-model="value"
      placeholder="输入"
    ></t-input-number>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: undefined,
    };
  },
};
</script>
