<template>
  <div class="tdesign-demo-block-column-large">
    <!-- 按钮操作区域 -->
    <t-space direction="vertical">
      <t-radio-group v-model="placement" variant="default-filled">
        <t-radio-button value="top-left">左上角</t-radio-button>
        <t-radio-button value="top-right">右上角</t-radio-button>
        <t-radio-button value="bottom-left">左下角</t-radio-button>
        <t-radio-button value="bottom-right">右下角</t-radio-button>
      </t-radio-group>
      <t-space>
        <t-checkbox v-model="groupColumn">分组列配置</t-checkbox>
        <t-checkbox v-model="bordered">是否显示边框</t-checkbox>
        <t-checkbox v-model="customText">自定义列配置按钮</t-checkbox>
      </t-space>
    </t-space>

    <!-- 1. defaultDisplayColumns = ['platform'] 设置默认显示哪些列，仅第一次有效 -->
    <!-- 2. displayColumns 动态设置显示哪些列，受控属性，支持 displayColumns.sync 语法糖 -->
    <!-- 3. onDisplayColumnsChange 当前显示列发生变化时触发 -->
    <!-- 4. 如果希望顶部内容 和 列配置按钮 保持在同一行，可将内容放在 topContent，并调整按钮父元素宽度(CSS) -->
    <!-- 5. resizable and tableLayout: fixed is suggested  -->
    <!-- :locale="tableLocale" 可用于定义列配置弹框所有文本信息 -->
    <t-table
      v-model:displayColumns="displayColumns"
      row-key="index"
      :data="data"
      :columns="columns"
      :column-controller="columnControllerConfig"
      :pagination="{ defaultPageSize: 5, defaultCurrent: 1, total: 100 }"
      :bordered="bordered"
      stripe
      resizable
      lazy-load
      @column-change="onColumnChange"
    >
    </t-table>

    <!--
    <template #columnControllerTopContent>
      <span>列配置弹框顶部内容</span>
    </template>
    <template #columnControllerBottomContent>
      <span>列配置弹框底部内容</span>
    </template>
  -->

    <!-- 非受控用法，示例代码有效，勿删 -->
    <!-- <t-table
      row-key="index"
      :data="data"
      :columns="columns"
      :column-controller="{ displayType: 'fixed-width', fields: ['platform', 'type', 'default'] }"
      table-layout="auto"
      stripe
      bordered
      @column-change="onColumnChange"
    ></t-table> -->
  </div>
</template>
<script lang="tsx" setup>
import { computed, ref } from 'vue';
import { TableColumnController, TableProps } from 'tdesign-vue-next';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
const placement = ref<TableColumnController['placement']>('top-right');
const bordered = ref(true);
const customText = ref(false);
const statusNameListMap = {
  0: {
    label: '审批通过',
    theme: 'success',
    icon: <CheckCircleFilledIcon />,
  },
  1: {
    label: '审批失败',
    theme: 'danger',
    icon: <CloseCircleFilledIcon />,
  },
  2: {
    label: '审批过期',
    theme: 'warning',
    icon: <ErrorCircleFilledIcon />,
  },
};
const initialData = [];
for (let i = 0; i < 100; i++) {
  initialData.push({
    index: i + 1,
    applicant: ['贾明', '张三', '王芳'][i % 3],
    status: i % 3,
    channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    detail: {
      email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
    },
    matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
    time: [2, 3, 1, 4][i % 4],
    createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
    data1: '123',
    data2: '23414',
    data3: '52435',
    data4: '132434',
  });
}
const data = ref<TableProps['data']>([...initialData]);
const groupColumn = ref(false);
// 可用于隐藏弹框中的 “请选择需要在表格中显示的数据列” 这句话
// const tableLocale = ref({
//   columnConfigDescriptionText: '',
// });

const columnControllerConfig = computed<TableProps['columnController']>(() => ({
  // 列配置按钮位置
  placement: placement.value,
  // 用于设置允许用户对哪些列进行显示或隐藏的控制，默认为全部字段
  fields: ['channel', 'detail.email', 'createTime', 'data1', 'data2', 'data3', 'data4'],
  // 弹框组件属性透传
  dialogProps: {
    preventScrollThrough: true,
  },
  // 列配置按钮组件属性透传
  buttonProps: customText.value
    ? {
        content: '显示列控制',
        theme: 'primary',
        variant: 'base',
      }
    : undefined,
  // 数据字段分组显示
  groupColumns: groupColumn.value
    ? [
        {
          label: '指标维度',
          value: 'index',
          columns: ['applicant', 'status', 'channel'],
        },
        {
          label: '次要维度',
          value: 'secondary',
          columns: ['detail.email', 'createTime'],
        },
        {
          label: '数据维度',
          value: 'data',
          columns: ['data1', 'data2', 'data3', 'data4'],
        },
      ]
    : undefined,
}));
const staticColumn = ['applicant', 'status'];
const displayColumns = ref<TableProps['displayColumns']>(
  staticColumn.concat(['channel', 'detail.email', 'createTime']),
);
const columns = ref<TableProps['columns']>([
  {
    colKey: 'applicant',
    title: '申请人',
    width: '100',
  },
  {
    colKey: 'status',
    title: '申请状态',
    width: '150',
    cell: (h, { row }) => {
      return (
        <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
          {statusNameListMap[row.status].icon}
          {statusNameListMap[row.status].label}
        </t-tag>
      );
    },
  },
  {
    colKey: 'channel',
    title: '签署方式',
    width: '120',
  },
  {
    colKey: 'detail.email',
    title: '邮箱地址',
    ellipsis: true,
  },
  {
    colKey: 'createTime',
    title: '申请时间',
  },
  {
    colKey: 'data1',
    title: 'Data A',
    align: 'right',
  },
  {
    colKey: 'data2',
    title: 'Data B',
    align: 'right',
  },
  {
    colKey: 'data3',
    title: 'Data C',
    align: 'right',
  },
  {
    colKey: 'data4',
    title: 'Data D',
    align: 'right',
  },
]);
const onColumnChange: TableProps['onColumnChange'] = (params) => {
  console.log(params);
};
</script>
