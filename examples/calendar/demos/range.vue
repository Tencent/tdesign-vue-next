<template>
  <t-calendar :range="range"></t-calendar>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      range: [
        '2018-08',  // new Date(2017, 7),
        '2028-04',  // new Date(2027, 3),
      ],
    }
  }
});
</script>
