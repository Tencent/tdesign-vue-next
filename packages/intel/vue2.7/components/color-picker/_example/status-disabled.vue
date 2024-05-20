<template>
  <t-color-picker v-model="color" disabled />
</template>
<script>
export default {
  data() {
    return {
      color: 'red',
    };
  },
};
</script>
