<template>
  <div>
    <div class="controls">
      <t-radio-group v-model="formData.layout" variant="default-filled">
        <t-radio-button value="vertical"> 纵向布局 </t-radio-button>
        <t-radio-button value="inline"> 行内布局 </t-radio-button>
      </t-radio-group>
    </div>
    <t-form
      ref="form"
      :data="formData"
      label-width="calc(2em + 24px)"
      :layout="formData.layout"
      scroll-to-first-error="smooth"
      @reset="onReset"
      @submit="onSubmit"
    >
      <t-form-item label="名字" name="name">
        <t-input v-model="formData.name" />
      </t-form-item>
      <t-form-item label="密码" name="password">
        <t-input v-model="formData.password" type="password" />
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from '@tencent/tdesign-vue-next';

const INITIAL_DATA = {
  layout: 'inline',
  name: '',
  password: '',
};
export default defineComponent({
  setup() {
    const formData = ref({ ...INITIAL_DATA });

    const onReset = () => {
      MessagePlugin.success('重置成功');
    };

    const onSubmit = ({ validateResult, firstError }) => {
      if (validateResult === true) {
        MessagePlugin.success('提交成功');
      } else {
        console.log('Validate Errors: ', firstError, validateResult);
        MessagePlugin.warning(firstError);
      }
    };

    return {
      formData,
      onReset,
      onSubmit,
    };
  },
});
</script>

<style lang="less" scoped>
.controls {
  margin-bottom: 32px;
}
</style>
