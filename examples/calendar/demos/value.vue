<template>
  <t-calendar :value="value"></t-calendar>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      value: '1998-11-11',  // new Date(1998, 10, 11)
    };
  }
});
</script>
