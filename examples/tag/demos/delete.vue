<template>
  <div class="tag-demo">
    <div class="tdesign-demo-block">
      <t-tag
        v-for="(tag, index) in tags"
        :key="index"
        :theme="tag.type"
        :icon="tag.icon"
        :variant="tag.variant"
        :maxWidth="tag.maxWidth"
        :closable="tag.showClose"
        @click="handleClick"
        @close="handleClose(index)"
      >
        {{ tag.name }}
      </t-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        {
          name: '隐藏叉',
          type: 'default',
          showClose: false,
        },
        {
          name: '显示叉',
          type: 'default',
          showClose: true,
        },
        {
          name: '可删除',
          type: 'info',
          icon: 'discount',
          showClose: true,
        },
        {
          name: '默认超过八个字超出部分隐藏',
          type: 'default',
          maxWidth: 150,
          showClose: false,
        },
        {
          name: '添加标签',
          type: 'info',
          icon: 'add',
          showClose: false,
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

<style lang="less" scoped>
.tag-demo .tdesign-demo-block {
  width: 800px;
  display: flex;
  justify-content: space-around;
}
</style>
