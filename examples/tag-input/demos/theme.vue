<template>
  <div style="width: 50%">
    <t-tag-input
      placeholder="输入内容后按下 Enter 键添加新标签"
      :tag-props="{ theme: 'primary' }"
      :value="tags"
      @change="onChange"
    />
    <br /><br />
    <t-tag-input
      placeholder="输入内容后按下 Enter 键添加新标签"
      :tag-props="{ theme: 'success' }"
      :value="tags"
      @change="onChange"
    />
    <br /><br />
    <t-tag-input
      placeholder="输入内容后按下 Enter 键添加新标签"
      :tag-props="{ theme: 'warning' }"
      :value="tags"
      @change="onChange"
    />
    <br /><br />
    <t-tag-input
      placeholder="输入内容后按下 Enter 键添加新标签"
      :tag-props="{ theme: 'danger' }"
      :value="tags"
      @change="onChange"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TTagInputTheme',
  data() {
    return {
      tags: ['Vue', 'React', 'Miniprogram'],
    };
  },
  methods: {
    onChange(val) {
      this.tags = val;
    },
  },
});
</script>

<style lang="less" scoped></style>
