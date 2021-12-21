<template>
  <div>
    <!-- 第一列展开树结点，缩进为 24px -->
    <!-- !!! EnhancedTable 才支持，普通 Table 不支持 !!! -->
    <t-enhanced-table ref="table" row-key="key" :data="data" :columns="columns" :tree="{ childrenKey: 'list' }" />

    <br />
    <div>
      <t-button theme="default" @click="setData1">设置为全新的数据</t-button>&nbsp;&nbsp;
      <t-button theme="default" @click="setData2">单独设置某行数据</t-button>
    </div>
    <!-- 第二列展开树结点，缩进为 12px，示例代码有效，勿删 -->
    <!-- indent 定义缩进距离；treeNodeColumnIndex 定义第几列作为树结点展开列 -->
    <!-- 如果子结点字段不是 'children'，可以使用 childrenKey 定义字段别名，如 `:tree="{ childrenKey: 'list' }"` -->
    <!-- <t-table
      rowKey="key"
      :data="data"
      :columns="columns"
      :tree="{ indent: 12, treeNodeColumnIndex: 1 }"
    ></t-table> -->
  </div>
</template>
<script lang="jsx">
import { defineComponent, ref } from 'vue';
import { EnhancedTable, MessagePlugin } from 'tdesign-vue-next';

const initData = [];
for (let i = 0; i < 5; i++) {
  const obj = {
    key: `我是 ${i} 号`,
    platform: i % 2 === 0 ? '共有' : '私有',
    type: ['String', 'Number', 'Array', 'Object'][i % 4],
    default: ['-', '0', '[]', '{}'][i % 4],
    detail: {
      postion: `读取 ${i} 个数据的嵌套信息值`,
    },
    needed: i % 4 === 0 ? '是' : '否',
    description: '数据源',
  };
  obj.list = new Array(2).fill(null).map((t, j) => {
    const secondIndex = 100 * j + (i + 1) * 10;
    const secondObj = {
      ...obj,
      key: `我是 ${secondIndex} 号`,
    };
    secondObj.list = new Array(3).fill(null).map((m, n) => ({
      ...obj,
      key: `我是 ${secondIndex * 1000 + 100 * m + (n + 1) * 10} 号`,
    }));
    return secondObj;
  });
  initData.push(obj);
}
export default defineComponent({
  components: { TEnhancedTable: EnhancedTable },
  setup() {
    const table = ref(null);
    const data = ref(initData);

    const setData1 = () => {
      console.log('setData1');
      data.value.unshift({
        key: '我是 999 号',
        platform: '私有',
        type: 'Number',
        default: 0,
        needed: '否',
        description: '全新数据源',
        list: data.value[0].list,
      });
    };

    // 使用实例方法 setData(key, newData) 重置单行数据
    const setData2 = () => {
      table.value.setData('我是 110 号', {
        ...data.value[0].list[1],
        platform: 'New',
        key: '我是 8888 号',
      });
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
        key: `我是 ${randomKey} 号`,
        platform: '私有',
        type: 'Number',
      });
      MessagePlugin.success(`已插入子节点我是 ${randomKey} 号，请展开查看`);
    };

    const columns = [
      {
        width: '200',
        className: 'row',
        colKey: 'key',
        title: '编号',
      },
      {
        colKey: 'platform',
        title: '平台',
      },
      {
        colKey: 'type',
        title: '类型',
      },
      {
        colKey: 'operate',
        width: 350,
        title: '操作',
        align: 'center',
        // 增、删、改、查 等操作
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cell: (h, { row }) => (
          <div class="tdesign-table-demo__table-operations">
            <t-button variant="text" onClick={() => appendTo(row)}>
              插入
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
    return {
      table,
      data,
      columns,
      setData1,
      setData2,
    };
  },
});
</script>
<style scoped>
.tdesign-table-demo__table-operations div {
  display: inline-block;
}
.tdesign-table-demo__table-operations .t-button {
  padding: 0 8px;
}
</style>
