<template>
  <div class="t-demo-iconfont">
    <div class="t-demo-row">
      <loading-icon />
      <close-icon @click="onIconClose" />
      <check-circle-filled-icon />
    </div>
    <br />
    <div class="t-demo-row">
      <check-circle-filled-icon size="small" />
      <check-circle-filled-icon />
      <check-circle-filled-icon size="medium" />
      <check-circle-filled-icon size="large" />
      <check-circle-filled-icon size="25px" />
      <check-circle-filled-icon size="2em" />
    </div>
    <br />
    <div class="t-demo-row">
      <check-circle-filled-icon style="color: red" />
      <check-circle-filled-icon style="color: green" />
      <check-circle-filled-icon style="color: orange" />
    </div>
  </div>
</template>

<script>
import { LoadingIcon, CloseIcon, CheckCircleFilledIcon } from 'tdesign-icons-vue-next';

export default {
  components: { LoadingIcon, CloseIcon, CheckCircleFilledIcon },
  methods: {
    onIconClose() {
      console.log('icon was clicked.');
    },
  },
};
</script>
