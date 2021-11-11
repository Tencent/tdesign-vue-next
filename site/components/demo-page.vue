<template>
  <div :class="_class">
    <component :is="demo"></component>
  </div>
</template>
<script>
export default {
  props: ['demo', 'componentName'],
  computed: {
    _class() {
      return `demo-${this.componentName}`;
    },
  },
};
</script>
