<template>
  <div class="tag-demo">
    <div class="tdesign-demo-block">
      <t-check-tag
        v-for="(tag, index) in tags"
        :key="index"
        :checked="tag.checked"
        @click="handleClick(tag, index)"
      >
        {{ tag.name }}
      </t-check-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        {
          name: '选中1',
          checked: true,
        },
        {
          name: '选中2',
          checked: true,
        },
        {
          name: '未选3',
          checked: false,
        },
        {
          name: '未选4',
          checked: false,
        },
      ],
    };
  },
  methods: {
    handleClick(tag, index) {
      const toggleTag = { ...tag, checked: !tag.checked };
      this.$set(this.tags, index, toggleTag);
    },
  },
};
</script>

<style scoped>
.tag-demo .tdesign-demo-block {
  width: 500px;
  display: flex;
  justify-content: space-around;
}
</style>

