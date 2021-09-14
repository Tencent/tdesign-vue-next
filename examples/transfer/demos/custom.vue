<template>
  <div>
    <t-transfer
      :data="list"
    >
      <template v-slot:title="props" :name="123">
        <div>{{props.type === 'target' ? '目标' : '来源'}}</div>
      </template>
      <template v-slot:operation="props" :name="123">
        {{props.direction === 'left' ? '移除' : '加入'}}
      </template>
      <template v-slot:footer="props" :name="123">
        <div style="padding:10px;border-top:1px solid #E7E7E7;">
          <span v-if="props.type === 'source'">选中并加入</span>
          <span v-else>选中并移除</span>
        </div>
      </template>
    </t-transfer>
  </div>
</template>
<script>
const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
  });
}
export default {
  data() {
    return {
      list,
      targetValue: [],
      checkedValue: [],
    };
  },
};
</script>
