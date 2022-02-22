<template>
  <div class="tdesign-demo-block-column" style="width: 80%">
    <t-tag-input v-model="tags" auto-width clearable />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TTagInputBaseDemo',
  setup() {
    const tags = ref(['Vue', 'React']);

    const onChange = (val) => {
      tags.value = val;
    };

    return { tags, onChange };
  },
});
</script>
