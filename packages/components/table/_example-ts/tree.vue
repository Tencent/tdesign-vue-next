<template>
  <div>
    <div>
      <t-button @click="appendToRoot">添加根节点</t-button>
      <t-button theme="default" style="margin-left: 16px" @click="resetData">重置/更新数据</t-button>
      <t-button theme="default" style="margin-left: 16px" @click="onRowToggle">任意节点展开/收起</t-button>
      <t-button theme="default" style="margin-left: 16px" @click="onExpandAllToggle">{{
        expandAll ? '收起全部' : '展开全部'
      }}</t-button>
      <t-button theme="default" style="margin-left: 16px" @click="getTreeNode">获取全部树形结构</t-button>
    </div>
    <br />
    <div>
      <t-checkbox v-model="customTreeExpandAndFoldIcon" style="vertical-align: middle">
        自定义折叠/展开图标
      </t-checkbox>
    </div>
    <br />
    <!-- !!! 树形结构 EnhancedTable 才支持，普通 Table 不支持 !!! -->
    <!-- 第一列展开树结点，缩进为 24px，子节点字段 childrenKey 默认为 children -->
    <!-- v-model:displayColumns="displayColumns" used to control displayed columns -->
    <!-- v-model:expandedTreeNodes is not required. you can control expanded tree node by expandedTreeNodes -->
    <t-enhanced-table
      ref="tableRef"
      v-model:expandedTreeNodes="expandedTreeNodes"
      row-key="key"
      drag-sort="row-handler"
      :data="data"
      :columns="columns"
      :tree="treeConfig"
      :tree-expand-and-fold-icon="treeExpandIcon"
      :pagination="pagination"
      :before-drag-sort="beforeDragSort"
      :column-controller="columnController"
      lazy-load
      @page-change="onPageChange"
      @abnormal-drag-sort="onAbnormalDragSort"
      @drag-sort="onDragSort"
      @expanded-tree-nodes-change="onExpandedTreeNodesChange"
    ></t-enhanced-table>
    <!-- @tree-expand-change="onTreeExpandChange" -->

    <!-- 第二列展开树结点，缩进为 12px，示例代码有效，勿删 -->
    <!-- indent 定义缩进距离 -->
    <!-- 如果子结点字段不是 'children'，可以使用 childrenKey 定义字段别名，如 `:tree="{ childrenKey: 'list' }"` -->
    <!-- <t-enhanced-table
      ref="tableRef"
      rowKey="key"
      :pagination="defaultPagination"
      :data="data"
      :columns="columns"
      :tree="{ indent: 12, childrenKey: 'list', defaultExpandAll: true }"
      @page-change="onPageChange"
    ></t-enhanced-table> -->
  </div>
