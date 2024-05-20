<template>
  <t-space direction="vertical" style="width: 80%">
    <t-tag-input v-model="tags1" clearable @paste="onPaste" @enter="onTagInputEnter" />

    <t-tag-input :value="tags2" label="Controlled: " clearable @change="onChange" />

    <t-tag-input :default-value="tags3" :input-value.sync="inputValue" label="UnControlled: " clearable />
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const tags1 = ref(['Vue', 'React1']);
const tags2 = ref(['Vue', 'React2']);
const tags3 = ref(['Vue', 'React3']);
const inputValue = ref('');
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
