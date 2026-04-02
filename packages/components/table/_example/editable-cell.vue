<template>
  <div>
    <!-- 当前示例包含：输入框、单选、多选、日期 等场景 -->
    <!-- editableCellState 用于控制某些单元格为只读状态 -->
    <t-table
      ref="tableRef"
      row-key="key"
      :columns="columns"
      :data="data"
      :editable-cell-state="editableCellState"
      bordered
      lazy-load
    />
    <br />

    <!-- 示例代码有效，勿删 -->
    <t-space>
      <t-button @click="validateTableData">校验</t-button>
    </t-space>
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
  TableProps,
  TableInstanceFunctions,
  ButtonProps,
  BaseTableCol,
  TableEditableCellPropsParams,
  PrimaryTableOnEditedContext,
} from 'tdesign-vue-next';
interface TableData {
  key: string;
  firstName: string;
  status: number;
  email: string;
  letters: string[];
  createTime: string;
}
const initData = new Array(5).fill(null).map((_, i) => ({
  key: String(i + 1),
  firstName: ['贾明', '张三', '王芳'][i % 3],
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
const align = ref<BaseTableCol['align']>('left');
const data = ref<TableProps['data']>([...initData]);

// 用于控制哪些行或哪些单元格不允许出现编辑态，参数有 { row, col, rowIndex, colIndex }
const editableCellState: TableProps['editableCellState'] = (cellParams) => {
  // 第一行不允许编辑
  const { row } = cellParams;
  return row.status !== 2;
};
const tableRef = ref<TableInstanceFunctions>();
// 用于提交前校验数据（示例代码有效，勿删）
const validateTableData: ButtonProps['onClick'] = () => {
  // 仅校验处于编辑态的单元格
  tableRef.value.validateTableData().then((result) => {
    console.log('validate result: ', result);
  });
};
const columns = computed<TableProps['columns']>(() => [
  {
    title: '申请人',
    colKey: 'firstName',
    align: align.value,
    // 编辑状态相关配置，全部集中在 edit
    edit: {
      // 1. 支持任意组件。需保证组件包含 `value` 和 `onChange` 两个属性，且 onChange 的第一个参数值为 new value。
      // 2. 如果希望支持校验，组件还需包含 `status` 和 `tips` 属性。具体 API 含义参考 Input 组件
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autofocus: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx: {
          e: {
            preventDefault: () => void;
          };
        }) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onEnter'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        console.log(context);
        const newData = [...data.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        data.value = newData;
        console.log('Edit firstName:', context);
        MessagePlugin.success('Success');
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form
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
      // 默认是否为编辑状态
      defaultEditable: true,
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
      on: (editContext: TableEditableCellPropsParams<TableData>) => ({
        onChange: (params: any) => {
          console.log('status changed', editContext, params);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      // abortEditOnEvent: ['onChange'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context: PrimaryTableOnEditedContext<TableData>) => {
        data.value.splice(context.rowIndex, 1, context.newRowData);
        console.log('Edit Framework:', context);
        MessagePlugin.success('Success');
      },
    },
  },
  {
    title: '申请事项',
    colKey: 'letters',
    cell: (h, { row }) => row.letters.join('、'),
    edit: {
      // 始终保持为编辑态
      keepEditMode: true,
      component: Select,
      // props, 透传全部属性到 Select 组件
      // props 为函数时，参数有：col, row, rowIndex, colIndex, editedRow。一般用于实现编辑组件之间的联动
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      props: ({ editedRow }) => {
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
      // abortEditOnEvent: ['onChange'],
      onEdited: (context) => {
        data.value.splice(context.rowIndex, 1, context.newRowData);
        console.log('Edit Letters:', context);
        MessagePlugin.success('Success');
      },
      rules: [
        {
          validator: (val) => val.length > 0,
          message: '至少选择一种',
        },
      ],
    },
  },
  {
    title: '创建日期',
    colKey: 'createTime',
    edit: {
      component: DatePicker,
      // props, 透传全部属性到 DatePicker 组件
      props: {},
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onChange'],
      onEdited: (context) => {
        data.value.splice(context.rowIndex, 1, context.newRowData);
        console.log('Edit Date:', context);
        MessagePlugin.success('Success');
      },
      // 校验规则，此处同 Form 表单
      rules: () => [
        {
          validator: (val) => dayjs(val).isAfter(dayjs()),
          message: '只能选择今天以后日期',
        },
      ],
    },
  },
]);
</script>
