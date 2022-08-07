<template>
  <div class="tdesign-demo-block-column-large tdesign-demo__table">
    <div>
      <!-- 表尾有 3 种方式 -->
      <t-radio-group v-model="footerType" variant="default-filled">
        <t-radio-button value="normal">普通表尾</t-radio-button>
        <t-radio-button value="full">通栏表尾</t-radio-button>
        <t-radio-button value="custom">自定义表尾合并列</t-radio-button>
      </t-radio-group>
    </div>
    <!-- footData 之所以是数组，是为了支持多行表尾数据 -->
    <t-table
      row-key="index"
      bordered
      :data="data"
      :columns="columns"
      :foot-data="['normal', 'custom'].includes(footerType) ? footData : []"
      :row-class-name="rowClassName"
      :rowspan-and-colspan-in-footer="footerType === 'custom' ? rowspanAndColspanInFooter : undefined"
    >
      <!-- 如果是通栏表尾，只需设置 footer-summary，支持同名 Props 属性 footerSummary -->
      <!-- 通栏表尾和普通表尾，允许同时存在 -->
      <template v-if="footerType === 'full'" #footer-summary>
        <div class="t-table__row-filter-inner">通栏总结行信息</div>
      </template>
      <template #t-foot-required> <b>必传(插槽)</b> </template>
    </t-table>
  </div>
</template>
<script setup lang="jsx">
import { ref } from 'vue';

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
const footData = [
  {
    index: '123',
    type: '全部类型',
    default: '',
    description: '-',
  },
];
// 自定义表尾的方式
const footerType = ref('normal');

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
    foot: (h, { rowIndex }) => <div style="width: 100%; text-align: center">第 {rowIndex + 1} 行</div>,
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

function rowspanAndColspanInFooter({ rowIndex, colIndex }) {
  // 中间列合并，收尾两列不合并
  if (rowIndex === 0 && colIndex === 1) return { colspan: columns.length - 2 };
  return {};
}

// type 可选值：foot 和 body
function rowClassName({ type }) {
  if (type === 'foot') return 't-tdesign__custom-footer-tr';
  return 't-tdesign__custom-body-tr';
}
</script>
