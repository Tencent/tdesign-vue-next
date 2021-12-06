<template>
  <div class="tdesign-demo-select-base">
    <!-- 方式一：直接传 options 数据，比插槽的方式更简单 -->
    <t-select v-model="value1" :options="options" placeholder="请选择城市" />

    <!-- 方式二：使用插槽节点 -->
    <t-select v-model="value2" placeholder="请选择城市">
      <t-option-group
        v-for="(list, index) in options"
        :key="index"
        :label="typeof list.group === 'object' ? list.group.label : list.group"
        divider
      >
        <t-option v-for="item in list.children" :key="item.value" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-option-group>
    </t-select>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  {
    group: '分组一',
    children: [
      { label: '选项一', value: 1 },
      { label: '选项二', value: 2 },
    ],
  },
  {
    group: '分组二',
    children: [
      { label: '选项三', value: 4 },
      { label: '选项四', value: 5 },
      { label: '选项五', value: 6 },
    ],
  },
  {
    group: '分组三',
    divider: true,
    children: [
      { label: '选项六', value: 7 },
      { label: '选项七', value: 8 },
      { label: '选项八', value: 9 },
    ],
  },
];

export default defineComponent({
  setup() {
    const value1 = ref('');
    const value2 = ref('');
    return {
      value1,
      value2,
      options,
    };
  },
});
</script>
<style scoped>
.tdesign-demo-select-base {
  width: 450px;
  display: flex;
}

.tdesign-demo-select-base .t-select-wrap + .t-select-wrap {
  margin-left: 36px;
}
</style>
