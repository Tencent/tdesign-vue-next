<template>
  <t-space direction="vertical">
    <t-tag-input
      v-model="tags1"
      clearable
      drag-sort
      placeholder="请输入"
      @paste="onPaste"
      @enter="onTagInputEnter"
      @change="onChange"
      @drag-sort="onDragSort"
    />
    <t-tag-input
      v-model="tags2"
      drag-sort
      clearable
      label="Controlled: "
      excess-tags-display-type="break-line"
      placeholder="请输入"
      @change="onChange2"
      @drag-sort="onDragSort2"
    />
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      tags1: ['Vue', 'React', 'Angular'],
      tags2: ['Vue', 'React', 'Angular', 'Miniprogram'],
    };
  },
  methods: {
    onTagInputEnter(val, context) {
      console.log(val, context);
    },

    onChange(val, context) {
      console.log(val, context);
    },

    onChange2(val, context) {
      console.log(val, context);
    },

    onPaste(context) {
      console.log(context);
    },

    onDragSort({ currentIndex, targetIndex }) {
      const temp = this.tags1[targetIndex];
      this.$set(this.tags1, targetIndex, this.tags1[currentIndex]);
      this.$set(this.tags1, currentIndex, temp);
    },

    onDragSort2({ currentIndex, targetIndex }) {
      const temp = this.tags2[targetIndex];
      this.$set(this.tags2, targetIndex, this.tags2[currentIndex]);
      this.$set(this.tags2, currentIndex, temp);
    },
  },
};
</script>
