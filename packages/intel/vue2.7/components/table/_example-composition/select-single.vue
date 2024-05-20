<template>
  <div class="tdesign-demo__table">
    <!-- 支持非受控属性 default-selected-row-keys -->
    <!-- 支持语法糖 selected-row-keys.sync -->
    <t-table
      rowKey="index"
      :columns="columns"
      :data="data"
      @select-change="rehandleSelectChange"
      select-on-row-click
      lazyLoad
      @row-click="onRowClick"
      @row-dblclick="onRowDblclick"
    >
      <template #status="{ row }">
        <p v-if="row.status === 0" class="status">健康</p>
        <p v-if="row.status === 1" class="status unhealth">异常</p>
      </template>
      <template #op-column><p>操作</p></template>
      <template #op="slotProps">
        <a class="link" @click="rehandleClickOp(slotProps)">管理</a>
        <a class="link" @click="rehandleClickOp(slotProps)">删除</a>
      </template>
    </t-table>
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';

const initialData = [];
for (let i = 0; i < 5; i++) {
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
  });
}
const disabledFunc = ({ rowIndex }) => rowIndex === 1 || rowIndex === 3;
// const highlightSelectedRow = ref(false);
const selectedOnRowClick = ref(false);
const selectedRowKeys = ref([2]);
const columns = ref([
  {
    // title: '单选',
    // align: 'center',
    colKey: 'row-select',
    type: 'single',
    // 允许单选(Radio)取消行选中
    checkProps: {
      allowUncheck: true,
    },
    // 禁用行选中方式一：使用 disabled 禁用行（示例代码有效，勿删，随时需要测试）。disabled 参数：{row: RowData; rowIndex: number })
    // 这种方式禁用行选中，当前行会添加行类名 t-table__row--disabled，禁用行文字变灰
    disabled: ({ rowIndex }) => rowIndex === 1 || rowIndex === 3,
    // 禁用行选中方式二：使用 checkProps 禁用行（示例代码有效，勿删，随时需要测试）
    // 这种方式禁用行选中，行文本不会变灰，不会添加类名 t-table__row--disabled
    // checkProps: ({ rowIndex }) => ({ disabled: rowIndex % 2 !== 0 }),
    width: 50,
  },
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
]);
const data = ref(initialData);
const rehandleClickOp = (context) => {
  console.log(context);
};
const rehandleSelectChange = (value, { selectedRowData }) => {
  selectedRowKeys.value = value;
  console.log(value, selectedRowData);
};
// 整行选中示例
const onRowClick = ({ row, index }) => {
  if (
    selectedOnRowClick.value
    && !disabledFunc({
      row,
      rowIndex: index,
    })
  ) {
    selectedRowKeys.value = [row.id];
  }
};
const onRowDblclick = (context) => {
  console.log(context);
};
</script>

<style lang="less">
/** 此处示范 如何设置行高亮 */
.tdesign-demo__select-single {
  /** 背景色示范 */
  .t-table__row--selected {
    background-color: #ecf2fe;
  }
  /** 最右侧选中图标示范 */
  .t-table__row--selected > td:last-child::after {
    content: '✅';
    font-size: 12px;
    position: absolute;
    right: 0;
    bottom: 18px;
    width: 20px;
    height: 16px;
  }
}
</style>

<style lang="less" scoped>
.link {
  cursor: pointer;
  margin-right: 15px;
}
.status {
  position: relative;
  color: #00a870;
  margin-left: 10px;
  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    content: '';
    background-color: #00a870;
    width: 6px;
    height: 6px;
    margin-left: -10px;
    border-radius: 50%;
  }
}
.status.unhealth {
  color: #e34d59;
  &::before {
    background-color: #e34d59;
  }
}
</style>
