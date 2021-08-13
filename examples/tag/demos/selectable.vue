<template>
  <div class="tag-demo">
    <t-check-tag
      v-for="(tag, index) in tags"
      :key="index"
      :defaultChecked="tag.defaultChecked"
      :disabled="!!tag.disabled"
      @click="handleClick(tag, index)"
      @change="handleChange"
    >
      {{ tag.name }}
    </t-check-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        {
          name: '选中',
          defaultChecked: true,
        },
        {
          name: '未选',
        },
        {
          name: 'Disabled',
          disabled: true,
        },
      ],
    };
  },
  methods: {
    handleClick(tag, index) {
      console.log(tag, index);
    },
    handleChange(isChecked) {
      console.log(isChecked);
    },
  },
};
</script>

<style lang="less" scoped>
.tag-demo {
  width: 500px;
  display: flex;
  > * {
    margin-right: 30px;
  }
}
</style>
