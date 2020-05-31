<template>
  <div>
    <t-tag
      v-for="(tag, index) in tags"
      :key="index"
      :checked="tag.checked"
      :disabled="tag.disabled"
      @click="handleClick(tag, index)"
    >
      {{ tag.name }}
    </t-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        {
          name: '标签一',
          checked: false,
          disabled: false,
        },
        {
          name: '标签二',
          checked: false,
          disabled: true,
        },
        {
          name: '标签三',
          checked: true,
          disabled: false,
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
