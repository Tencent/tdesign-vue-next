<template>
  <div class="tdesign-demo-block-column-large">
    <!-- 按钮操作区域 -->
    <div>
      <t-radio-group v-model="size" variant="default-filled">
        <t-radio-button value="small">小尺寸</t-radio-button>
        <t-radio-button value="medium">中尺寸</t-radio-button>
        <t-radio-button value="large">大尺寸</t-radio-button>
      </t-radio-group>
      <br /><br />
      <t-checkbox v-model="stripe"> 显示斑马纹 </t-checkbox>
      <t-checkbox v-model="bordered"> 显示表格边框 </t-checkbox>
      <t-checkbox v-model="hover"> 显示悬浮效果 </t-checkbox>
      <t-checkbox v-model="tableLayout"> 宽度自适应 </t-checkbox>
    </div>

    <t-table
      row-key="index"
      :data="data"
      :columns="columns"
      :stripe="stripe"
      :bordered="bordered"
      :hover="hover"
      :table-layout="tableLayout ? 'auto' : 'fixed'"
      :size="size"
      :pagination="pagination"
      @row-click="handleRowClick"
    />
  </div>
</template>
<script setup lang="jsx">
import { ref } from 'vue';

const data = [];
const total = 28;
for (let i = 0; i < total; i++) {
  data.push({
    index: i,
    platform: i % 2 === 0 ? '共有' : '私有',
    type: ['String', 'Number', 'Array', 'Object'][i % 4],
    default: ['-', '0', '[]', '{}'][i % 4],
    detail: {
      position: `读取 ${i} 个数据的嵌套信息值`,
    },
    needed: i % 4 === 0 ? '是' : '否',
    description: '数据源',
  });
}

const columns = [
  {
    width: '100',
    colKey: 'index',
    title: '序号',
    // 对齐方式
    align: 'center',
    // 设置列类名
    className: 'custom-column-class-name',
    // 设置列属性
    attrs: {
      'data-id': 'first-column',
    },
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
    colKey: 'default',
    title: '默认值',
  },
  {
    colKey: 'needed',
    title: '是否必传',
  },
  {
    colKey: 'detail.position',
    title: '详情信息',
    /**
     * 1.内容超出时，是否显示省略号。值为 true，则浮层默认显示单元格内容；
     * 2.值类型为 Function 则自定义浮层显示内容；
     * 3.值类型为 Object，则自动透传属性到 Popup 组件。
     */
    ellipsis: true,

    // 透传省略内容浮层 Popup 组件全部特性，示例代码有效，勿删！！！
    // ellipsis: { placement: 'bottom', destroyOnClose: false },

    // 完全自定义 ellipsis 浮层的样式和内容，示例代码有效，勿删！！！
    // ellipsis: (h, { row, col, rowIndex, colIndex }) => {
    //   if (rowIndex % 2) {
    //     return (
    //       <div>
    //         is even row {rowIndex + 1}, with data {row.detail.position}
    //       </div>
    //     );
    //   }
    //   return (
    //     <div>
    //       is odd row {rowIndex + 1}, with data {row.detail.position}
    //     </div>
    //   );
    // },
  },
];

const stripe = ref(true);
const bordered = ref(true);
const hover = ref(false);
const tableLayout = ref(false);
const size = ref('medium');

const handleRowClick = (e) => {
  console.log(e);
};

const pagination = {
  defaultCurrent: 2,
  defaultPageSize: 5,
  total,
};
</script>
