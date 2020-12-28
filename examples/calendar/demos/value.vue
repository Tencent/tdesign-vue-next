<template>
  <t-calendar :value="value"></t-calendar>
</template>

<script>
export default {
  data() {
    return {
      value: '1998-11-11',  // new Date(1998, 10, 11)
    };
  },
};
</script>
