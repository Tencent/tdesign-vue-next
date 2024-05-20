<template>
  <t-rate v-model="value" :count="7" />
</template>
<script>
export default {
  data() {
    return {
      value: 3,
    };
  },
};
</script>
