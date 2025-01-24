<template>
  <t-space direction="vertical">
    <t-space>
      <t-radio-group v-model="checkStrictly" variant="default-filled">
        <t-radio-button value="true"> 父子行选中独立 </t-radio-button>
        <t-radio-button value="false">
          <t-popup
            content="「父子行选中关联」由于表格数据的特殊性，父节点选中或者取消选中，会影响子节点；但子节点选中或取消不影响父元素"
          >
            父子行选中关联
          </t-popup>
        </t-radio-button>
      </t-radio-group>

      <t-button theme="default" @click="getTreeExpandedRow">获取树形结构展开的节点</t-button>
      <t-button theme="default" @click="scrollToElement">滚动到指定元素</t-button>
    </t-space>
    <!-- 子节点字段不是 children，而是 childrenList -->
    <!-- expandedRow 和 expanded-row-keys 控制是否显示展开收起行，以及哪些行展开 -->
    <!-- !!! EnhancedTable 才支持，普通 Table 不支持 !!! -->

    <!-- !!! 大数据虚拟滚动设置，一般情况不需要。 :scroll="{ type: 'virtual', rowHeight: 49, bufferSize: 10 }" -->

    <t-enhanced-table
      ref="enhancedTableRef"
      row-key="key"
      :expanded-row="expandedRowRender"
      :expanded-row-keys="expandedRowKeys"
      :columns="columns"
      :data="data"
      :tree="{
        childrenKey: 'childrenList',
        checkStrictly: checkStrictly === 'true' ? true : false,
        treeNodeColumnIndex: 2,
        expandTreeNodeOnClick: true,
      }"
      :selected-row-keys="selectedRowKeys"
      :height="300"
      :scroll="{ type: 'virtual', rowHeight: 49, bufferSize: 10 }"
      lazy-load
      @expand-change="onExpandChange"
      @select-change="rehandleSelectChange"
      @row-click="onRowClick"
    />
  </t-space>
</template>

