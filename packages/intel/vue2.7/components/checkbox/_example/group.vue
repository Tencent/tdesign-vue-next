<template>
  <t-space direction="vertical" size="48px">
    <t-space direction="vertical">
      <div>方式一：业务侧自定义全选功能。选中值: {{ value1.join(',') }}</div>
      <div>
        <t-checkbox :checked="checkAll" :indeterminate="indeterminate" :onChange="handleSelectAll">全选</t-checkbox>
      </div>
      <t-checkbox-group v-model="value1" :options="options1" @change="onChange1" />
    </t-space>

    <!-- key 是避免重复渲染的关键；Checkbox.key is the key point of list render -->
    <!-- 数据量大的情况下，不建议使用这种方式：因 Vue2 框架中，父组件 CheckboxGroup 选中项变化，子组件 Checkbox 一定全量重新渲染。 -->
    <t-space direction="vertical">
      <div>
        方式二：组件内置全选功能，使用插槽定义选项。⚠️注意：数据量大时，不建议使用这种方式。选中值:
        {{ value2.join(', ') }}。
      </div>
      <t-checkbox-group v-model="value2" @change="onChange2">
        <t-checkbox key="1" :checkAll="true" label="全选" />
        <t-checkbox key="2" value="选项一">选项一</t-checkbox>
        <t-checkbox key="3" label="选项二" value="选项二" :disabled="true" />
        <t-checkbox key="4" label="选项三" value="选项三" />
      </t-checkbox-group>
    </t-space>

    <!-- 数据量大的情况下，建议使用这种方式，可以避免选中项重复渲染 -->
    <t-space direction="vertical">
      <div>
        方式三：组件内置全选功能，使用 `options` 定义选项。数据量大时，可以避免所有元素重新渲染。选中值:
        {{ value3.join(', ') }}
      </div>
      <t-checkbox-group v-model="value3" :options="options2" @change="onChange3" />
    </t-space>

    <!-- 数据量大的情况下，建议使用这种方式，可以避免选中项重复渲染 -->
    <t-space direction="vertical">
      <div>
        方式四：组件内置全选功能，`options` 定义选项列表，插槽定义选项内容。数据量大时，可以避免所有元素重新渲染。
      </div>
      <t-checkbox-group :defaultValue="['选项一']" :options="options3">
        <template #label="{ data: { label, value, checkAll }, index }">
          <span v-if="checkAll">{{ label }}</span>
          <span v-else> {{ label }}（{{ value }}/{{ index }}） </span>
        </template>
      </t-checkbox-group>
    </t-space>
  </t-space>
</template>

<script lang="jsx">
const OPTION_LIST = [
  { label: '全选', checkAll: true },
  { value: '选项一', label: '选项一' },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { value: '选项二', label: (h) => <div>选项二</div> },
  { value: '选项三', label: '选项三' },
];

const OPTION_LIST3 = [
  { label: '全选', checkAll: true },
  { value: 'optionA', label: '选项一' },
  { value: 'optionB', label: '选项二' },
  { value: 'optionC', label: '选项三' },
];

export default {
  data() {
    return {
      value1: ['选项一'],
      options1: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        { value: '选项一', label: (h) => <div>选项一</div> },
        { value: '选项二', label: '选项二' },
        { value: '选项三', label: '选项三' },
      ],

      value2: ['选项一'],
      value3: ['选项一', '选项二', '选项三'],
      options2: [...OPTION_LIST],
      options3: OPTION_LIST3,
    };
  },
  computed: {
    checkAll() {
      return this.options1.length === this.value1.length;
    },
    indeterminate() {
      return !!(this.options1.length > this.value1.length && this.value1.length);
    },
  },
  methods: {
    handleSelectAll(checked) {
      this.value1 = checked ? ['选项一', '选项二', '选项三'] : [];
    },
    onChange1(val) {
      console.log(this.value1, val);
    },
    onChange2(val) {
      console.log(this.value2, val);
    },
    onChange3(val) {
      console.log(this.value3, val);
    },
  },
};
</script>
