<template>
  <t-space direction="vertical" style="width: 80%">
    <t-tag-input v-model="tags1" clearable @paste="onPaste" @enter="onTagInputEnter" />

    <t-tag-input :value="tags2" label="Controlled: " clearable @change="onChange" />

    <t-tag-input :default-value="tags3" :input-value.sync="inputValue" label="UnControlled: " clearable />
  </t-space>
</template>
<script>
export default {
  data() {
    return {
      tags1: ['Vue', 'React1'],
      tags2: ['Vue', 'React2'],
      tags3: ['Vue', 'React3'],
      inputValue: '',
    };
  },
  methods: {
    onTagInputEnter(val, context) {
      console.log(val, context);
    },
    onChange(val, context) {
      console.log(val, context);
      this.tags2 = val;
    },
    onPaste(context) {
      console.log(context);
    },
  },
};
</script>
