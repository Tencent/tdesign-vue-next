<template>
  <div>
    <!-- 第一列展开树结点，缩进为 24px -->
    <!-- !!! EnhancedTable 才支持，普通 Table 不支持 !!! -->
    <t-enhanced-table row-key="key" :data="data" :columns="columns" />

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
import { defineComponent } from 'vue';
import { EnhancedTable } from '@tencent/tdesign-vue-next';

const data = [];
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
  obj.children = new Array(10).fill(null).map((t, j) => {
    const secondIndex = 100 * j + (i + 1) * 10;
    const secondObj = {
      ...obj,
      key: `我是 ${secondIndex} 号`,
    };
    secondObj.children = new Array(30).fill(null).map((m, n) => ({
      ...obj,
      key: `我是 ${secondIndex * 1000 + 100 * m + (n + 1) * 10} 号`,
    }));
    return secondObj;
  });
  data.push(obj);
}

const columns = [
  {
    width: '200',
    className: 'row',
    colKey: 'key',
    title: '编号',
  },
  {
    width: 200,
    colKey: 'platform',
    title: '平台',
  },
  {
    colKey: 'type',
    title: '类型',
  },
  {
    colKey: 'default',
    title: '默认值',
  },
  {
    colKey: 'needed',
    title: '是否必传',
  },
];

export default defineComponent({
  components: { TEnhancedTable: EnhancedTable },
  setup() {
    return {
      data,
      columns,
    };
  },
});
</script>
