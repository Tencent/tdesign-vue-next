<template>
  <div class="tdesign-demo-block-column" style="width: 100%">
    <div>
      <t-radio-group v-model="leftFixedColumn" variant="default-filled">
        <t-radio-button :value="1"> 左侧固定一列 </t-radio-button>
        <t-radio-button :value="2"> 左侧固定两列 </t-radio-button>
      </t-radio-group>
    </div>

    <div>
      <t-radio-group v-model="rightFixedColumn" variant="default-filled">
        <t-radio-button :value="1"> 右侧固定一列 </t-radio-button>
        <t-radio-button :value="2"> 右侧固定两列 </t-radio-button>
      </t-radio-group>
    </div>

    <div>
      <t-radio-group v-model="tableLayout" variant="default-filled">
        <t-radio-button value="fixed">table-layout: fixed</t-radio-button>
        <t-radio-button value="auto">table-layout: auto</t-radio-button>
      </t-radio-group>
      <t-checkbox v-model="emptyData" style="margin-left: 16px; vertical-align: middle">空数据</t-checkbox>
    </div>

    <!-- 如果希望表格列宽自适应，设置 `table-layout: auto` 即可。这种模式下的固定列，必须指定 tableContentWidth -->
    <t-table
      row-key="index"
      :data="emptyData ? [] : data"
      :columns="columns"
      :table-layout="tableLayout"
      :table-content-width="tableLayout === 'fixed' ? undefined : '1200px'"
      bordered
    >
      <template #operation="slotProps">
        <a class="link" @click="rehandleClickOp(slotProps)">删除</a>
      </template>
    </t-table>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';

const data = [];
for (let i = 0; i < 5; i++) {
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

const leftFixedColumn = ref(2);
const rightFixedColumn = ref(1);
const tableLayout = ref('fixed');
const emptyData = ref(false);

const columns = computed(() => {
  return [
    {
      align: 'center',
      width: 100,
      colKey: 'index',
      title: '序号',
      fixed: 'left',
    },
    {
      colKey: 'platform',
      title: '平台',
      width: 100,
      fixed: leftFixedColumn.value >= 2 ? 'left' : undefined,
    },
    {
      colKey: 'type',
      title: '类型',
      width: 150,
    },
    {
      colKey: 'default',
      title: '默认值',
      width: 150,
    },
    {
      colKey: 'description',
      title: '说明',
      width: 100,
    },
    {
      colKey: 'needed',
      title: '是否必传',
      width: 150,
    },
    {
      colKey: 'operation',
      title: '操作',
      width: 100,
      cell: 'operation',
      fixed: rightFixedColumn.value >= 2 ? 'right' : undefined,
    },
    {
      colKey: 'detail.position',
      title: '详情信息',
      width: 120,
      fixed: 'right',
      // 允许自定义浮层 Popup 全部属性
      ellipsis: { placement: 'bottom-right' },
    },
  ];
});
</script>
<style lang="less" scoped>
.tdesign-demo-block-column {
  width: 100%;
}
</style>
