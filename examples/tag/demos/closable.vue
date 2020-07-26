<template>
  <div class="tdesign-tag-closable">
    <t-tag
      v-for="(tag, index) in tags"
      :key="index"
      :theme="tag.type"
      :effect="tag.effect"
      closable
      @click="handleClick"
      @close="handleClose(index)"
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
          type: 'default',
        },
        {
          name: '标签二',
          type: 'primary',
          effect: 'plain',
        },
        {
          name: '标签三',
          type: 'info',
          effect: 'plain',
        },
        {
          name: '标签四',
          type: 'warning',
          effect: 'plain',
        },
        {
          name: '标签五',
          type: 'danger',
          effect: 'plain',
        },
        {
          name: '标签六',
          type: 'success',
          effect: 'plain',
        },
      ],
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
