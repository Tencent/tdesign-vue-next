<template>
  <div class="tdesign-demo-item--input__input-box">
    <t-input placeholder="请输入内容（无默认值）" />
    <br/><br/>
    <t-input v-model="input" placeholder="请输入内容（有默认值）" @enter="onEnter"/>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const input = ref('Welcome to TDesign');
    const onEnter = () => {
      console.log('trigger enter');
    }

    return {
      input,
      onEnter
    }
  }
});
</script>
