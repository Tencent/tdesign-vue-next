<template>
  <div>
    <!-- 当前示例包含：输入框、单选、多选、日期 等场景 -->
    <t-table
      row-key="key"
      :columns="columns"
      :data="data"
      :editable-row-keys="editableRowKeys"
      bordered
      @row-edit="onRowEdit"
    />
  </div>
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue';
import { Input, Select, DatePicker, MessagePlugin, Button } from 'tdesign-vue-next';

const initData = new Array(5).fill(null).map((_, i) => ({
  key: String(i + 1),
  firstName: ['Eric', 'Gilberta', 'Heriberto', 'Lazarus', 'Zandra'][i % 4],
  framework: ['Vue', 'React', 'Miniprogram', 'Flutter'][i % 4],
  email: [
    'espinke0@apache.org',
    'gpurves1@issuu.com',
    'hkment2@nsw.gov.au',
    'lskures3@apache.org',
    'zcroson5@virginia.edu',
  ][i % 4],
  letters: [['A'], ['B', 'E'], ['C'], ['D', 'G', 'H']][i % 4],
  createTime: ['2021-11-01', '2021-12-01', '2022-01-01', '2022-02-01', '2022-03-01'][i % 4],
}));

const align = ref('left');
const data = ref([...initData]);
const editableRowKeys = ref(['1', '2']);
// 保存变化过的行信息
const editMap = {};

const onEdit = (e) => {
  const { id } = e.currentTarget.dataset;
  if (!editableRowKeys.value.includes(id)) {
    editableRowKeys.value.push(id);
  }
};

// 更新 editableRowKeys
const updateEditState = (id) => {
  const index = editableRowKeys.value.findIndex((t) => t === id);
  editableRowKeys.value.splice(index, 1);
};

const onCancel = (e) => {
  const { id } = e.currentTarget.dataset;
  updateEditState(id);
};

const onSave = (e) => {
  const { id } = e.currentTarget.dataset;
  updateEditState(id);
  // TODO: 触发校验规则
  // 更新 data
  const current = editMap[id];
  if (!current) return;
  data.value.splice(current.rowIndex, 1, current.editedRow);
  MessagePlugin.success('保存成功');
};

const onRowEdit = (params) => {
  const { row, rowIndex, col, value } = params;
  console.log(`${col.colKey} edited value: `, value);
  const oldRowData = editMap[row.key]?.editedRow || row;
  editMap[row.key] = {
    ...params,
    editedRow: { ...oldRowData, [col.colKey]: value },
  };
  console.log(editMap[row.key]);
};

const columns = computed(() => [
  {
    title: 'FirstName',
    colKey: 'firstName',
    align: align.value,
    // 编辑状态相关配置，全部集中在 edit
    edit: {
      // 1. 支持任意组件。需保证组件包含 `value` 和 `onChange` 两个属性，且 onChange 的第一个参数值为 new value。
      // 2. 如果希望支持校验，组件还需包含 `status` 和 `tips` 属性。具体 API 含义参考 Input 组件
      component: Input,
      // props, 透传全部属性到 Input 组件
      props: {
        clearable: true,
        autofocus: true,
      },
      // 校验规则，此处同 Form 表单
      rules: [
        { required: true, message: '不能为空' },
        { max: 10, message: '字符数量不能超过 10', type: 'warning' },
      ],
      showEditIcon: false,
    },
  },
  {
    title: 'Framework',
    colKey: 'framework',
    edit: {
      component: Select,
      // props, 透传全部属性到 Select 组件
      props: {
        clearable: true,
        options: [
          { label: 'Vue', value: 'Vue' },
          { label: 'React', value: 'React' },
          { label: 'Miniprogram', value: 'Miniprogram' },
          { label: 'Flutter', value: 'Flutter' },
        ],
      },
      showEditIcon: false,
    },
  },
  {
    title: 'Letters',
    colKey: 'letters',
    cell: (h, { row }) => row.letters.join('、'),
    edit: {
      component: Select,
      // props, 透传全部属性到 Select 组件
      // props 为函数时，参数有：col, row, rowIndex, colIndex, editedRow。一般用于实现编辑组件之间的联动
      props: ({ col, row, rowIndex, colIndex, editedRow }) => {
        console.log(col, row, rowIndex, colIndex, editedRow);
        return {
          multiple: true,
          minCollapsedNum: 1,
          options: [
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
            { label: 'C', value: 'C' },
            { label: 'D', value: 'D' },
            { label: 'E', value: 'E' },
            // 如果框架选择了 React，则 Letters 隐藏 G 和 H
            { label: 'G', value: 'G', show: () => editedRow.framework !== 'React' },
            { label: 'H', value: 'H', show: () => editedRow.framework !== 'React' },
          ].filter((t) => (t.show === undefined ? true : t.show())),
        };
      },
      showEditIcon: false,
    },
  },
  {
    title: 'Date',
    colKey: 'createTime',
    // props, 透传全部属性到 DatePicker 组件
    edit: {
      component: DatePicker,
      showEditIcon: false,
    },
  },
  {
    title: 'Operate',
    colKey: 'operate',
    cell: (h, { row }) => {
      const editable = editableRowKeys.value.includes(row.key);
      return (
        <div class="table-operations">
          {!editable && (
            <Button theme="primary" variant="text" data-id={row.key} onClick={onEdit}>
              编辑
            </Button>
          )}
          {editable && (
            <Button theme="primary" variant="text" data-id={row.key} onClick={onSave}>
              保存
            </Button>
          )}
          {editable && (
            <Button theme="primary" variant="text" data-id={row.key} onClick={onCancel}>
              取消
            </Button>
          )}
        </div>
      );
    },
  },
]);
</script>

<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
