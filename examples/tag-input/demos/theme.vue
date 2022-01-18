<template>
  <div style="width: 50%">
    <t-tag-input v-model="tags" placeholder="添加新标签" :tag-props="{ theme: 'primary' }" />
    <br /><br />
    <t-tag-input v-model="tags" placeholder="添加新标签" :tag-props="{ theme: 'success' }" />
    <br /><br />
    <t-tag-input v-model="tags" placeholder="添加新标签" :tag-props="{ theme: 'warning' }" />
    <br /><br />
    <t-tag-input v-model="tags" placeholder="添加新标签" :tag-props="{ theme: 'danger' }" />
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
});
</script>

<style lang="less" scoped></style>
