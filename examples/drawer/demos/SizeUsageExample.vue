<template>
  <div>
    <t-drawer :visible="visible" @close="handleClose" :placement="placement" :size="size"
    ><p>This is a drawer</p></t-drawer
    >
    <div class="tdesign-radio-button">
      <t-radio-group :defaultValue="placement" v-model="placement">
        <t-radio-button value="left">left</t-radio-button>
        <t-radio-button value="right">right</t-radio-button>
        <t-radio-button value="top">top</t-radio-button>
        <t-radio-button value="bottom">bottom</t-radio-button>
      </t-radio-group>
    </div>
    <div class="tdesign-radio-button">
      <t-radio-group :defaultValue="size" v-model="size" class="btn-top-margin">
        <t-radio-button value="small">small(300px)</t-radio-button>
        <t-radio-button value="medium">medium(500px)</t-radio-button>
        <t-radio-button value="large">large(760px)</t-radio-button>
        <t-radio-button value="200">200</t-radio-button>
        <t-radio-button value="400px">400px</t-radio-button>
        <t-radio-button value="50%">50%</t-radio-button>
      </t-radio-group>
    </div>
    <t-button variant="base" theme="primary" @click="handleClick" class="btn-top-margin">Open</t-button>
  </div>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      visible: false,
      size: 'small',
      placement: 'right',
    };
  },
  methods: {
    setVisible(state) {
      this.visible = state;
    },
    handleClick() {
      this.setVisible(true);
    },
    handleClose() {
      this.setVisible(false);
    },
  },
});
</script>
<style scoped>
.btn-top-margin {
  margin-top: 16px;
}
</style>
