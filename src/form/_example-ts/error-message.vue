<template>
  <t-space direction="vertical" size="large">
    <!-- 可以使用全局 ConfigProvider errorMessage 配置规则校验结果描述，而无需给每一个表单都配置校验信息 -->
    <t-radio-group v-model="errorConfig" variant="default-filled">
      <t-radio-button value="default">
        <t-popup content="Form.errorMessage 为空，使用组件内置校验信息。重置后，点击提交观察校验结果信息">
          使用表单默认校验信息
        </t-popup>
      </t-radio-button>

      <t-radio-button value="config">
        <t-popup content="统一配置 Form.errorMessage，使用自定义配置的校验信息。重置后，点击提交观察校验结果信息">
          表单统一配置校验信息
        </t-popup>
      </t-radio-button>
    </t-radio-group>

    <!-- error-message 非必需 -->
    <t-form
      ref="form"
      :data="formData"
      :rules="rules"
      :error-message="errorConfig === 'default' ? undefined : errorMessage"
      scroll-to-first-error="smooth"
      @reset="onReset"
      @submit="onSubmit"
    >
      <!-- !!!注意：当 FormItem 的 label 属性为 Function 时，errorMessage 模板中的 ${name} 会被替换为 FormItem.name 属性值 -->
      <t-form-item :label="renderLabel" help="这是用户名字段帮助说明" name="account">
        <t-input v-model="formData.account"></t-input>
      </t-form-item>

      <t-form-item label="个人简介" help="一句话介绍自己" name="description">
        <t-input v-model="formData.description"></t-input>
      </t-form-item>

      <t-form-item label="密码" name="password">
        <t-input v-model="formData.password" type="password"></t-input>
      </t-form-item>

      <t-form-item label="邮箱" name="email">
        <t-auto-complete v-model="formData.email" :options="emailOptions" filterable></t-auto-complete>
      </t-form-item>

      <t-form-item label="性别" name="gender">
        <t-radio-group v-model="formData.gender">
          <t-radio value="male">男</t-radio>
          <t-radio value="femal">女</t-radio>
        </t-radio-group>
      </t-form-item>

      <t-form-item label="课程" name="course">
        <t-checkbox-group v-model="formData.course" :options="courseOptions"></t-checkbox-group>
      </t-form-item>

      <t-form-item label="学院" name="college">
        <t-select v-model="formData.college" class="demo-select-base" clearable>
          <t-option v-for="(item, index) in options" :key="index" :value="item.value" :label="item.label">
            {{ item.label }}
          </t-option>
        </t-select>
      </t-form-item>

      <t-form-item
        label="入学时间"
        name="date"
        :rules="[{ date: { delimiters: ['/', '-', '.'] }, message: '日期格式有误' }]"
      >
        <t-input v-model="formData.date"></t-input>
      </t-form-item>

      <t-form-item label="个人网站" name="content.url">
        <t-input v-model="formData.content.url"></t-input>
      </t-form-item>

      <t-form-item>
        <t-space size="small">
          <t-button theme="primary" type="submit">提交</t-button>
          <t-button theme="default" variant="base" type="reset">重置</t-button>
          <t-button theme="default" variant="base" @click="handleClear">清空校验结果</t-button>
        </t-space>
      </t-form-item>
    </t-form>
  </t-space>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import {
  MessagePlugin,
  FormProps,
  FormInstanceFunctions,
  AutoCompleteProps,
  CheckboxGroupProps,
  FormItemProps,
  ButtonProps,
} from 'tdesign-vue-next';
const formData: FormProps['data'] = reactive({
  account: '',
  password: '',
  description: '',
  email: '',
  gender: '',
  college: '',
  date: '',
  content: {
    url: '',
  },
  course: [],
});
const form = ref<FormInstanceFunctions>(null);
const errorConfig = ref('default');
const emailSuffix = ['@qq.com', '@163.com', '@gmail.com'];
const emailOptions = computed<AutoCompleteProps['options']>(() => {
  const emailPrefix = formData.email.split('@')[0];
  if (!emailPrefix) return [];
  return emailSuffix.map((suffix) => emailPrefix + suffix);
});
const courseOptions: CheckboxGroupProps['options'] = [
  {
    label: '语文',
    value: '1',
  },
  {
    label: '数学',
    value: '2',
  },
  {
    label: '英语',
    value: '3',
  },
];
const options = [
  {
    label: '计算机学院',
    value: '1',
  },
  {
    label: '软件学院',
    value: '2',
  },
  {
    label: '物联网学院',
    value: '3',
  },
];
const onReset: FormProps['onReset'] = () => {
  MessagePlugin.success('重置成功');
};
const onSubmit: FormProps['onSubmit'] = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Errors: ', validateResult);
    MessagePlugin.warning(firstError);
  }
};
const renderLabel: FormItemProps['label'] = () => '用户名';

/* eslint-disable no-template-curly-in-string */
const errorMessage = {
  date: '${name}不正确',
  url: '${name}不正确',
  required: '请输入${name}',
  max: '${name}字符长度不能超过 ${validate} 个字符，一个中文等于两个字符',
  min: '${name}字符长度不能少于 ${validate} 个字符，一个中文等于两个字符',
  len: '${name}字符长度必须是 ${validate}',
  pattern: '${name}不正确',
  validator: '${name}有误',
};
const rules: FormProps['rules'] = {
  account: [
    {
      required: true,
    },
    // { enum: ['sheep', 'name'] },
    {
      min: 2,
    },
    {
      max: 10,
      type: 'warning',
    },
  ],
  description: [
    {
      validator: (val) => val.length >= 5,
    },
    {
      validator: (val) => val.length < 10,
      message: '不能超过 20 个字，中文长度等于英文长度',
    },
  ],
  password: [
    {
      required: true,
    },
    {
      len: 8,
      message: '请输入 8 位密码',
    },
    {
      pattern: /[A-Z]+/,
      message: '密码必须包含大写字母',
    },
  ],
  email: [
    {
      required: true,
    },
    {
      email: {
        ignore_max_length: true,
      },
    },
  ],
  gender: [
    {
      required: true,
    },
  ],
  course: [
    {
      required: true,
    },
    {
      validator: (val) => val.length <= 2,
      message: '最多选择 2 门课程',
      type: 'warning',
    },
  ],
  'content.url': [
    {
      required: true,
    },
    {
      url: {
        protocols: ['http', 'https', 'ftp'],
        require_protocol: true,
      },
    },
  ],
};
const handleClear: ButtonProps['onClick'] = () => {
  form.value.clearValidate();
};
</script>

<style scoped>
.demo-select-base {
  width: 300px;
}
</style>
