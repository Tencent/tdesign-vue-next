<template>
  <div>
    <!-- 当前示例包含：输入框、单选、多选、日期 等场景 -->
    <t-table
      ref="tableRef"
      row-key="key"
      :columns="columns"
      :data="data"
      :editable-cell-state="editableCellState"
      bordered
      lazyLoad
    />
    <!-- 示例代码有效，勿删 -->
    <!-- <t-button @click="validateTableData">校验</t-button> -->
  </div>
</template>

<script>
import {
  Input, Select, DatePicker, MessagePlugin,
} from 'tdesign-vue';
import dayjs from 'dayjs';

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
  { label: '审批通过', value: 0 },
  { label: '审批过期', value: 1 },
  { label: '审批失败', value: 2 },
];

export default {
  name: 'TTableEditableCell',

  data() {
    return {
      align: 'left',
      data: [...initData],
    };
  },

  computed: {
    columns() {
      return [
        {
          title: '申请人',
          colKey: 'firstName',
          align: this.align,
          // 编辑状态相关配置，全部集中在 edit
          edit: {
            // 1. 支持任意组件。需保证组件包含 `value` 和 `onChange` 两个属性，且 onChange 的第一个参数值为 new value。
            // 2. 如果希望支持校验，组件还需包含 `status` 和 `tips` 属性。具体 API 含义参考 Input 组件
            component: Input,
            // props, 透传全部属性到 Input 组件（可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
            props: {
              clearable: true,
              autofocus: true,
            },
            // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
            abortEditOnEvent: ['onEnter'],
            // 编辑完成，退出编辑态后触发
            onEdited: (context) => {
              this.data.splice(context.rowIndex, 1, context.newRowData);
              console.log('Edit firstName:', context);
              MessagePlugin.success('Success');
            },
            // 校验规则，此处同 Form 表单
            rules: [
              { required: true, message: '不能为空' },
              { max: 10, message: '字符数量不能超过 10', type: 'warning' },
            ],
            // 默认是否为编辑状态
            defaultEditable: true,
            // 校验时机：exit | change
            validateTrigger: 'change',
            // 透传给 component: Input 的事件
            on: (editContext) => ({
              onBlur: () => {
                console.log('失去焦点', editContext);
              },
              // both onEnter and enter can work
              onEnter: (ctx) => {
                console.log('回车', ctx);
              },
            }),
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
            // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
            // abortEditOnEvent: ['onChange'],
            // 编辑完成，退出编辑态后触发
            onEdited: (context) => {
              this.data.splice(context.rowIndex, 1, context.newRowData);
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
            component: Select,
            keepEditMode: true,
            rules: [{ validator: (val) => val.length > 0, message: '至少选择一种' }],
            // props, 透传全部属性到 Select 组件
            // props 为函数时，参数有：col, row, rowIndex, colIndex, editedRow。一般用于实现编辑组件之间的联动
            props: ({
              col, row, rowIndex, colIndex, editedRow,
            }) => {
              console.log(col, row, rowIndex, colIndex, editedRow);
              return {
                multiple: true,
                minCollapsedNum: 1,
                options: [
                  { label: '宣传物料制作费用', value: '宣传物料制作费用' },
                  { label: 'algolia 服务报销', value: 'algolia 服务报销' },
                  // 如果状态选择了 已过期，则 Letters 隐藏 G 和 H
                  { label: '相关周边制作费', value: '相关周边制作费', show: () => editedRow.status !== 0 },
                  { label: '激励奖品快递费', value: '激励奖品快递费', show: () => editedRow.status !== 0 },
                ].filter((t) => (t.show === undefined ? true : t.show())),
              };
            },
            // abortEditOnEvent: ['onChange'],
            onEdited: (context) => {
              this.data.splice(context.rowIndex, 1, context.newRowData);
              console.log('Edit Letters:', context);
              MessagePlugin.success('Success');
            },
          },
        },
        {
          title: '创建日期',
          colKey: 'createTime',
          // props, 透传全部属性到 DatePicker 组件
          edit: {
            component: DatePicker,
            props: {
              mode: 'date',
            },
            // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
            abortEditOnEvent: ['onChange'],
            onEdited: (context) => {
              this.data.splice(context.rowIndex, 1, context.newRowData);
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
      ];
    },
  },

  methods: {
    // 用于控制哪些行或哪些单元格不允许出现编辑态
    editableCellState(cellParams) {
      const { rowIndex } = cellParams;
      // return row.status !== 2;
      return rowIndex !== 2;
    },

    // 用于提交前校验数据（示例代码有效，勿删）
    // validateTableData() {
    //   // 仅校验处于编辑态的单元格
    //   this.$refs.tableRef.validateTableData().then((result) => {
    //     console.log('validate result: ', result);
    //   });
    // },
  },
};
</script>

<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
