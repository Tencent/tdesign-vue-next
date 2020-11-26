<template>
  <t-calendar :range="range"></t-calendar>
</template>

<script>
export default {
  data() {
    return {
      range: {
        from: new Date(1998, 7),  // 1998-08
        to: new Date(2008, 3),  // 1998-04
      },
    };
  },
};
</script>
