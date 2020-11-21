<template>
  <t-calendar :mode="mode"></t-calendar>
</template>

<script>
export default {
  data() {
    return {
      mode: 'year',
    };
  },
};
</script>
