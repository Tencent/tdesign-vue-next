<template>
  <div style="width: 60%">
    <t-tag-input :value="tags" clearable @paste="onPaste" @change="onChange" @enter="onTagInputEnter" />
    <br /><br />

    <!-- 标签数量超出时，滚动显示 -->
    <t-tag-input :value="tags" label="Scroll: " clearable @change="onChange" />
    <br /><br />

    <!-- 标签数量超出时，换行显示 -->
    <t-tag-input :value="tags" label="BreakLine: " over-tags-display-type="break-line" clearable @change="onChange" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TTagInputBase',
  data() {
    return {
      tags: ['Vue', 'React'],
    };
  },
  methods: {
    onTagInputEnter(val, context) {
      console.log(val, context);
    },
    onChange(val, context) {
      console.log(val, context);
      this.tags = val;
    },
    onPaste(context) {
      console.log(context);
    },
  },
});
</script>
