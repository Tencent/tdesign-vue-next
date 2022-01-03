<template>
  <div style="width: 100%">
    <t-tag-input placeholder="type username" :value="tags" clearable @change="onChange">
      <template #valueDisplay>
        <t-tag v-for="item in tags" :key="item" style="margin-right: 4px">
          <img
            src="https://tdesign.gtimg.com/site/avatar.jpg"
            style="max-width: 20px; max-height: 20px; border-radius: 50%"
          />
          <span>&nbsp;&nbsp;{{ item }}</span>
        </t-tag>
      </template>
    </t-tag-input>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TTagInputCustom',
  data() {
    return {
      tags: ['StudentA', 'StudentB', 'StudentC', 'StudentD'],
    };
  },
  methods: {
    onChange(val) {
      const timer = setTimeout(() => {
        this.tags = val;
        clearTimeout(timer);
      }, 80);
    },
  },
});
</script>
