<template>
  <t-space direction="vertical">
    <t-tag-input
      v-model="tags1"
      clearable
      drag-sort
      placeholder="请输入"
      @paste="onPaste"
      @enter="onTagInputEnter"
      @change="onChange"
      @drag-sort="onDragSort"
    />

    <t-tag-input
      v-model="tags2"
      drag-sort
      clearable
      label="Controlled: "
      excess-tags-display-type="break-line"
      placeholder="请输入"
      @change="onChange2"
      @drag-sort="onDragSort2"
    />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TagInputProps, TagInputDragSortContext } from 'tdesign-vue-next';
const tags1 = ref(['Vue', 'React', 'Angular']);
const tags2 = ref(['Vue', 'React', 'Angular', 'Miniprogram']);
const onTagInputEnter: TagInputProps['onEnter'] = (val, context) => {
  console.log(val, context);
};
const onChange: TagInputProps['onChange'] = (val, context) => {
  console.log(val, context);
};
const onChange2: TagInputProps['onChange'] = (val, context) => {
  console.log(val, context);
};
const onPaste: TagInputProps['onPaste'] = (context) => {
  console.log(context);
};
function onDragSort({ currentIndex, targetIndex }: TagInputDragSortContext) {
  const temp = tags1.value[currentIndex];
  tags1.value[currentIndex] = tags1.value[targetIndex];
  tags1.value[targetIndex] = temp;
}
function onDragSort2({ currentIndex, targetIndex }: TagInputDragSortContext) {
  const temp = tags2.value[currentIndex];
  tags2.value[currentIndex] = tags2.value[targetIndex];
  tags2.value[targetIndex] = temp;
}
</script>
