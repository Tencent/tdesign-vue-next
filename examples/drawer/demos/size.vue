<template>
  <div>
    <t-drawer
      v-model:visible="visible"
      :placement="placement"
      :size="size" 
      header="抽屉标题"
    >
      <p>抽屉的内容</p>
    </t-drawer>

    <div class="tdesign-radio-button">
      <t-radio-group :defaultValue="size" v-model="size" class="btn-top-margin">
        <t-radio-button value="small">小</t-radio-button>
        <t-radio-button value="medium">中</t-radio-button>
        <t-radio-button value="large">大</t-radio-button>
        <t-radio-button value="200">200</t-radio-button>
        <t-radio-button value="400px">400px</t-radio-button>
        <t-radio-button value="50%">50%</t-radio-button>
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
    const size = ref('small');
    return {
      visible,
      size
    }
  }
});
</script>
<style scoped>
.btn-top-margin {
  margin-top: 16px;
}
</style>