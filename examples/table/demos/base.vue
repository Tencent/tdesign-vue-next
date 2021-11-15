<template>
  <div>
    <!-- 按钮操作区域 -->
    <div style="margin: 16px;">
      <t-checkbox v-model="stripe">显示斑马纹</t-checkbox>
      <t-checkbox v-model="bordered">显示表格边框</t-checkbox>
      <t-checkbox v-model="hover">显示悬浮效果</t-checkbox>
    </div>

    <t-table
      rowKey="index"
      :data="data"
      :columns="columns"
      :stripe="stripe"
      :bordered="bordered"
      :hover="hover"
      @row-click="handleRowClick"
    ></t-table>

  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    index: i,
    platform: i % 2 === 0 ? '共有' : '私有',
    type: ['String', 'Number', 'Array', 'Object'][i % 4],
    default: ['-', '0', '[]', '{}'][i % 4],
    detail: {
      postion: `读取 ${i} 个数据的嵌套信息值`,
    },
    needed: i % 4 === 0 ? '是' : '否',
    description: '数据源',
  });
}

const columns = [
  {
    align: 'center',
    width: '100',
    className: 'row',
    colKey: 'index',
    title: '序号',
  },
  {
    width: 100,
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
    colKey: 'detail.postion',
    title: '详情信息',
    width: 200,
    ellipsis: true,
  },
]
export default defineComponent({
  setup() {
    const stripe = ref(true);
    const bordered = ref(true);
    const hover = ref(false);

    const handleRowClick = (e) => {
      console.log(e)
    }

    return {
      data,
      columns,
      stripe,
      bordered,
      hover,
      handleRowClick,
    }
  }
});
</script>
