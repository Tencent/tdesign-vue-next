<template>
  <t-calendar :value="value"></t-calendar>
</template>

<script>
export default {
  data() {
    return {
      // 1998-11-11
      value: new Date(1998, 10, 11),
    };
  },
};
</script>
