<template>
  <t-space :breakLine="true" :size="16">
    <t-space v-for="item in mode" direction="vertical" align="start" :key="item">
      <t-image
        src="https://tdesign.gtimg.com/demo/demo-image-1.png"
        :fit="item"
        :style="{ width: '120px', height: '120px' }"
      />
      <span>{{ item }}</span>
    </t-space>
  </t-space>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      mode: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    };
  },
  methods: {
    onEnter() {
      console.log('trigger enter');
    },
    onChange(val) {
      console.log(this.input, val);
    },
  },
});
</script>
