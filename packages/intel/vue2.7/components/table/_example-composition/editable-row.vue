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
      table-layout="auto"
      bordered
      lazyLoad
      @row-edit="onRowEdit"
      @row-validate="onRowValidate"
      @validate="onValidate"
    />
  </div>
</template>

<script setup lang="jsx">
import { ref, reactive, computed } from 'vue';
import {
  Input, Select, DatePicker, MessagePlugin,
} from 'tdesign-vue';
import dayjs from 'dayjs';

const initData = new Array(5).fill(null).map((_, i) => ({
  key: String(i + 1),
  firstName: ['贾明', '张三', '王芳'][i % 3],
  user: {
    firstName: ['贾明', '张三', '王芳'][i % 3],
  },
  status: i % 3,
  email: [
    'espinke0@apache.org',
    'gpurves1@issuu.com',
    'hkment2@nsw.gov.au',
    'lskures3@apache.org',
    'zcroson5@virginia.edu',
  ][i % 4],
  letters: [['宣传物料制作费用'], ['宣传物料制作费用'], ['宣传物料制作费用'], ['宣传物料制作费用', 'algolia 服务报销']][
    i % 4
  ],
  createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
}));
const STATUS_OPTIONS = [
  {
    label: '审批通过',
    value: 0,
  },
  {
    label: '审批过期',
    value: 1,
  },
  {
    label: '审批失败',
    value: 2,
  },
];
const tableRef = ref();
const align = ref('left');
const data = ref([...initData]);
const editableRowKeys = ref(['1']);
const currentSaveId = ref('');
// 保存变化过的行信息
const editMap = reactive({});
const onCancel = (e) => {
  const { id } = e.currentTarget.dataset;
  updateEditState(id);
  tableRef.value.clearValidateData();
};
const columns = computed(() => [
  {
    title: '申请人',
    colKey: 'user.firstName',
    width: 120,
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
        {
          required: true,
          message: '不能为空',
        },
        {
          max: 10,
          message: '字符数量不能超过 10',
          type: 'warning',
        },
      ],
      showEditIcon: false,
    },
  },
  {
    title: '申请状态',
    colKey: 'status',
    cell: (h, { row }) => STATUS_OPTIONS.find((t) => t.value === row.status)?.label,
    edit: {
      component: Select,
      // props, 透传全部属性到 Select 组件
      props: {
        clearable: true,
        options: STATUS_OPTIONS,
      },
      // 校验规则，此处同 Form 表单
      rules: [
        {
          required: true,
          message: '不能为空',
        },
      ],
      showEditIcon: false,
      on: ({ updateEditedCellValue }) => ({
        onChange: () => {
          /**
           * change other columns edited cell value
           * 更新本行其他编辑态单元格的数据(to update editedRow)
           */
          updateEditedCellValue({
            isUpdateCurrentRow: true,
            letters: [],
            // 'user.firstName': '',
            // createTime: dayjs().add(1, 'day').toDate(),
          });
          /**
           * update edited row data with row unique value is qual to 2
           * 更新行唯一标识值为 2 的编辑态数据
           */
          // updateEditedCellValue({ rowValue: 2, letters: [] });
        },
      }),
    },
  },
  {
    title: '申请事项',
    colKey: 'letters',
    cell: (h, { row }) => row.letters.join('、'),
    edit: {
      component: Select,
      // props, 透传全部属性到 Select 组件
      // props 为函数时，参数有：col, row, rowIndex, colIndex, editedRow, updateEditedCellValue。一般用于实现编辑组件之间的联动
      props: ({
        col, row, rowIndex, colIndex, editedRow, updateEditedCellValue,
      }) => {
        console.log(col, row, rowIndex, colIndex, editedRow, updateEditedCellValue);
        return {
          multiple: true,
          minCollapsedNum: 1,
          options: [
            {
              label: '宣传物料制作费用',
              value: '宣传物料制作费用',
            },
            {
              label: 'algolia 服务报销',
              value: 'algolia 服务报销',
            },
            // 如果状态选择了 已过期，则 Letters 隐藏 G 和 H
            {
              label: '相关周边制作费',
              value: '相关周边制作费',
              show: () => editedRow.status !== 0,
            },
            {
              label: '激励奖品快递费',
              value: '激励奖品快递费',
              show: () => editedRow.status !== 0,
            },
          ].filter((t) => (t.show === undefined ? true : t.show())),
        };
      },
      // 校验规则，此处同 Form 表单
      rules: [
        {
          validator: (val) => Boolean(val && val.length < 3),
          message: '数量不能超过 2 个',
        },
        {
          validator: (val) => Boolean(val?.length),
          message: '至少选择一个',
        },
      ],
      showEditIcon: false,
    },
  },
  {
    title: '创建日期',
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
    title: '操作栏',
    colKey: 'operate',
    width: 150,
    cell: (h, { row }) => {
      const editable = editableRowKeys.value.includes(row.key);
      return (
        <div class="table-operations">
          {!editable && (
            <t-link theme="primary" hover="color" data-id={row.key} onClick={onEdit}>
              编辑
            </t-link>
          )}
          {editable && (
            <t-link theme="primary" hover="color" data-id={row.key} onClick={onSave}>
              保存
            </t-link>
          )}
          {editable && (
            <t-link theme="primary" hover="color" data-id={row.key} onClick={onCancel}>
              取消
            </t-link>
          )}
        </div>
      );
    },
  },
]);
const onEdit = (e) => {
  const { id } = e.currentTarget.dataset;
  if (!editableRowKeys.value.includes(id)) {
    editableRowKeys.value.push(id);
  }
};
const updateEditState = (id) => {
  const index = editableRowKeys.value.findIndex((t) => t === id);
  editableRowKeys.value.splice(index, 1);
};
const onSave = (e) => {
  const { id } = e.currentTarget.dataset;
  currentSaveId.value = id;
  // 触发内部校验，而后在 onRowValidate 中接收异步校验结果
  // 重点：受框架层面限制，如果是 EnhancedTable 请更为使用 this.$refs.tableRef.primaryTableRef.validateRowData(id)
  // this.$refs.tableRef.primaryTableRef.validateRowData(id).then((params) => {
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
// 行校验反馈事件，this.$refs.tableRef.validateRowData 执行结束后触发
const onRowValidate = (params) => {
  console.log('Event Table Row Validate:', params);
};
const onValidateTableData = () => {
  // 执行结束后触发事件 validate
  tableRef.value.validateTableData().then((params) => {
    console.log('Promise Table Data Validate:', params);
    const cellKeys = Object.keys(params.result);
    const firstError = params.result[cellKeys[0]];
    if (firstError) {
      MessagePlugin.warning(firstError[0].message);
    }
  });
};
// 表格全量数据校验反馈事件，this.$refs.tableRef.validateTableData() 执行结束后触发
const onValidate = (params) => {
  console.log('Event Table Data Validate:', params);
};
const onRowEdit = (params) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    row,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rowIndex,
    col,
    value,
  } = params;
  const oldRowData = editMap[row.key]?.editedRow || row;
  const editedRow = {
    ...oldRowData,
    [col.colKey]: value,
  };
  editMap[row.key] = {
    ...params,
    editedRow,
  };

  // ⚠️ 重要：以下内容应用于全量数据校验（单独的行校验不需要）
  // const newData = [...this.data];
  // newData[rowIndex] = editedRow;
  // this.data = newData;
  // 或者
  // this.$set(this.data, rowIndex, editedRow);
};
</script>

<style>
.t-table-demo__editable-row .table-operations > .t-link {
  margin-right: 8px;
}
.t-table-demo__editable-row .t-demo-col__datepicker .t-date-picker {
  width: 120px;
}
</style>
