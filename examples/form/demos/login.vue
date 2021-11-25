<template>
  <div style="width: 350px">
    <t-form
      ref="form"
      :data="formData"
      :colon="true"
      label-width="calc(2em + 24px)"
      @reset="onReset"
      @submit="onSubmit"
    >
      <t-form-item name="account">
        <t-input v-model="formData.account" clearable placeholder="请输入账户名">
          <template #prefix-icon>
            <t-icon-desktop />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item name="password">
        <t-input v-model="formData.password" type="password" clearablec placeholder="请输入密码">
          <template #prefix-icon>
            <t-icon-lock-on />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit" block> 登录 </t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from '@tencent/tdesign-vue-next';

import TIconDesktop from '@tencent/tdesign-vue-next/icon/desktop';
import TIconLockOn from '@tencent/tdesign-vue-next/icon/lock-on';

const INITIAL_DATA = {
  account: '',
  password: '',
};

export default defineComponent({
  components: {
    TIconDesktop,
    TIconLockOn,
  },
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
