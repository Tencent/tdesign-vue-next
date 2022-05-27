<template>
  <div>
    <div>
      <t-button theme="default" @click="setData1">重置数据</t-button>
      <t-button theme="default" style="margin-left: 16px" @click="onRowToggle">任意节点展开/收起</t-button>
      <t-button theme="default" style="margin-left: 16px" @click="onExpandAllToggle">{{
        expandAll ? '收起全部' : '展开全部'
      }}</t-button>
      <t-checkbox v-model="customTreeExpandAndFoldIcon" style="margin-left: 16px; vertical-align: middle">
        自定义折叠/展开图标
      </t-checkbox>
    </div>
    <br />
    <!-- 第一列展开树结点，缩进为 24px，子节点字段 childrenKey 默认为 children -->
    <!-- !!! 树形结构 EnhancedTable 才支持，普通 Table 不支持 !!! -->
    <!-- treeNodeColumnIndex 定义第几列作为树结点展开列，默认为第一列 -->
    <!-- tree.defaultExpandAll: true 默认展开全部 -->
    <!-- Ref: table.value.dataSource 查看树形结构平铺数据 -->
    <t-enhanced-table
      ref="table"
      row-key="key"
      drag-sort="row-handler"
      :data="data"
      :columns="columns"
      :tree="{ childrenKey: 'list', treeNodeColumnIndex: 2 }"
      :tree-expand-and-fold-icon="customTreeExpandAndFoldIcon ? treeExpandAndFoldIconRender : undefined"
      :pagination="pagination"
      :before-drag-sort="beforeDragSort"
      @page-change="onPageChange"
      @abnormal-drag-sort="onAbnormalDragSort"
      @tree-expand-change="onTreeExpandChange"
    ></t-enhanced-table>

    <!-- 第二列展开树结点，缩进为 12px，示例代码有效，勿删 -->
    <!-- indent 定义缩进距离 -->
    <!-- 如果子结点字段不是 'children'，可以使用 childrenKey 定义字段别名，如 `:tree="{ childrenKey: 'list' }"` -->
    <!-- <t-enhanced-table
      ref="table"
      rowKey="key"
      :pagination="defaultPagination"
      :data="data"
      :columns="columns"
      :tree="{ indent: 12, childrenKey: 'list', defaultExpandAll: true }"
      @page-change="onPageChange"
    ></t-enhanced-table> -->
  </div>
</template>
<script setup lang="jsx">
import { ref, reactive /** , onMounted */ } from 'vue';
import { EnhancedTable as TEnhancedTable, MessagePlugin } from 'tdesign-vue-next';
import { ChevronRightIcon, ChevronDownIcon, MoveIcon } from 'tdesign-icons-vue-next';

const TOTAL = 5;

