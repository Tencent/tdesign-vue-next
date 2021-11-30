<template>
  <div>
    <!--
      1. statusIcon 值为 true，显示默认图标。默认图标有 成功、失败、警告 等，不同的状态图标不同
      2. statusIcon 值为 false，不显示图标
      3. statusIcon 值类型为 function，可以自定义右侧状态图标
      4. statusIcon 为 slot(插槽)，可自定义右侧状态图标
    -->
    <t-form
      ref="formValidatorStatus"
      :data="formData"
      :rules="rules"
      :label-width="80"
      :status-icon="true"
      @reset="onReset"
      @submit="onSubmit"
    >
      <t-form-item label="失败" help="这是校验通过后的提示信息" name="fail">
        <t-input v-model="formData.fail" />
      </t-form-item>
      <t-form-item label="警告" name="warning" success-border>
        <t-input v-model="formData.warning" />
      </t-form-item>
      <t-form-item label="成功" name="success">
        <t-input v-model="formData.success" />
      </t-form-item>
      <t-form-item label="失败" name="failB" :status-icon="false">
        <t-input v-model="formData.failB" placeholder="隐藏状态icon" />
      </t-form-item>
      <t-form-item label="警告" name="warningB">
        <t-input v-model="formData.warningB" />
      </t-form-item>
      <t-form-item label="加载中" name="loading">
        <t-input v-model="formData.loading" placeholder="正在校验中，请稍等" />
        <template #statusIcon>
          <div style="width: 25px; display: flex; justify-content: center">
            <t-loading size="small" />
          </div>
        </template>
      </t-form-item>
      <t-form-item v-for="(item, index) in addlist" :key="item.id" label="新增" :name="item.name">
        <t-input v-model="formData[item.name]" />
        <template #statusIcon>
          <t-button v-if="item.id === 0 || item.id === lastAddItem - 1" variant="dashed" @click="addItem">
            <t-icon name="add" size="16px" style="color: #0004" />
          </t-button>
          <t-button v-if="item.id > 0" variant="dashed" @click="removeItem(item, index)">
            <t-icon name="remove" size="16px" style="color: #0004" />
          </t-button>
        </template>
      </t-form-item>
      <t-form-item label="帮助" name="help" :status-icon="getStatusIcon" help="自定义帮助icon">
        <t-input v-model="formData.help" />
        <template #statusIcon>
          <t-icon name="help-circle" size="25px" />
        </template>
      </t-form-item>
      <t-form-item :status-icon="false" style="padding-top: 8px">
        <t-button theme="primary" type="submit" style="margin-right: 10px"> 提交 </t-button>
        <t-button theme="default" variant="base" type="reset"> 重置 </t-button>
      </t-form-item>
    </t-form>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const INITIAL_DATA = {
  fail: '',
  warning: '',
  success: '',
  failB: '',
  warningB: '',
  loading: '',
  add: '',
  help: '',
};

const rules = {
  fail: [{ required: true, message: '必填', type: 'error' }],
  warning: [{ required: true, message: '必填', type: 'warning' }],
  success: [{ validator: () => true }],
  failB: [{ required: true, message: '必填', type: 'error' }],
  warningB: [{ required: true, message: '必填', type: 'warning' }],
};

export default defineComponent({
  setup() {
    const formData = ref({ ...INITIAL_DATA });
    const formValidatorStatus = ref(null);

    const addlist = ref([{ id: 0, name: 'add0' }]);
    const lastAddItem = ref(1);

    const addItem = () => {
      const addNum = lastAddItem.value;
      INITIAL_DATA[`add${addNum}`] = '';
      addlist.value.push({ id: addNum, name: `add${addNum}` });
      lastAddItem.value += 1;
    };
    const removeItem = (item, index) => {
      delete INITIAL_DATA[`add${item.id}`];
      addlist.value.splice(index, 1);
    };

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

    onMounted(() => {
      formValidatorStatus.value.validate();
    });

    const getStatusIcon = () => <t-icon name="help-circle" size="25px" style="color: #0006" />;

    return {
      formValidatorStatus,
      formData,
      rules,
      onReset,
      onSubmit,
      getStatusIcon,
      addlist,
      addItem,
      removeItem,
    };
  },
});
</script>
