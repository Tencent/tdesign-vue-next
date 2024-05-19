<template>
  <t-form
    ref="form"
    :data="formData"
    :rules="rules"
    reset-type="initial"
    style="max-width: 100%"
    @reset="onReset"
    @submit="onSubmit"
  >
    <t-form-item label="学校" name="school">
      <t-radio-group v-model="formData.school" :options="SCHOOL_OPTIONS" />
    </t-form-item>

    <t-tabs
      v-model="studentTab"
      theme="card"
      addable
      style="margin-left: 30px; border: 1px solid var(--td-component-stroke)"
      @add="onAddStudent"
    >
      <t-tab-panel
        v-for="(student, index) in formData.students"
        :key="student.id"
        :value="student.id"
        :label="student.label"
        :destroy-on-hide="false"
      >
        <div style="padding: 24px 24px 24px 0">
          <!-- 重点阅读：数组里面，注意 name 定义，用于区分不同的字段 -->
          <!-- 重点阅读：name 表示当前字段在 formData 中的路径，ruleName 表示当前字段在 rules 中的名称 -->
          <t-form-item label="姓名" :name="`students[${index}].name`" :label-width="80">
            <t-input v-model="formData.students[index].name" placeholder="请输入内容"></t-input>
          </t-form-item>

          <t-form-item label="选科" :name="`students[${index}].courseType`" :label-width="80">
            <t-radio-group v-model="formData.students[index].courseType">
              <t-radio value="wenke">文科</t-radio>
              <t-radio value="like">理科</t-radio>
            </t-radio-group>
          </t-form-item>

          <t-form-item label="课程" :name="`students[${index}].course`" :label-width="80">
            <t-checkbox-group v-model="formData.students[index].course" :options="courseOptions"></t-checkbox-group>
          </t-form-item>

          <t-form-item :label-width="80">
            <t-space size="small">
              <t-button theme="primary" type="submit">提交</t-button>
              <t-button theme="default" variant="base" type="reset">重置</t-button>
            </t-space>
          </t-form-item>
        </div>
      </t-tab-panel>
    </t-tabs>
  </t-form>
</template>
<script lang="ts" setup>
import { ref, computed, watch, reactive } from 'vue';
import { MessagePlugin, FormProps, RadioGroupProps, CheckboxGroupProps, TabsProps } from 'tdesign-vue-next';
let id = 0;
const getId = () => {
  return ++id;
};
const studentTab = ref(1);
const formData: FormProps['data'] = reactive({
  school: 1,
  students: [
    {
      id: getId(),
      label: '学生1',
      name: 'StudentA',
      courseType: 'wenke',
      course: ['1'],
    },
    {
      id: getId(),
      label: '学生2',
      name: 'StudentB',
      courseType: 'wenke',
      course: [],
    },
  ],
});
const COURSE_OPTIONS = [
  {
    label: '全部',
    checkAll: true,
  },
  {
    label: '语文',
    value: '1',
    courseTypes: ['wenke', 'like'],
  },
  {
    label: '数学',
    value: '2',
    courseTypes: ['wenke', 'like'],
  },
  {
    label: '物理',
    value: '3',
    courseTypes: ['like'],
  },
  {
    label: '化学',
    value: '4',
    courseTypes: ['like'],
  },
  {
    label: '地理',
    value: '5',
    courseTypes: ['wenke'],
  },
  {
    label: '历史',
    value: '6',
    courseTypes: ['wenke'],
  },
];
const SCHOOL_OPTIONS: RadioGroupProps['options'] = [
  {
    label: '学校一',
    value: 1,
  },
  {
    label: '学校二',
    value: 2,
  },
  {
    label: '学校三',
    value: 3,
  },
];
const rules: FormProps['rules'] = {
  school: [
    {
      required: true,
      message: '学校必填',
    },
  ],
  name: [
    {
      required: true,
      message: '用户名必填',
    },
  ],
  courseType: [
    {
      required: true,
      message: '选科必填',
    },
  ],
  course: [
    {
      required: true,
      message: '课程必填',
    },
  ],
};
const courseOptions = computed<CheckboxGroupProps['options']>(() =>
  COURSE_OPTIONS.filter((item) => {
    if (!formData.courseType || !item.courseTypes) return true;
    return item.courseTypes.includes(formData.courseType);
  }),
);
watch(
  () => formData.courseType,
  () => {
    formData.course = [];
  },
);
const onReset: FormProps['onReset'] = () => {
  MessagePlugin.success('重置成功');
};
const onSubmit: FormProps['onSubmit'] = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Errors: ', validateResult);
    MessagePlugin.warning(firstError);
    // 判断错误在第几个 Tab，而后自动切换到第几个
    for (let i = 0, len = formData.students.length; i < len; i++) {
      const item = formData.students[i];
      const keys = Object.keys(item).map((key) => `students[${i}].${key}`);
      // 数组数据 key 在 validateResult 中存在，则表示校验不通过
      const isInvalid = keys.find((key) => validateResult[key]);
      if (isInvalid) {
        studentTab.value = item.id;
        return;
      }
    }
  }
};
const onAddStudent: TabsProps['onAdd'] = () => {
  const id = getId();
  formData.students.push({
    id,
    label: `学生${id}`,
    name: '',
    courseType: 'wenke',
    course: [],
    status: false,
  });
  studentTab.value = id;
};
</script>
