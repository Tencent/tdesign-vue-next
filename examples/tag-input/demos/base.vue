<template>
  <div style="width: 60%">
    <t-tag-input v-model="tags1" clearable @paste="onPaste" @enter="onTagInputEnter" />
    <br /><br />

    <t-tag-input :value="tags2" label="Controlled: " clearable @change="onChange" />
    <br /><br />

    <t-tag-input :default-value="tags3" label="UnControlled: " clearable />
    <br /><br />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TTagInputBaseDemo',
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
