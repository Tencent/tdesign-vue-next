<template>
  <div class="tdesign-demo-block-column" style="width: 80%">
    <t-tag-input v-model="tags1" clearable @paste="onPaste" @enter="onTagInputEnter" />

    <t-tag-input :value="tags2" label="Controlled: " clearable @change="onChange" />

    <t-tag-input :default-value="tags3" label="UnControlled: " clearable />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tags1 = ref(['Vue', 'React']);
const tags2 = ref(['Vue', 'React']);
const tags3 = ref(['Vue', 'React']);

const onTagInputEnter = (val, context) => {
  console.log(val, context);
};
const onChange = (val, context) => {
  console.log(val, context);
  tags2.value = val;
};
const onPaste = (context) => {
  console.log(context);
};
</script>
