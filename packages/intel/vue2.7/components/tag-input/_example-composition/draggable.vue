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

<script setup>
import { reactive } from 'vue';

const tags1 = reactive(['Vue', 'React', 'Angular']);
const tags2 = reactive(['Vue', 'React', 'Angular', 'Miniprogram']);
const onTagInputEnter = (val, context) => {
  console.log(val, context);
};
const onChange = (val, context) => {
  console.log(val, context);
};
const onChange2 = (val, context) => {
  console.log(val, context);
};
const onPaste = (context) => {
  console.log(context);
};
const onDragSort = ({ currentIndex, targetIndex }) => {
  const temp = tags1[targetIndex];
  tags1[targetIndex] = tags1[currentIndex];
  tags1[currentIndex] = temp;
};
const onDragSort2 = ({ currentIndex, targetIndex }) => {
  const temp = tags2[targetIndex];
  tags2[targetIndex] = tags2[currentIndex];
  tags2[currentIndex] = temp;
};
</script>
