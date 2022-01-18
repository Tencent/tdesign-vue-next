<template>
  <div style="width: 60%">
    <t-tag-input v-model="tags" clearable @paste="onPaste" @enter="onTagInputEnter" />
    <br /><br />

    <t-tag-input :value="tags" label="Controlled: " clearable @change="onChange" />
    <br /><br />

    <t-tag-input :default-value="tags" label="UnControlled: " clearable />
    <br /><br />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TTagInputBaseDemo',
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
