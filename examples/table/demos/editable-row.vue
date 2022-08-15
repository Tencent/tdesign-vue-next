<template>
  <div class="t-table-demo__editable-row">
    <div>
      <t-button @click="onValidateTableData">校验全部</t-button>
    </div>
    <br />
    <!-- 当前示例包含：输入框、单选、多选、日期 等场景 -->
    <t-table
      ref="tableRef"
      row-key="key"
      :columns="columns"
      :data="data"
      :editable-row-keys="editableRowKeys"
      vertical-align="top"
      bordered
      @row-edit="onRowEdit"
      @row-validate="onRowValidate"
      @validate="onValidate"
    />
  </div>
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue';
import { Input, Select, DatePicker, MessagePlugin, Button } from 'tdesign-vue-next';
import dayjs from 'dayjs';

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

const tableRef = ref();
const align = ref('left');
const data = ref([...initData]);
const editableRowKeys = ref(['1']);
const currentSaveId = ref('');
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
  tableRef.value.clearValidateData();
};

const onSave = (e) => {
  const { id } = e.currentTarget.dataset;
  currentSaveId.value = id;
  // 触发内部校验，而后也可在 onRowValidate 中接收异步校验结果
  tableRef.value.validateRowData(id).then((params) => {
    console.log('Event Table Promise Validate:', params);
    if (params.result.length) {
      const r = params.result[0];
      MessagePlugin.error(`${r.col.title} ${r.errorList[0].message}`);
      return;
    }
    // 如果是 table 的父组件主动触发校验
    if (params.trigger === 'parent' && !params.result.length) {
      const current = editMap[currentSaveId.value];
      if (current) {
        data.value.splice(current.rowIndex, 1, current.editedRow);
        MessagePlugin.success('保存成功');
      }
      updateEditState(currentSaveId.value);
    }
  });
};

// 行校验反馈事件，tableRef.value.validateRowData 执行结束后触发
const onRowValidate = (params) => {
  console.log('Event Table Row Validate:', params);
};

function onValidateTableData() {
  // 执行结束后触发事件 validate
  tableRef.value.validateTableData().then((params) => {
    console.log('Promise Table Data Validate:', params);
    const cellKeys = Object.keys(params.result);
    const firstError = params.result[cellKeys[0]];
    if (firstError) {
      MessagePlugin.warning(firstError[0].message);
    }
  });
}

// 表格全量数据校验反馈事件，tableRef.value.validateTableData() 执行结束后触发
function onValidate(params) {
  console.log('Event Table Data Validate:', params);
}

const onRowEdit = (params) => {
  const { row, rowIndex, col, value } = params;
  const oldRowData = editMap[row.key]?.editedRow || row;
  const editedRow = { ...oldRowData, [col.colKey]: value };
  editMap[row.key] = {
    ...params,
    editedRow,
  };

  // ⚠️ 重要：以下内容应用于全量数据校验（单独的行校验不需要）
  // const newData = [...data.value];
  // newData[rowIndex] = editedRow;
  // data.value = newData;
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
        autoWidth: true,
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
        autoWidth: true,
        options: [
          { label: 'Vue', value: 'Vue' },
          { label: 'React', value: 'React' },
          { label: 'Miniprogram', value: 'Miniprogram' },
          { label: 'Flutter', value: 'Flutter' },
        ],
      },
      // 校验规则，此处同 Form 表单
      rules: [{ required: true, message: '不能为空' }],
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
        return {
          multiple: true,
          minCollapsedNum: 1,
          autoWidth: true,
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
      // 校验规则，此处同 Form 表单
      rules: [{ validator: (val) => val && val.length < 3, message: '数量不能超过 2 个' }],
      showEditIcon: false,
    },
  },
  {
    title: 'Date',
    colKey: 'createTime',
    className: 't-demo-col__datepicker',
    // props, 透传全部属性到 DatePicker 组件
    edit: {
      component: DatePicker,
      showEditIcon: false,
      // 校验规则，此处同 Form 表单
      rules: [
        {
          validator: (val) => dayjs(val).isAfter(dayjs()),
          message: '只能选择今天以后日期',
        },
      ],
    },
  },
  {
    title: 'Operate',
    colKey: 'operate',
    width: 150,
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

<style>
.t-table-demo__editable-row .table-operations > button {
  padding: 0 8px;
  line-height: 22px;
  height: 22px;
}
.t-table-demo__editable-row .t-demo-col__datepicker .t-date-picker {
  width: 120px;
}
</style>
