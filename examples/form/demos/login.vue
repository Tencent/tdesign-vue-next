<template>
  <div style="width: 350px">
    <t-form
      :data="formData"
      ref="form"
      @reset="onReset"
      @submit="onSubmit"
      :colon="true"
      labelWidth="0"
    >
      <t-form-item name='account'>
        <t-input clearable v-model="formData.account" placeholder="请输入账户名">
          <template #prefix-icon>
            <t-icon-desktop />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item name='password'>
        <t-input type="password" clearablec v-model="formData.password" placeholder="请输入密码">
          <template #prefix-icon>
            <t-icon-lock-on />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit" block >登录</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import TIconDesktop from '@tencent/tdesign-vue-next/lib/icon/desktop';
import TIconLockOn from '@tencent/tdesign-vue-next/lib/icon/lock-on';

const INITIAL_DATA = {
  account: '',
  password: '',
};

export default {
  components: {
    TIconDesktop,
    TIconLockOn,
  },
  data() {
    return {
      formData: { ...INITIAL_DATA },
    };
  },

  methods: {
    onReset() {
      this.$message.success('重置成功');
    },
    onSubmit({ result, firstError, e }) {
      e.preventDefault();
      if (result === true) {
        this.$message.success('提交成功');
      } else {
        console.log('Errors: ', result);
        this.$message.warning(firstError);
      }
    },
  },
};
</script>
