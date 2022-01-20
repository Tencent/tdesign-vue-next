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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TTagInputTheme',
  setup() {
    const tags = ref(['Vue', 'React', 'Miniprogram']);
    return { tags };
  },
});
</script>
