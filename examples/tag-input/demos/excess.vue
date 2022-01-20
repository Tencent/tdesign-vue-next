<template>
  <div class="tdesign-demo-block-column" style="width: 80%">
    <!-- 标签数量超出时，滚动显示 -->
    <t-tag-input v-model="tags" label="Scroll: " clearable />

    <!-- 标签数量超出时，换行显示 -->
    <t-tag-input v-model="tags" label="BreakLine: " excess-tags-display-type="break-line" clearable />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TTagInputExcessDemo',
  setup() {
    const tags = ref(['Vue', 'React']);
    return { tags };
  },
});
</script>
