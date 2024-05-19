<template>
  <div>
    <t-space>
      <t-button @click="appendToRoot">添加根节点</t-button>
      <t-button theme="default" @click="resetData">重置/更新数据</t-button>
      <t-button theme="default" @click="onRowToggle">任意节点展开/收起</t-button>
      <t-button theme="default" @click="onExpandAllToggle">{{ expandAll ? '收起全部' : '展开全部' }}</t-button>
      <t-button theme="default" @click="getTreeNode">获取全部树形结构</t-button>
    </t-space>
    <br />
    <div>
      <t-checkbox v-model="customTreeExpandAndFoldIcon" style="vertical-align: middle">
        自定义折叠/展开图标
      </t-checkbox>
    </div>
    <br />
    <!-- !!! 树形结构 EnhancedTable 才支持，普通 Table 不支持 !!! -->
    <!-- 第一列展开树结点，缩进为 24px，子节点字段 childrenKey 默认为 children -->
    <!-- :displayColumns.sync="displayColumns" used to control displayed columns -->
    <!-- expandedTreeNodes.sync is not required. you can control expanded tree node by expandedTreeNodes -->
    <t-enhanced-table
      ref="table"
      rowKey="key"
      drag-sort="row-handler"
      :data="data"
      :columns="columns"
      :tree="{ childrenKey: 'list', treeNodeColumnIndex: 2, expandTreeNodeOnClick: true }"
      :treeExpandAndFoldIcon="treeExpandIcon"
      :pagination="pagination"
      :beforeDragSort="beforeDragSort"
      :expandedTreeNodes.sync="expandedTreeNodes"
      :columnController="{
        placement: 'bottom-left',
        // 允许控制哪些列显示或隐藏
        fields: ['id', 'platform', 'operate'],
        dialogProps: { preventScrollThrough: true },
      }"
      lazyLoad
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
<script lang="jsx">
import { MessagePlugin, EnhancedTable, Loading } from 'tdesign-vue';
import {
  ChevronRightIcon, ChevronDownIcon, MoveIcon, AddRectangleIcon, MinusRectangleIcon,
} from 'tdesign-icons-vue';

const TOTAL = 5;

