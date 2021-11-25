<template>
  <div>
    <t-table :data="data" :columns="columns" :row-key="rowKey" />
    <br /><br />
    <t-table :data="data" :columns="columns" :row-key="rowKey">
      <template #empty>
        <span
          style="display: flex; align-items: center; justify-content: center; height: 100px; color: rgba(0, 0, 0, 0.26)"
        >
          😊 我是自定义的空内容 😊: slot
        </span>
      </template>
    </t-table>
    <br /><br />
    <t-table :data="data" :columns="columns" :empty="empty" :row-key="rowKey" />
  </div>
</template>
<script lang="jsx">
import { defineComponent } from 'vue';

const columns = [
  {
    colKey: 'type',
    title: '类型',
  },
  {
    colKey: 'platform',
    title: '平台',
  },
  {
    colKey: 'property',
    title: '属性',
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
    colKey: 'description',
    title: '说明',
  },
];

export default defineComponent({
  setup() {
    const empty = () => (
      <span style="display:flex;align-items:center;justify-content:center;height:100px;color: rgba(0, 0, 0, 0.26)">
        😊 我是自定义的空内容 😊: empty function
      </span>
    );

    return {
      data: [],
      rowKey: 'property',
      columns,
      empty,
    };
  },
});
</script>
