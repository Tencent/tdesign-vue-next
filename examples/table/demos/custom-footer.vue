<template>
  <div class="tdesign-demo-block-column-large">
    <!-- rowClassName="tdesign-demo__row-custom-name" -->
    <t-table row-key="index" :data="data" :columns="columns" :foot-data="footData" :row-class-name="rowClassName">
      <template #t-foot-required> 插槽渲染表尾 </template>
    </t-table>
  </div>
</template>
<script setup lang="jsx">
const data = [];
for (let i = 0; i < 3; i++) {
  data.push({
    index: i,
    platform: i % 2 === 0 ? '共有' : '私有',
    type: ['String', 'Number', 'Array', 'Object'][i % 4],
    default: ['-', '0', '[]', '{}'][i % 4],
    detail: {
      position: `读取 ${i} 个数据的嵌套信息值`,
    },
    required: i % 4 === 0 ? '是' : '否',
    description: '数据源',
  });
}

// 表尾有一行数据
const footData = [{ type: '全部类型', description: '-' }];

const columns = [
  {
    align: 'center',
    width: '100',
    className: 'row',
    colKey: 'index',
    title: '序号',
    foot: () => <b style="color: rgb(0, 82, 217)">表尾</b>,
  },
  {
    width: 100,
    colKey: 'platform',
    title: '平台',
    foot: (h, { rowIndex }) => <span>第 {rowIndex + 1} 行</span>,
  },
  {
    colKey: 'type',
    title: '类型',
  },
  {
    colKey: 'default',
    title: '默认值',
    foot: (h, { row }) => <span>{row.default || '空'}</span>,
  },
  {
    colKey: 'required',
    title: '是否必传',
    width: 150,
    // 使用插槽渲染，插槽名称为 't-foot-required'
    foot: 't-foot-required',
  },
  {
    colKey: 'detail.position',
    title: '详情信息',
    width: 200,
    ellipsis: true,
    foot: () => <div>渲染函数输出表尾信息</div>,
  },
];

// type 可选值：foot 和 body
function rowClassName({ type }) {
  if (type === 'foot') return 't-tdesign__custom-footer-tr';
  return 't-tdesign__custom-body-tr';
}
</script>