</template>
<script lang="tsx" setup>
import { ref, reactive, computed /** , onMounted */ } from 'vue';
import {
  EnhancedTable as TEnhancedTable,
  MessagePlugin,
  Loading,
  EnhancedTableProps,
  EnhancedTableInstanceFunctions,
  ButtonProps,
  TableTreeNodeExpandOptions,
  TableRowData,
} from 'tdesign-vue-next';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  MoveIcon,
  AddRectangleIcon,
  MinusRectangleIcon,
} from 'tdesign-icons-vue-next';
interface TableData {
  id: number;
  key: string;
  platform: string;
  type: string;
  default: string;
  detail: {
    position: string;
  };
  needed: string;
  description: string;
  list?: boolean | TableData[];
}
const TOTAL = 5;
function getObject(i: number, currentPage: number) {
  const columns = {
    id: i,
    key: `申请人 ${i}_${currentPage} 号`,
    platform: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    type: ['String', 'Number', 'Array', 'Object'][i % 4],
    default: ['-', '0', '[]', '{}'][i % 4],
    detail: {
      position: `读取 ${i} 个数据的嵌套信息值`,
    },
    needed: i % 4 === 0 ? '是' : '否',
    description: '数据源',
  };
  return columns;
}
function getData(currentPage = 1) {
  const data: TableData[] = [];
  // const pageInfo = `第 ${currentPage} 页`;
  for (let i = 0; i < TOTAL; i++) {
    const obj: TableData = getObject(i, currentPage);
    // 第一行不设置子节点
    obj.list = new Array(2).fill(null).map((t, j) => {
      const secondIndex = 100 * j + (i + 1) * 10;
      const secondObj = {
        ...obj,
        id: secondIndex,
        key: `申请人 ${secondIndex}_${currentPage} 号`,
      };
      secondObj.list = new Array(3).fill(null).map((m, n) => {
        const thirdIndex = secondIndex * 1000 + 100 * m + (n + 1) * 10;
        return {
          ...obj,
          id: thirdIndex,
          key: `申请人 ${thirdIndex}_${currentPage} 号`,
          list: true,
        };
      });
      return secondObj;
    });
    // 第一行不设置子节点
    if (i === 0) {
      obj.list = [];
    }
    data.push(obj);
  }
  // 懒加载1
  data.push({
    ...getObject(66666, currentPage),
    /** 如果子节点为懒加载，则初始值设置为 true */
    list: true,
    key: '申请人懒加载节点 66666，点我体验',
  });
  // 懒加载2
  data.push({
    ...getObject(88888, currentPage),
    /** 如果子节点为懒加载，则初始值设置为 true */
    list: true,
    key: '申请人懒加载节点 88888，点我体验 ',
  });
  return data;
}
const tableRef = ref<EnhancedTableInstanceFunctions>(null);
const data = ref(getData());
const lazyLoadingData = ref(null);
const columnController = ref({
  placement: 'bottom-left',
  // 允许控制哪些列显示或隐藏
  fields: ['id', 'platform', 'operate'],
  dialogProps: {
    preventScrollThrough: true,
  },
});

// 非必须，如果不传，表格有内置树形节点展开逻辑
const expandedTreeNodes = ref<EnhancedTableProps['expandedTreeNodes']>([]);
const treeConfig: EnhancedTableProps['tree'] = reactive({
  childrenKey: 'list',
  treeNodeColumnIndex: 2,
  indent: 25,
  expandTreeNodeOnClick: true,
});

// 重置数据和展开节点
const resetData: ButtonProps['onClick'] = () => {
  const newData = getData();
  // 方式一
  data.value = newData;
  expandedTreeNodes.value = [];

  // 方式二
  // tableRef.value.resetData(newData);
};
const onEditClick = (row: TableRowData) => {
  const newData = {
    ...row,
    platform: 'New',
    type: 'Symbol',
    default: 'undefined',
  };
  tableRef.value.setData(row.key, newData);
  MessagePlugin.success('数据已更新');
};
const onDeleteConfirm = (row: TableRowData) => {
  // 移除当前节点及其所有子节点
  tableRef.value.remove(row.key);

  // 仅移除所有子节点
  // tableRef.value.removeChildren(row.key);
  MessagePlugin.success('删除成功');
};
const onLookUp = (row: TableRowData) => {
  const allRowData = tableRef.value.getData(row.key);
  const message = '当前行全部数据，包含节点路径、父节点、子节点、是否展开、是否禁用等';
  MessagePlugin.success(`打开控制台查看${message}`);
  console.log(`${message}：`, allRowData);
};
const appendTo = (row: TableRowData) => {
  const randomKey1 = Math.round(Math.random() * Math.random() * 1000) + 10000;
  tableRef.value.appendTo(row.key, {
    id: randomKey1,
    key: `申请人 ${randomKey1} 号`,
    platform: '电子签署',
    type: 'Number',
  });
  MessagePlugin.success(`已插入子节点申请人 ${randomKey1} 号，请展开查看`);

  // 一次性添加多个子节点。示例代码有效，勿删！!!
  // appendMultipleDataTo(row);
};
function appendMultipleDataTo(row: TableRowData) {
  const randomKey1 = Math.round(Math.random() * Math.random() * 1000) + 10000;
  const randomKey2 = Math.round(Math.random() * Math.random() * 1000) + 10000;
  const randomKey3 = Math.round(Math.random() * Math.random() * 1000) + 10000;
  const appendList = [
    {
      id: randomKey1,
      key: `申请人 ${randomKey1} 号`,
      platform: '电子签署',
      type: 'Number',
    },
    {
      id: randomKey2,
      key: `申请人 ${randomKey2} 号`,
      platform: '纸质签署',
      type: 'Number',
    },
    {
      id: randomKey3,
      key: `申请人 ${randomKey3} 号`,
      platform: '纸质签署',
      type: 'Number',
      list: true,
    },
  ];
  tableRef.value.appendTo(row?.key, appendList);
  MessagePlugin.success(`已插入子节点申请人 ${randomKey1} 和 ${randomKey2} 号，请展开查看`);
}

