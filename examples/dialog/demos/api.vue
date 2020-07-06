<template>
  <div>
    <t-button theme="primary" @click="onConfirm">confirm</t-button>
    <t-button theme="primary" @click="onAlert">alert</t-button>
  </div>
</template>
<script>
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onConfirm() {
      this.$confirm({
        header: 'Confirm',
        body: 'some message here',
      }).then(({ confirm }) => {
        console.log(confirm);
      });
    },
    onAlert() {
      this.$alert({
        header: 'Confirm',
        body: 'some message here',
      }).then(() => {
        console.log('alert');
      });
    },
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
