<template>
  <div class="tdesign-tag-closable">
    <t-tag
      v-for="(tag, index) in tags"
      :key="index"
      closable
      @click="handleClick"
      @close="handleClose(index)"
    >
      {{ tag }}
    </t-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: ['标签一', '标签二', '标签三'],
    };
  },
  methods: {
    handleClose(index) {
      this.tags.splice(index, 1);
    },
    handleClick(event) {
      console.log(event);
    },
  },
};
</script>
