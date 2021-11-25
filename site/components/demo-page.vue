<template>
  <div :class="_class">
    <component :is="demo" />
  </div>
</template>
<script>
export default {
  props: {
    demo: {
      type: Object,
      default: () => {},
    },
    componentName: {
      type: String,
      default: '',
    },
  },
  computed: {
    _class() {
      return `demo-${this.componentName}`;
    },
  },
};
</script>
