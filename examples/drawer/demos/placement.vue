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
      <p>抽屉的内容</p>
    </t-drawer>
    <div class="tdesign-radio-button">
      <t-radio-group :defaultValue="placement" v-model="placement">
        <t-radio-button value="left">左侧</t-radio-button>
        <t-radio-button value="right">右侧</t-radio-button>
        <t-radio-button value="top">上方</t-radio-button>
        <t-radio-button value="bottom">下方</t-radio-button>
      </t-radio-group>
    </div>
    <t-button variant="outline" @click="visible = true" class="btn-top-margin">打开抽屉</t-button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const visible = ref(false);
    const placement = ref('right');
    return {
      visible,
      placement
    }
  },
});
</script>
<style scoped>
.btn-top-margin {
  margin-top: 16px;
}
</style>
