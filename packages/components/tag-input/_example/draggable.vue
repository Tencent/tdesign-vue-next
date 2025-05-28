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
import { ref } from 'vue';

const tags1 = ref(['Vue', 'React', 'Angular']);
const tags2 = ref(['Vue', 'React', 'Angular', 'Miniprogram']);

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

function onDragSort({ currentIndex, targetIndex }) {
  const temp = tags1.value[currentIndex];
  tags1.value[currentIndex] = tags1.value[targetIndex];
  tags1.value[targetIndex] = temp;
}

function onDragSort2({ currentIndex, targetIndex }) {
  const temp = tags2.value[currentIndex];
  tags2.value[currentIndex] = tags2.value[targetIndex];
  tags2.value[targetIndex] = temp;
}
</script>

<style></style>
