<template>
  <router-view />
  <p>main</p>
  <t-button theme="primary">111</t-button>
  <t-button theme="danger">111</t-button>
</template>

<script>
import { defineComponent } from 'vue';
import Button from '@src/button';

export default defineComponent({
  components: { Button },
  mounted() {
    console.log(1);
  },
});
</script>

<style >
html, body {
  padding: 30px;
}
</style>
