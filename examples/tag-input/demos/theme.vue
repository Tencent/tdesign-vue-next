<template>
  <div class="tdesign-demo-block-column" style="width: 80%">
    <t-tag-input v-model="tags" placeholder="添加新标签" :tag-props="{ theme: 'primary' }" />
    <t-tag-input v-model="tags" placeholder="添加新标签" :tag-props="{ theme: 'success' }" />
    <t-tag-input v-model="tags" placeholder="添加新标签" :tag-props="{ theme: 'warning' }" />
    <t-tag-input v-model="tags" placeholder="添加新标签" :tag-props="{ theme: 'danger' }" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TTagInputTheme',
  setup() {
    const tags = ref(['Vue', 'React', 'Miniprogram']);
    return { tags };
  },
});
</script>
