<template>
  <div style="width: 50%">
    <t-tag-input :value="tags" @change="onChange" @enter="onTagInputEnter" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TTagInputBase',
  data() {
    return {
      tags: ['Vue', 'React', 'Miniprogram'],
    };
  },
  methods: {
    onTagInputEnter(val, context) {
      console.log(val, context);
    },
    onChange(val, context) {
      console.log(val, context);
      this.tags = val;
    },
  },
});
</script>

<style lang="less" scoped></style>