<script lang="tsx" setup>
import { cloneDeep } from 'lodash-es';
import { ref, watch } from 'vue';
import {
  EnhancedTable as TEnhancedTable,
  MessagePlugin,
  EnhancedTableProps,
  ButtonProps,
  AllTableInstanceFunctions,
} from 'tdesign-vue-next';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
interface TableData {
  key: string;
  applicant: string;
  status: number;
  channel: string;
  email: string;
  matters: string;
  time: number;
  createTime: string;
  childrenList?: TableData[];
}
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
const initData = [];
for (let i = 0; i < 500; i++) {
  const obj: TableData = {
    key: `first_level_${i}`,
    applicant: ['贾明', '张三', '王芳'][i % 3],
    status: i % 3,
    channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
    matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
    time: [2, 3, 1, 4][i % 4],
    createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
  };
  obj.childrenList = new Array(5).fill(null).map((t, j) => {
    const secondIndex = 100 * j + (i + 1) * 10;
    const secondObj = {
      ...obj,
      status: secondIndex % 3,
      key: `second_level_${secondIndex}`,
      applicant: ['贾明', '张三', '王芳'][secondIndex % 3],
    };
    secondObj.childrenList = new Array(5).fill(null).map((m, n) => {
      const thirdIndex = secondIndex * 1000 + 100 * m + (n + 1) * 10;
      return {
        ...obj,
        status: thirdIndex % 3,
        key: `third_level_${thirdIndex}`,
        applicant: ['贾明', '张三', '王芳'][thirdIndex % 3],
      };
    });
    return secondObj;
  });
  initData.push(obj);
}
const enhancedTableRef = ref<AllTableInstanceFunctions>();
const columns: EnhancedTableProps['columns'] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    // 禁用行选中方式一：使用 disabled 禁用行（示例代码有效，勿删）。disabled 参数：{row: RowData; rowIndex: number })
    // 这种方式禁用行选中，当前行会添加行类名 t-table__row--disabled，禁用行文字变灰
    // disabled: ({ rowIndex }) => rowIndex === 1 || rowIndex === 3,

    // 禁用行选中方式二：使用 checkProps 禁用行（示例代码有效，勿删）
    // 这种方式禁用行选中，行文本不会变灰
    checkProps: ({ row }) => ({
      disabled: !row.childrenList && row.status !== 0,
    }),
    // 自由调整宽度，如果发现元素看不见，请加大宽度
    width: 50,
  },
  {
    colKey: 'serial-number',
    width: 80,
    title: '编号',
  },
  {
    colKey: 'applicant',
    title: '申请人',
    width: 120,
  },
  {
    colKey: 'status',
    title: '状态',
    width: 144,
    cell: (h, { rowIndex }) => {
      const status = rowIndex % 3;
      return (
        <t-tag shape="round" theme={statusNameListMap[status].theme} variant="light-outline">
          {statusNameListMap[status].icon}
          {statusNameListMap[status].label}
        </t-tag>
      );
    },
  },
  {
    colKey: 'matters',
    title: '申请事项',
    width: '150',
  },
  // { colKey: 'email', title: '邮箱地址' },
];
const data = ref(initData);
const checkStrictly = ref('true');
const selectedRowKeys = ref([]);
const expandedRowKeys = ref([]);
watch(
  () => checkStrictly.value,
  () => {
    selectedRowKeys.value = [];
    data.value = cloneDeep(data.value);
  },
);
const rehandleSelectChange: EnhancedTableProps['onSelectChange'] = (value, { selectedRowData }) => {
  selectedRowKeys.value = value;
  console.log(value, selectedRowData);
};
const expandedRowRender: EnhancedTableProps['expandedRow'] = (h, { row }) => <div>拓展信息：我是 {row.key} 号</div>;
const onExpandChange: EnhancedTableProps['onExpandChange'] = (val) => {
  expandedRowKeys.value = val;
};
const getTreeExpandedRow: ButtonProps['onClick'] = () => {
  const treeExpandedRowKeys = enhancedTableRef.value.getTreeExpandedRow('unique');
  console.log('行唯一标识值：', treeExpandedRowKeys);
  const treeExpandedRow = enhancedTableRef.value.getTreeExpandedRow('data');
  console.log('行数据：', treeExpandedRow);
  const treeExpandedRowState = enhancedTableRef.value.getTreeExpandedRow('all');
  console.log('全部行信息：', treeExpandedRowState);
  MessagePlugin.success('获取成功，请打开控制台查看');
};
const scrollToElement: ButtonProps['onClick'] = () => {
  // 方式一：通过行唯一标识跳转到指定行
  enhancedTableRef.value.scrollToElement({
    // 滚动到指定元素
    key: 'first_level_150',
    // 如果元素没有被展开，则跳转到父元素所在位置
    // key: 'second_level_1510',
    // 滚动元素距离顶部的距离（如表头高度）
    top: 47,
    // 高度动态变化场景下，即 isFixedRowHeight = false。延迟设置元素位置，一般用于依赖不同高度异步渲染等场景，单位：毫秒。（固定高度不需要这个）
    time: 60,
  });

  // 方式二：通过行下标跳转到指定行（示例代码有效：勿删）
  // const treeNodeData = enhancedTableRef.value.getData(`first_level_150`);
  // console.log(treeNodeData);
  // // 因为可能会存在前面的元素节点展开，或行展开，故而下标跟序号不一定一样，不一定是 150
  // enhancedTableRef.value.scrollToElement({
  //   // 跳转元素下标（第 151 个元素位置）
  //   index: treeNodeData.rowIndex - selectedRowKeys.value.length,
  //   // 滚动元素距离顶部的距离（如表头高度）
  //   top: 47,
  //   // 高度动态变化场景下，即 isFixedRowHeight = false。延迟设置元素位置，一般用于依赖不同高度异步渲染等场景，单位：毫秒。（固定高度不需要这个）
  //   time: 60,
  // });
};
const onRowClick: EnhancedTableProps['onRowClick'] = (data) => {
  console.log(data);
};
</script>
