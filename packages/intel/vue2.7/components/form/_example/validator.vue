<template>
  <!--  scrollToFirstError="smooth" -->
  <t-form :data="formData" :rules="rules" ref="form" @reset="onReset" @submit="onSubmit">
    <t-form-item label="用户名" help="这里可以展示一段说明文字" name="account">
      <t-input v-model="formData.account" placeholder="请输入用户名"></t-input>
    </t-form-item>
    <t-form-item label="年龄" name="age">
      <t-input-number v-model="formData.age" placeholder="年龄" />
    </t-form-item>
    <t-form-item label="籍贯" name="region">
      <t-cascader v-model="formData.region" placeholder="请选择籍贯" :options="regionOptions" clearable filterable />
    </t-form-item>
    <t-form-item label="密码" name="password">
      <t-input type="password" v-model="formData.password" placeholder="请输入密码"></t-input>
    </t-form-item>
    <t-form-item label="邮箱" name="email">
      <t-input v-model="formData.email" placeholder="请输入邮箱"></t-input>
    </t-form-item>
    <t-form-item label="性别" name="gender">
      <t-radio-group v-model="formData.gender">
        <t-radio value="male">男</t-radio>
        <t-radio value="female">女</t-radio>
      </t-radio-group>
    </t-form-item>
    <t-form-item label="课程" name="course">
      <t-checkbox-group v-model="formData.course" :options="courseOptions"></t-checkbox-group>
    </t-form-item>
    <t-form-item label="学院" name="college">
      <t-select v-model="formData.college" class="demo-select-base" clearable filterable placeholder="请选择所在学院">
        <t-option v-for="(item, index) in options" :value="item.value" :label="item.label" :key="index">
          {{ item.label }}
        </t-option>
      </t-select>
    </t-form-item>
    <t-form-item
      label="入学时间"
      name="date"
      :rules="[
        { required: true, message: '此项必填' },
        { date: { delimiters: ['/', '-', '.'] }, message: '日期格式有误' },
      ]"
    >
      <t-date-picker v-model="formData.date"></t-date-picker>
    </t-form-item>
    <t-form-item label="个人网站" name="content.url">
      <t-input v-model="formData.content.url" placeholder="请输入个人网站地址"></t-input>
    </t-form-item>
    <t-form-item label="个人简介" help="请用一句话介绍自己" name="description">
      <t-textarea v-model="formData.description" placeholder="请用一句话介绍自己"></t-textarea>
    </t-form-item>
    <t-form-item label="兴趣爱好" name="hobby">
      <t-tree-select
        v-model="formData.hobby"
        filterable
        :data="hobbyOptions"
        placeholder="请选择你的兴趣爱好"
      ></t-tree-select>
    </t-form-item>

    <t-form-item style="margin-left: 100px">
      <t-space size="10px">
        <t-button theme="primary" type="submit">提交</t-button>
        <t-button theme="default" variant="base" type="reset">重置</t-button>
        <t-button theme="default" variant="base" @click="handleClear">清空校验结果</t-button>
      </t-space>
    </t-form-item>
  </t-form>
</template>
<script>
const INITIAL_DATA = {
  account: '',
  password: '',
  description: '',
  age: undefined,
  region: '',
  email: '',
  gender: '',
  college: '',
  date: '',
  content: {
    url: '',
  },
  hobby: '',
  course: [],
};
export default {
  data() {
    return {
      formData: { ...INITIAL_DATA },
      hobbyOptions: [
        {
          label: '运动',
          value: 'sports',
          children: [
            {
              label: '足球',
              value: 'soccer',
            },
            {
              label: '篮球',
              value: 'basketball',
            },
          ],
        },
        {
          label: '娱乐',
          value: 'entertainment',
          children: [
            {
              label: '电影',
              value: 'movie',
            },
            {
              label: '旅游',
              value: 'trip',
            },
          ],
        },
      ],
      regionOptions: [
        {
          label: '广东',
          value: '1',
          children: [
            {
              label: '深圳',
              value: '1.1',
            },
            {
              label: '广州',
              value: '1.2',
            },
          ],
        },
        {
          label: '湖南',
          value: '2',
          children: [
            {
              label: '长沙',
              value: '2.1',
            },
          ],
        },
      ],
      courseOptions: [
        { label: '语文', value: '1' },
        { label: '数学', value: '2' },
        { label: '英语', value: '3' },
        { label: '体育', value: '4' },
      ],
      options: [
        { label: '计算机学院', value: '1' },
        { label: '软件学院', value: '2' },
        { label: '物联网学院', value: '3' },
      ],
      // FormItem.rules 优先级大于 Form.rules
      rules: {
        account: [
          {
            required: true,
            message: '姓名必填',
            type: 'error',
            trigger: 'blur',
          },
          // trigger 默认为 'change'
          { required: true, message: '姓名必填', type: 'error' },
          { whitespace: true, message: '姓名不能为空' },
          {
            min: 2,
            message: '至少需要两个字符，一个中文等于两个字符',
            type: 'warning',
            trigger: 'blur',
          },
          {
            max: 10,
            message: '姓名字符长度超出',
            type: 'warning',
            trigger: 'blur',
          },
        ],
        description: [
          {
            validator: (val) => val.length >= 5,
            message: '至少 5 个字，中文长度等于英文长度',
            type: 'warning',
          },
          {
            validator: (val) => val.length < 20,
            message: '不能超过 20 个字，中文长度等于英文长度',
            type: 'warning',
          },
        ],
        age: [{ required: true, message: '年龄必填', type: 'error' }],
        region: [{ required: true, message: '籍贯必填', type: 'error' }],

        password: [
          { required: true, message: '密码必填', type: 'error' },
          { len: 8, message: '请输入 8 位密码', type: 'warning' },
          { pattern: /[A-Z]+/, message: '密码必须包含大写字母', type: 'warning' },
        ],
        college: [{ required: true, message: '此项必填' }],
        email: [
          { required: true, message: '邮箱必填' },
          { email: { ignore_max_length: true }, message: '请输入正确的邮箱地址' },
        ],
        gender: [{ required: true, message: '性别必填' }],
        course: [
          { required: true, message: '课程必填' },
          { validator: (val) => val.length <= 2, message: '最多选择 2 门课程', type: 'warning' },
        ],
        hobby: [{ required: true, message: '爱好必填', type: 'error' }],
        'content.url': [
          { required: true, message: '个人网站必填' },
          {
            url: {
              protocols: ['http', 'https', 'ftp'],
              require_protocol: true,
            },
            message: '请输入正确的个人主页',
          },
        ],
      },
    };
  },

  methods: {
    onReset() {
      this.$message.success('重置成功');
      console.log('formData', this.formData);
    },
    onSubmit({ validateResult, firstError }) {
      if (validateResult === true) {
        this.$message.success('提交成功');
      } else {
        console.log('Errors: ', validateResult);
        this.$message.warning(firstError);
      }
    },
    handleClear() {
      this.$refs.form.clearValidate();
    },
  },
};
</script>

<style scoped>
.demo-select-base {
  width: 300px;
}
</style>
