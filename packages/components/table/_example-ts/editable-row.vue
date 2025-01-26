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
      lazy-load
      @row-edit="onRowEdit"
      @row-validate="onRowValidate"
      @validate="onValidate"
    />
  </div>
</template>

<script lang="tsx" setup>
import dayjs from 'dayjs';
import { ref, computed } from 'vue';
import {
  Input,
  Select,
  DatePicker,
  MessagePlugin,
  TableInstanceFunctions,
  TableProps,
  PrimaryTableValidateContext,
  BaseTableCol,
} from 'tdesign-vue-next';
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
const tableRef = ref<TableInstanceFunctions>();
const align = ref<BaseTableCol['align']>('left');
const data = ref<TableProps['data']>([...initData]);
const editableRowKeys = ref<TableProps['editableRowKeys']>(['1']);
const currentSaveId = ref('');
// 保存变化过的行信息
const editMap = {};
const onEdit = (e: MouseEvent) => {
  const { id } = (e.currentTarget as HTMLElement).dataset;
  if (!editableRowKeys.value.includes(id)) {
    editableRowKeys.value.push(id);
  }
};

// 更新 editableRowKeys
const updateEditState = (id: string) => {
  const index = editableRowKeys.value.findIndex((t) => t === id);
  editableRowKeys.value.splice(index, 1);
};
const onCancel = (e: MouseEvent) => {
  const { id } = (e.currentTarget as HTMLElement).dataset;
  updateEditState(id);
  tableRef.value?.clearValidateData();
};
const onSave = (e: MouseEvent) => {
  const { id } = (e.currentTarget as HTMLElement).dataset;
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
const onRowValidate: TableProps['onRowValidate'] = (params) => {
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
function onValidate(params: PrimaryTableValidateContext) {
  console.log('Event Table Data Validate:', params);
}
const onRowEdit: TableProps['onRowEdit'] = (params) => {
  const { row, col, value } = params;
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
  // const newData = [...data.value];
  // newData[rowIndex] = editedRow;
  // data.value = newData;
};
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
const columns = computed<TableProps['columns']>(() => [
  {
    title: '申请人',
    colKey: 'user.firstName',
    align: align.value,
    width: 120,
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
        autoWidth: true,
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
      /**
       * 1. pass props to Select
       * 2. props 为函数时，参数有：col, row, rowIndex, colIndex, editedRow，updateEditedCellValue。一般用于实现编辑组件之间的联动
       * 3. updateEditedCellValue used to update value of editable cell
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      props: ({ col, row, rowIndex, colIndex, editedRow, updateEditedCellValue }) => {
        console.log(col, row, rowIndex, colIndex, editedRow, updateEditedCellValue);
        return {
          multiple: true,
          minCollapsedNum: 1,
          autoWidth: true,
          options: [
            {
              label: '宣传物料制作费用',
              value: '宣传物料制作费用',
            },
            {
              label: 'algolia 服务报销',
              value: 'algolia 服务报销',
            },
            // 如果状态选择了 已过期，则 Letters 隐藏 G 和 h
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
          validator: (val) => val && val.length < 3,
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
    edit: {
      component: DatePicker,
      // props, 透传全部属性到 DatePicker 组件
      props: {
        allowInput: true,
      },
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
</script>

<style>
.t-table-demo__editable-row .table-operations > .t-link {
  margin-right: 8px;
}
.t-table-demo__editable-row .t-demo-col__datepicker .t-date-picker {
  width: 120px;
}
</style>
