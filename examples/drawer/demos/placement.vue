<template>
  <div>
    <!-- @click-cancel 和 :onClickCancel 两种写法都支持； :onClickOverlay 和 @click-overlay 两种写法都支持-->
    <t-drawer
      header="标题名称"
      v-model:visible="visible"
      @click-cancel="visible = false"
      :onClickOverlay="() => visible = false"
      :placement="placement"
    >
      <p>This is a drawer</p>
    </t-drawer>
    <div class="tdesign-radio-button">
      <t-radio-group :defaultValue="placement" v-model="placement">
        <t-radio-button value="left">left</t-radio-button>
        <t-radio-button value="right">right</t-radio-button>
        <t-radio-button value="top">top</t-radio-button>
        <t-radio-button value="bottom">bottom</t-radio-button>
      </t-radio-group>
      <t-button theme="primary" @click="visible = true">Open</t-button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      visible: false,
      placement: 'right',
    };
  },
});
</script>
<style scoped>
.t-button {
  margin-left: 20px;
}
</style>
