<template>
  <div :class="selfClass">
    <component :is="demo" />
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
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
  setup(props) {
    const selfClass = computed(() => {
      const { componentName } = props;
      return `demo-${componentName}`;
    });
    return {
      selfClass,
    };
  },
});
</script>
