<template>
  <div class="tdesign-demo-block-column" style="width: 80%">
    <t-tag-input v-model="tags1" size="small" clearable @paste="onPaste" @enter="onTagInputEnter" />

    <t-tag-input :value="tags2" clearable @change="onChange" />

    <t-tag-input :default-value="tags3" size="large" clearable />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TTagInputSizeDemo',
  setup() {
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

    return { tags1, tags2, tags3, onTagInputEnter, onChange, onPaste };
  },
});
</script>