// 当前节点之前，新增兄弟节前
const insertBefore = (row: TableRowData) => {
  const randomKey = Math.round(Math.random() * Math.random() * 1000) + 10000;
  tableRef.value.insertBefore(row.key, {
    id: randomKey,
    key: `申请人 ${randomKey} 号`,
    platform: '纸质签署',
    type: 'Number',
  });
  MessagePlugin.success(`已插入子节点申请人 ${randomKey} 号，请展开查看`);
};

// 当前节点之后，新增兄弟节前
const insertAfter = (row: TableRowData) => {
  const randomKey = Math.round(Math.random() * Math.random() * 1000) + 10000;
  tableRef.value.insertAfter(row.key, {
    id: randomKey,
    key: `申请人 ${randomKey} 号`,
    platform: '纸质签署',
    type: 'Number',
  });
  MessagePlugin.success(`已插入子节点申请人 ${randomKey} 号，请展开查看`);
};
const columns: EnhancedTableProps['columns'] = [
  {
    // 列拖拽排序必要参数
    colKey: 'drag',
    title: '排序',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: (h) => <MoveIcon />,
    width: 46,
  },
  {
    colKey: 'id',
    title: '编号',
    ellipsis: true,
    width: 80,
  },
  {
    width: 180,
    colKey: 'key',
    title: '申请人',
    ellipsis: true,
  },
  {
    colKey: 'platform',
    title: '签署方式',
    width: 100,
  },
  {
    colKey: 'operate',
    width: 340,
    title: '操作',
    // 增、删、改、查 等操作
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: (h, { row }) => (
      <div class="tdesign-table-demo__table-operations">
        <t-link variant="text" hover="color" onClick={() => appendTo(row)}>
          插入
        </t-link>
        <t-link variant="text" hover="color" onClick={() => insertBefore(row)}>
          前插
        </t-link>
        <t-link variant="text" hover="color" onClick={() => insertAfter(row)}>
          后插
        </t-link>
        <t-link variant="text" hover="color" onClick={() => onEditClick(row)}>
          更新
        </t-link>
        <t-link variant="text" hover="color" onClick={() => onLookUp(row)}>
          查看
        </t-link>
        <t-popconfirm content="确认删除吗" onConfirm={() => onDeleteConfirm(row)}>
          <t-link variant="text" hover="color" theme="danger">
            删除
          </t-link>
        </t-popconfirm>
      </div>
    ),
  },
];
const expandAll = ref(false);
const pagination: EnhancedTableProps['pagination'] = reactive({
  current: 1,
  pageSize: TOTAL,
  total: TOTAL,
});

// const defaultPagination = {
//   defaultCurrent: 1,
//   defaultPageSize: TOTAL,
//   total: TOTAL,
// };

const onPageChange: EnhancedTableProps['onPageChange'] = (pageInfo) => {
  pagination.current = pageInfo.current;
  pagination.pageSize = pageInfo.pageSize;
  data.value = getData(pageInfo.current);
};
const onRowToggle: ButtonProps['onClick'] = () => {
  const rowIds = ['申请人 1_1 号', '申请人 2_1 号', '申请人 3_1 号', '申请人 4_1 号'];
  rowIds.forEach((id) => {
    // getData 参数为行唯一标识，lodash.get(row, rowKey)
    const rowData = tableRef.value.getData(id);
    tableRef.value.toggleExpandData(rowData);
    // 或者
    // tableRef.value.toggleExpandData({ rowIndex: rowData.rowIndex, row: rowData.row });
  });
};
const customTreeExpandAndFoldIcon = ref(false);
const treeExpandAndFoldIconRender: EnhancedTableProps['treeExpandAndFoldIcon'] = (h, { type, row }) => {
  if (lazyLoadingData.value && lazyLoadingData.value.key === row?.key) {
    return <Loading size="14px" />;
  }
  return type === 'expand' ? <ChevronRightIcon /> : <ChevronDownIcon />;
};

