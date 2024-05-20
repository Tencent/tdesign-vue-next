<template>
  <t-tag-input v-model="tags" auto-width clearable />
</template>
<script>
export default {
  data() {
    return {
      tags: ['Vue', 'React'],
    };
  },
};
</script>
