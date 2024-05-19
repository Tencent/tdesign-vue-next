<template>
  <div>
    <t-input-number v-model="value" :min="0" :autoWidth="true"></t-input-number>
  </div>
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
