<template>
  <t-calendar :range="range"></t-calendar>
</template>

<script>
export default {
  data() {
    return {
      range: [
        '2018-08',  // new Date(2017, 7),
        '2028-04',  // new Date(2027, 3),
      ],
    };
  },
};
</script>
