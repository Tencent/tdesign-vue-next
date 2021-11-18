<template>
  <div>
    <div class="controls">
      <t-radio-group
        v-model="formData.labelAlign"
        variant="default-filled"
      >
        <t-radio-button value="left">
          左对齐
        </t-radio-button>
        <t-radio-button value="right">
          右对齐
        </t-radio-button>
        <t-radio-button value="top">
          顶部对齐
        </t-radio-button>
      </t-radio-group>
    </div>

    <t-form
      :data="formData"
      :label-align="formData.labelAlign"
      :label-width="60"
    >
      <t-form-item
        label="名字"
        name="name"
      >
        <t-input v-model="formData.name" />
      </t-form-item>
      <t-form-item
        label="密码"
        name="password"
      >
        <t-input
          v-model="formData.password"
          type="password"
        />
      </t-form-item>
      <t-form-item style="padding-top: 8px">
        <t-button
          theme="primary"
          type="submit"
        >
          登录
        </t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

const INITIAL_DATA = {
  labelAlign: 'right',
  name: '',
  password: '',
};

export default defineComponent({
  setup() {
    const formData = ref({ ...INITIAL_DATA });
    return {
      formData,
    };
  },
});
</script>

<style lang="less" scoped>
.controls {
  margin-bottom: 32px;
}
</style>