// 懒加载图标渲染
const lazyLoadingTreeIconRender: EnhancedTableProps['treeExpandAndFoldIcon'] = (h, params) => {
  const { type, row } = params;
  if (lazyLoadingData.value && lazyLoadingData.value.key === row?.key) {
    return <Loading size="14px" />;
  }
  return type === 'expand' ? <AddRectangleIcon /> : <MinusRectangleIcon />;
};

// 默认展开全部。示例代码有效，勿删
// onMounted(() => {
//   tableRef.value.expandAll();
// });

const getTreeNode: ButtonProps['onClick'] = () => {
  // 查看树形结构平铺数据
  // tableRef.value.dataSource
  const treeData = tableRef.value.getTreeNode();
  console.log(treeData);
  MessagePlugin.success('树形结构获取成功，请打开控制台查看');
};
const onExpandAllToggle: ButtonProps['onClick'] = () => {
  expandAll.value = !expandAll.value;
  expandAll.value ? tableRef.value.expandAll() : tableRef.value.foldAll();
};
const appendToRoot: ButtonProps['onClick'] = () => {
  const key = Math.round(Math.random() * 10010);
  const newData = {
    id: key,
    key: `申请人 ${key}_${1} 号`,
    platform: key % 2 === 0 ? '共有' : '私有',
    type: ['String', 'Number', 'Array', 'Object'][key % 4],
    default: ['-', '0', '[]', '{}'][key % 4],
    detail: {
      position: `读取 ${key} 个数据的嵌套信息值`,
    },
    needed: key % 4 === 0 ? '是' : '否',
    description: '数据源',
  };
  // data.value.push(newData);
  tableRef.value.appendTo('', newData);

  // 同时添加多个元素，示例代码有效勿删
  // appendMultipleDataTo();
};
const onAbnormalDragSort: EnhancedTableProps['onAbnormalDragSort'] = (params) => {
  console.log(params);
  // MessagePlugin.warning(params.reason);
  if (params.code === 1001) {
    MessagePlugin.warning('不同层级的元素，不允许调整顺序');
  }
};
const onExpandedTreeNodesChange: EnhancedTableProps['onExpandedTreeNodesChange'] = (expandedTreeNodes, context) => {
  console.log(expandedTreeNodes, context);
  // 全选不需要处理；仅处理懒加载
  if (!context.rowState) return;
  onTreeExpandChange(context);
};
const onTreeExpandChange = (context: TableTreeNodeExpandOptions<TableRowData>) => {
  console.log(context.rowState.expanded ? '展开' : '收起', context);
  /**
   * 如果是懒加载，请确认自己完成了以下几个步骤
   * 1. 提前设置 children 值为 true；
   * 2. 在 onTreeExpandChange 事件中处理异步数据；
   * 3. 自定义展开图标渲染 lazyLoadingTreeIconRender
   */
  if (context.row.list === true) {
    lazyLoadingData.value = context.row;
    const timer = setTimeout(() => {
      appendMultipleDataTo(context.row);
      lazyLoadingData.value = null;
      clearTimeout(timer);
    }, 200);
  }
};
const onDragSort: EnhancedTableProps['onDragSort'] = (params) => {
  console.log('onDragSort:', params);
};

// 应用于需要阻止拖拽排序的场景。如：当子节点存在时，则不允许调整顺序。
// 返回值为 true，允许拖拽排序；返回值 为 false，则阻止拖拽排序
const beforeDragSort: EnhancedTableProps['beforeDragSort'] = (params) => {
  console.log('beforeDragSort:', params);
  return true;
};
const treeExpandIcon = computed<EnhancedTableProps['treeExpandAndFoldIcon']>(() => {
  // 自定义展开图标
  if (customTreeExpandAndFoldIcon.value) {
    return treeExpandAndFoldIconRender;
  }
  return lazyLoadingTreeIconRender;
});
</script>

<style>
.tdesign-table-demo__table-operations .t-link {
  padding: 0 8px;
}
</style>