function getObject(i, currentPage) {
  return {
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
}

function getData(currentPage = 1) {
  const data = [];
  // const pageInfo = `第 ${currentPage} 页`;
  for (let i = 0; i < TOTAL; i++) {
    const obj = getObject(i, currentPage);
    // 第一行不设置子节点
    obj.list = i === 0
      ? []
      : new Array(2).fill(null).map((t, j) => {
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

export default {
  components: { TEnhancedTable: EnhancedTable },
  data() {
    return {
      customTreeExpandAndFoldIcon: false,
      data: getData(),
      lazyLoadingData: null,
      expandAll: false,
      expandedTreeNodes: ['申请人 2_1 号', '申请人 30_1 号', '申请人 4_1 号'],
      pagination: {
        current: 1,
        pageSize: 10,
        total: TOTAL,
      },
      // defaultPagination: {
      //   defaultCurrent: 1,
      //   defaultPageSize: 10,
      //   total: TOTAL,
      // },
      // displayColumns: ['drag', 'id', 'key', 'platform', 'operate'],
      columns: [
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
          cell: (h, { row }) => row.platform === '电子签署' ? (
              <t-tag size="small" theme="primary">
                {row.platform}
              </t-tag>
          ) : (
            row.platform
          ),
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
              <t-link variant="text" hover="color" onClick={() => this.appendTo(row)}>
                插入
              </t-link>
              <t-link variant="text" hover="color" onClick={() => this.insertBefore(row)}>
                前插
              </t-link>
              <t-link variant="text" hover="color" onClick={() => this.insertAfter(row)}>
                后插
              </t-link>
              <t-link variant="text" hover="color" onClick={() => this.onEditClick(row)}>
                更新
              </t-link>
              <t-link variant="text" hover="color" onClick={() => this.onLookUp(row)}>
                查看
              </t-link>
              <t-popconfirm content="确认删除吗" onConfirm={() => this.onDeleteConfirm(row)}>
                <t-link variant="text" hover="color">
                  删除
                </t-link>
              </t-popconfirm>
            </div>
          ),
        },
      ],
    };
  },

  computed: {
    // 可以使用同名插槽代替渲染函数：<template #treeExpandAndFoldIcon><icon /></template>
    treeExpandIcon() {
      // 自定义展开图标
      if (this.customTreeExpandAndFoldIcon) {
        return this.treeExpandAndFoldIconRender;
      }
      return this.lazyLoadingTreeIconRender;
    },
  },

  methods: {
    // 全新赋值：
    resetData() {
      const newData = getData();
      // 方式一
      this.data = newData;
      this.expandedTreeNodes = [];

      // 方式二，和方式一等效
      // this.$refs.table.resetData(newData);
    },

    // 更新
    onEditClick(row) {
      const newData = {
        ...row,
        platform: 'New',
        type: 'Symbol',
        default: 'undefined',
      };
      this.$refs.table.setData(row.key, newData);
      this.$message.success('数据已更新');
    },

    // 删除
    onDeleteConfirm(row) {
      this.$refs.table.remove(row.key);
      // 移除子节点
      // this.$refs.table.removeChildren(row.key);
      this.$message.success('删除成功');
    },

    // 查看数据
    onLookUp(row) {
      const allRowData = this.$refs.table.getData(row.key);
      const message = '当前行全部数据，包含节点路径、父节点、子节点、是否展开、是否禁用等';
      this.$message.success(`打开控制台查看${message}`);
      console.log(`${message}：`, allRowData);
    },

    // 新增子节点
    appendTo(row) {
      const randomKey1 = Math.round(Math.random() * Math.random() * 1000) + 10000;
      this.$refs.table.appendTo(row.key, {
        id: randomKey1,
        key: `申请人 ${randomKey1} 号`,
        platform: '电子签署',
        type: 'Number',
      });
      this.$message.success(`已插入子节点申请人 ${randomKey1} 号，请展开查看`);

      // 一次性添加多个子节点。示例代码有效，勿删！!!
      // this.appendMultipleDataTo(row);
    },

    appendMultipleDataTo(row) {
      const randomKey1 = Math.round(Math.random() * Math.random() * 1000) + 10000;
      const randomKey2 = Math.round(Math.random() * Math.random() * 1000) + 10000;
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
      ];
      this.$refs.table.appendTo(row?.key, appendList);
      MessagePlugin.success(`已插入子节点申请人 ${randomKey1} 和 ${randomKey2} 号，请展开查看`);
    },

    // 当前节点之前，新增兄弟节前
    insertBefore(row) {
      const randomKey = Math.round(Math.random() * Math.random() * 1000) + 10000;
      this.$refs.table.insertBefore(row.key, {
        id: randomKey,
        key: `申请人 ${randomKey} 号`,
        platform: '纸质签署',
        type: 'Number',
      });
      this.$message.success(`已插入子节点申请人 ${randomKey} 号，请展开查看`);
    },

    // 当前节点之后，新增兄弟节前
    insertAfter(row) {
      const randomKey = Math.round(Math.random() * Math.random() * 1000) + 10000;
      this.$refs.table.insertAfter(row.key, {
        id: randomKey,
        key: `申请人 ${randomKey} 号`,
        platform: '纸质签署',
        type: 'Number',
      });
      this.$message.success(`已插入子节点申请人 ${randomKey} 号，请展开查看`);
    },

    onPageChange(pageInfo) {
      this.pagination.current = pageInfo.current;
      this.pagination.pageSize = pageInfo.pageSize;
      this.data = getData(pageInfo.current);
    },

    onRowToggle() {
      const rowIds = ['申请人 1_1 号', '申请人 2_1 号', '申请人 3_1 号', '申请人 4_1 号'];
      rowIds.forEach((id) => {
        // getData 参数为行唯一标识，lodash.get(row, rowKey)
        const rowData = this.$refs.table.getData(id);
        this.$refs.table.toggleExpandData(rowData);
        // 或者
        // this.$refs.table.toggleExpandData({ rowIndex: rowData.rowIndex, row: rowData.row });
      });
    },

    // eslint-disable-next-line
    treeExpandAndFoldIconRender(h, { type, row }) {
      if (this.lazyLoadingData && this.lazyLoadingData.key === row?.key) {
        return <Loading size="14px" />;
      }
      return type === 'expand' ? <ChevronRightIcon /> : <ChevronDownIcon />;
    },

    // 懒加载图标渲染
    lazyLoadingTreeIconRender(h, params) {
      const { type, row } = params;
      if (this.lazyLoadingData?.key === row?.key) {
        return <Loading size="14px" />;
      }
      return type === 'expand' ? <AddRectangleIcon /> : <MinusRectangleIcon />;
    },

    onExpandedTreeNodesChange(expandedTreeNodes, context) {
      console.log(expandedTreeNodes, context);
      if (!context.rowState) return;
      this.onTreeExpandChange(context);
    },

    onTreeExpandChange(context) {
      console.log(context.rowState.expanded ? '展开' : '收起', context);
      /**
       * 如果是懒加载，请确认自己完成了以下几个步骤
       * 1. 提前设置 children 值为 true；
       * 2. 在 onTreeExpandChange 事件中处理异步数据；
       * 3. 自定义展开图标渲染 lazyLoadingTreeIconRender
       */
      if (context.row.list === true) {
        this.lazyLoadingData = context.row;
        const timer = setTimeout(() => {
          this.appendMultipleDataTo(context.row);
          this.lazyLoadingData = null;
          clearTimeout(timer);
        }, 200);
      }
    },

    getTreeNode() {
      // 查看树形结构平铺数据
      // this.$refs.table.dataSource
      const treeData = this.$refs.table.getTreeNode();
      console.log(treeData);
      this.$message.success('树形结构获取成功，请打开控制台查看');
    },

    onExpandAllToggle() {
      this.expandAll = !this.expandAll;
      this.expandAll ? this.$refs.table.expandAll() : this.$refs.table.foldAll();
    },

    appendToRoot() {
      const key = Math.round(Math.random() * 10010);
      this.$refs.table.appendTo('', {
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
      });

      // 同时添加多个元素，示例代码有效勿删
      // this.appendMultipleDataTo();
    },

    onAbnormalDragSort(params) {
      console.log(params);
      // this.$message.warning(params.reason);
      if (params.code === 1001) {
        this.$message.warning('不同层级的元素，不允许调整顺序');
      }
    },

    // 拖拽排序成功后触发
    onDragSort(params) {
      console.log('onDragSort:', params);
    },

    // 应用于需要阻止拖拽排序的场景。如：当子节点存在时，则不允许调整顺序
    // 返回值为 true，允许拖拽排序；返回值 为 false，则阻止拖拽排序
    beforeDragSort(params) {
      console.log('beforeDragSort:', params);
      return true;
    },
  },
};
</script>

<style>
.tdesign-table-demo__table-operations .t-link {
  padding: 0 8px;
}
</style>
