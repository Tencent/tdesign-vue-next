<template>
  <div class="tdesign-demo-block-column" style="width: 500px">
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
    <t-table :data="data" :columns="columns" row-key="index" bordered>
      <template #operation="slotProps">
        <a class="link" @click="rehandleClickOp(slotProps)">删除</a>
      </template>
    </t-table>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from 'vue';

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

export default defineComponent({
  setup() {
    const leftFixedColumn = ref(1);
    const rightFixedColumn = ref(2);

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
          colKey: 'detail.postion',
          title: '详情信息',
          width: 250,
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
          fixed: rightFixedColumn.value >= 2 ? 'right' : undefined,
        },
        {
          colKey: 'operation',
          title: '操作',
          width: 100,
          fixed: 'right',
          cell: 'operation',
        },
      ];
    });
    return {
      leftFixedColumn,
      rightFixedColumn,
      data,
      columns,
    };
  },
});
</script>
<style lang="less" scoped>
.tdesign-demo-block-column {
  width: 100%;
}
</style>