function getData(currentPage = 1) {
  const data = [];
  // const pageInfo = `第 ${currentPage} 页`;
  for (let i = 0; i < TOTAL; i++) {
    const obj = {
      id: i,
      key: `我是 ${i}_${currentPage} 号`,
      platform: i % 2 === 0 ? '共有' : '私有',
      type: ['String', 'Number', 'Array', 'Object'][i % 4],
      default: ['-', '0', '[]', '{}'][i % 4],
      detail: {
        position: `读取 ${i} 个数据的嵌套信息值`,
      },
      needed: i % 4 === 0 ? '是' : '否',
      description: '数据源',
    };
    // 第一行不设置子节点
    obj.list = new Array(2).fill(null).map((t, j) => {
      const secondIndex = 100 * j + (i + 1) * 10;
      const secondObj = {
        ...obj,
        id: secondIndex,
        key: `我是 ${secondIndex}_${currentPage} 号`,
      };
      secondObj.list = new Array(3).fill(null).map((m, n) => {
        const thirdIndex = secondIndex * 1000 + 100 * m + (n + 1) * 10;
        return {
          ...obj,
          id: thirdIndex,
          key: `我是 ${thirdIndex}_${currentPage} 号`,
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
  return data;
}

const table = ref(null);
const data = ref(getData());

const setData1 = () => {
  // 需要更新数据地址空间
  data.value = getData();
};

const onEditClick = (row) => {
  const newData = {
    ...row,
    platform: 'New',
    type: 'Symbol',
    default: 'undefined',
  };
  table.value.setData(row.key, newData);
  MessagePlugin.success('数据已更新');
};

const onDeleteConfirm = (row) => {
  table.value.remove(row.key);
  MessagePlugin.success('删除成功');
};

const onLookUp = (row) => {
  const allRowData = table.value.getData(row.key);
  const message = '当前行全部数据，包含节点路径、父节点、子节点、是否展开、是否禁用等';
  MessagePlugin.success(`打开控制台查看${message}`);
  console.log(`${message}：`, allRowData);
};

const appendTo = (row) => {
  const randomKey = Math.round(Math.random() * Math.random() * 1000) + 10000;
  table.value.appendTo(row.key, {
    id: randomKey,
    key: `我是 ${randomKey} 号`,
    platform: '私有',
    type: 'Number',
  });
  MessagePlugin.success(`已插入子节点我是 ${randomKey} 号，请展开查看`);
};

// 当前节点之前，新增兄弟节前
const insertBefore = (row) => {
  const randomKey = Math.round(Math.random() * Math.random() * 1000) + 10000;
  table.value.insertBefore(row.key, {
    id: randomKey,
    key: `我是 ${randomKey} 号`,
    platform: '私有',
    type: 'Number',
  });
  MessagePlugin.success(`已插入子节点我是 ${randomKey} 号，请展开查看`);
};

// 当前节点之后，新增兄弟节前
const insertAfter = (row) => {
  const randomKey = Math.round(Math.random() * Math.random() * 1000) + 10000;
  table.value.insertAfter(row.key, {
    id: randomKey,
    key: `我是 ${randomKey} 号`,
    platform: '私有',
    type: 'Number',
  });
  MessagePlugin.success(`已插入子节点我是 ${randomKey} 号，请展开查看`);
};

const columns = [
  {
    // 列拖拽排序必要参数
    colKey: 'drag',
    title: '排序',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: (h) => <MoveIcon />,
    width: 80,
  },
  {
    colKey: 'id',
    title: '编号',
    ellipsis: true,
    width: 100,
  },
  {
    width: 180,
    colKey: 'key',
    title: '名称',
    ellipsis: true,
  },
  {
    colKey: 'platform',
    title: '平台',
    width: 80,
  },
  {
    colKey: 'operate',
    width: 340,
    title: '操作',
    align: 'center',
    // 增、删、改、查 等操作
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: (h, { row }) => (
      <div class="tdesign-table-demo__table-operations">
        <t-button variant="text" onClick={() => appendTo(row)}>
          插入
        </t-button>
        <t-button variant="text" onClick={() => insertBefore(row)}>
          前插
        </t-button>
        <t-button variant="text" onClick={() => insertAfter(row)}>
          后插
        </t-button>
        <t-button variant="text" onClick={() => onEditClick(row)}>
          更新
        </t-button>
        <t-button variant="text" onClick={() => onLookUp(row)}>
          查看
        </t-button>
        <t-popconfirm content="确认删除吗" onConfirm={() => onDeleteConfirm(row)}>
          <t-button variant="text">删除</t-button>
        </t-popconfirm>
      </div>
    ),
  },
];

const expandAll = ref(false);
const pagination = reactive({
  current: 1,
  pageSize: TOTAL,
  total: TOTAL,
});

const defaultPagination = {
  defaultCurrent: 1,
  defaultPageSize: TOTAL,
  total: TOTAL,
};

const onPageChange = (pageInfo) => {
  pagination.current = pageInfo.current;
  pagination.pageSize = pageInfo.pageSize;
  data.value = getData(pageInfo.current);
};

const onRowToggle = () => {
  const rowIds = ['我是 1_1 号', '我是 2_1 号', '我是 3_1 号', '我是 4_1 号'];
  rowIds.forEach((id) => {
    // getData 参数为行唯一标识，lodash.get(row, rowKey)
    const rowData = table.value.getData(id);
    table.value.toggleExpandData(rowData);
    // 或者
    // table.value.toggleExpandData({ rowIndex: rowData.rowIndex, row: rowData.row });
  });
};

const customTreeExpandAndFoldIcon = ref(false);

const treeExpandAndFoldIconRender = (h, { type }) => (type === 'expand' ? <ChevronRightIcon /> : <ChevronDownIcon />);

// 默认展开全部。示例代码有效，勿删
// onMounted(() => {
//   table.value.expandAll();
// });

const onExpandAllToggle = () => {
  expandAll.value = !expandAll.value;
  expandAll.value ? table.value.expandAll() : table.value.foldAll();
};

const onAbnormalDragSort = (params) => {
  console.log(params);
  // MessagePlugin.warning(params.reason);
  if (params.code === 1001) {
    MessagePlugin.warning('不同层级的元素，不允许调整顺序');
  }
};

const onTreeExpandChange = (context) => {
  console.log(context.rowState.expanded ? '展开' : '收起', context);
};

// 应用于需要阻止拖拽排序的场景。如：当子节点存在时，则不允许调整顺序。
// 返回值为 true，允许拖拽排序；返回值 为 false，则阻止拖拽排序
const beforeDragSort = (params) => {
  console.log(params);
  return true;
};
</script>

<style>
.tdesign-table-demo__table-operations .t-button {
  padding: 0 8px;
}
</style>
