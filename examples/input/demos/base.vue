<template>
  <div class="tdesign-demo-item--input__input-box">
    <t-input placeholder="请输入内容（无默认值）" />
    <br/><br/>
    <t-input v-model="input" placeholder="请输入内容（有默认值）" @keydown-enter="onEnter"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: '',
    };
  },
  methods: {
    onEnter() {
      console.log('trigger enter');
    },
  },
};
</script>
