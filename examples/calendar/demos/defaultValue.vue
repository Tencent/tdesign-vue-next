<template>
  <t-calendar :defaultValue="defaultValue"></t-calendar>
</template>

<script>
export default {
  data() {
    return {
      // 1998-11-11
      defaultValue: new Date(1998, 10, 11),
    };
  },
};
</script>
