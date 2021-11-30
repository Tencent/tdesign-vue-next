<template>
  <div class="t-demo-iconfont">
    <div class="t-demo-row">
      <t-icon-loading />
      <t-icon-close @click="onIconClose" />
      <t-icon-check-circle-filled />
    </div>
    <br />
    <div class="t-demo-row">
      <t-icon-check-circle-filled size="small" />
      <t-icon-check-circle-filled />
      <t-icon-check-circle-filled size="medium" />
      <t-icon-check-circle-filled size="large" />
      <t-icon-check-circle-filled size="25px" />
      <t-icon-check-circle-filled size="2em" />
    </div>
    <br />
    <div class="t-demo-row">
      <t-icon-check-circle-filled style="color: red" />
      <t-icon-check-circle-filled style="color: green" />
      <t-icon-check-circle-filled style="color: orange" />
    </div>
  </div>
</template>

<script>
import TIconLoading from 'tdesign-vue-next/icon/loading.tsx';
import TIconClose from 'tdesign-vue-next/icon/close.tsx';
import TIconCheckCircleFilled from 'tdesign-vue-next/icon/check-circle-filled.tsx';

export default {
  components: { TIconLoading, TIconClose, TIconCheckCircleFilled },
  methods: {
    onIconClose() {
      console.log('icon was clicked.');
    },
  },
};
</script>
